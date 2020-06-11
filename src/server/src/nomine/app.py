from ariadne.asgi import GraphQL
from graphql import extend_schema
from fastapi import FastAPI

from nomine.db import init_db, Session, Base
from graphql_sqlalchemy import build_schema

from .api import schema as api_schema, bindables

app = FastAPI(debug=True)
init_db()
session = Session()

schema = build_schema(Base)
schema = extend_schema(schema, api_schema)
for bindable in bindables:
    bindable.bind_to_schema(schema)

app.mount("/graphql", GraphQL(schema, context_value=dict(session=session)))
