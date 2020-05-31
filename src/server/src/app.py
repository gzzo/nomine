import asyncio

from ariadne import QueryType, make_executable_schema, SubscriptionType
from ariadne.asgi import GraphQL
from starlette.routing import Route
from starlette.applications import Starlette
from starlette.responses import UJSONResponse

query = QueryType()

type_defs = """
    type Query {
        hello: String!
    }
    
    type Subscription {
        counter: Int!
    }
"""


queue = asyncio.Queue()


async def counter_generator(obj, info):
    yield 0
    while True:
        item = await queue.get()
        yield item['number']
        queue.task_done()


def counter_resolver(count, info):
    return count + 1


subscription = SubscriptionType()
subscription.set_field("counter", counter_resolver)
subscription.set_source("counter", counter_generator)


@query.field("hello")
def resolve_hello(_, info):
    request = info.context['request']
    return "Hello, {}!".format(request.headers['user-agent'])


schema = make_executable_schema(type_defs, query, subscription)


async def publish(request):
    body = await request.json()
    queue.put_nowait(body)
    return UJSONResponse(dict(success=True))


async def startup():
    await asyncio.sleep(1)
    print('Ready')

routes = [
    Route('/publish', publish, methods=['POST'])
]

app = Starlette(debug=True, on_startup=[startup], routes=routes)
app.mount("/graphql", GraphQL(schema, debug=True))
