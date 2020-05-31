from sqlalchemy import Integer, Column, String

from nomine.db import Base


class Namer(Base):
    __tablename__ = 'namer'

    id = Column(Integer, primary_key=True)
    name = Column(String)
