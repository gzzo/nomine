import asyncio

from ariadne import QueryType, make_executable_schema, SubscriptionType
from ariadne.asgi import GraphQL
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

query = QueryType()

type_defs = """
    type Query {
        hello: String!
    }
    
    type Subscription {
        counter: Int!
    }
"""


async def counter_generator(obj, info):
    for i in range(5):
        await asyncio.sleep(1)
        yield i


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

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

app = Starlette(debug=True, middleware=middleware)
app.mount("/graphql", GraphQL(schema, debug=True))
