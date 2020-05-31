import asyncio
import os

from ariadne import QueryType, make_executable_schema, SubscriptionType
from ariadne.asgi import GraphQL

from fastapi import FastAPI
from fastapi.responses import UJSONResponse
from fastapi.requests import Request

from nomine.db import init_db, Session
from nomine.models import namer_watch_folder

query = QueryType()
app = FastAPI(debug=True)

type_defs = """
    type Query {
        hello: String!
    }
    
    type Subscription {
        folder: [String]!
    }
"""


queue = asyncio.Queue()


async def counter_generator(obj, info):
    while True:
        item = await queue.get()
        yield item
        queue.task_done()


def counter_resolver(count, info):
    return count


subscription = SubscriptionType()
subscription.set_field("folder", counter_resolver)
subscription.set_source("folder", counter_generator)


@query.field("hello")
def resolve_hello(_, info):
    request = info.context['request']
    return "Hello, {}!".format(request.headers['user-agent'])


schema = make_executable_schema(type_defs, query, subscription)


@app.post('/publish')
async def publish(request: Request) -> UJSONResponse:
    body = await request.json()
    queue.put_nowait(body)
    return UJSONResponse(dict(success=True))


async def watch() -> None:
    session = Session()

    while True:
        watch_folders = session.query(namer_watch_folder.NamerWatchFolder)
        for watch_folder in watch_folders:
            queue.put_nowait(os.listdir(watch_folder.folder))

        await asyncio.sleep(10)


@app.on_event('startup')
async def startup() -> None:
    asyncio.create_task(watch())


init_db()

app.mount("/graphql", GraphQL(schema))
