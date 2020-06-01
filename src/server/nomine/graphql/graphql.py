from sqlalchemy import Table
from nomine.db import Base, Session
from graphql import GraphQLString, GraphQLObjectType, GraphQLField, GraphQLSchema, GraphQLList


def build_table_type(table: Table):
    fields = {}
    for column in table.columns:
        fields[column.name] = GraphQLField(
            GraphQLString,
        )

    return GraphQLObjectType(table.name.capitalize(), lambda: fields)


def make_resolver(model):
    def resolver(_, __):
        session = Session()
        print([x.__dict__ for x in session.query(model).all()])
        return [x.__dict__ for x in session.query(model).all()]

    return resolver


def build_schema(query):
    types = {}

    for model in Base.__subclasses__():
        table = model.__table__
        table_type = build_table_type(table)
        types[table.name] = GraphQLList(table_type)

        query.set_field(table.name, make_resolver(model))
    print(query._resolvers)
    return GraphQLSchema(GraphQLObjectType('Query', lambda: types))
