import asyncio
import os

from ariadne import QueryType, make_executable_schema, SubscriptionType
from ariadne.asgi import GraphQL
from starlette.routing import Route
from starlette.applications import Starlette
from starlette.responses import UJSONResponse

from nomine.db import get_cursor, init_db

query = QueryType()

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


async def publish(request):
    body = await request.json()
    queue.put_nowait(body)
    return UJSONResponse(dict(success=True))


async def watch():
    cursor = get_cursor()
    cursor.execute('''
        SELECT folder
        FROM namer_watch_folder
    ''')

    rows = cursor.fetchall()

    while True:
        for row in rows:
            folder = row[0]
            queue.put_nowait(os.listdir(folder))

        await asyncio.sleep(10)


async def startup():
    asyncio.create_task(watch())

routes = [
    Route('/publish', publish, methods=['POST'])
]

init_db()

app = Starlette(debug=True, on_startup=[startup], routes=routes)
app.mount("/graphql", GraphQL(schema, debug=True))
