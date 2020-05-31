from sqlalchemy import Integer, Column, String, ForeignKey

from nomine.db import Base


class NamerWatchFolder(Base):
    __tablename__ = 'namer_watch_folder'

    id = Column(Integer, primary_key=True)
    namer_id = Column(Integer, ForeignKey('namer.id'))
    folder = Column(String)
