import asyncio

from ariadne import QueryType, make_executable_schema, SubscriptionType
from ariadne.asgi import GraphQL
from starlette.applications import Starlette

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
    request = info.context
    user_agent = request.headers.get("User-Agent", "Guest")
    return "Hello, %s!" % user_agent


schema = make_executable_schema(type_defs, query, subscription)

app = Starlette(debug=True)
app.mount("/graphql", GraphQL(schema, debug=True))
