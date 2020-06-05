import asyncio
import os

from ariadne import QueryType, SubscriptionType
from ariadne.asgi import GraphQL

from fastapi import FastAPI
from fastapi.responses import UJSONResponse
from fastapi.requests import Request

from nomine.db import init_db, Session, Base
from nomine.models import NamerWatchFolder

from graphql_sqlalchemy import build_schema

app = FastAPI(debug=True)

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


@app.post("/publish")
async def publish(request: Request) -> UJSONResponse:
    body = await request.json()
    queue.put_nowait(body)
    return UJSONResponse(dict(success=True))


async def watch() -> None:
    session = Session()

    while True:
        watch_folders = session.query(NamerWatchFolder)
        for watch_folder in watch_folders:
            queue.put_nowait(os.listdir(watch_folder.folder))

        await asyncio.sleep(10)


#
# @app.on_event('startup')
# async def startup() -> None:
#     asyncio.create_task(watch())


init_db()
query = QueryType()
session = Session()
schema = build_schema(Base)

query.bind_to_schema(schema)

app.mount("/graphql", GraphQL(schema, context_value=dict(session=session)))
