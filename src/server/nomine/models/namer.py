from sqlalchemy import Integer, Column, String
from sqlalchemy.orm import relationship

from nomine.db import Base


class Namer(Base):
    __tablename__ = 'namer'

    id = Column(Integer, primary_key=True)
    name = Column(String)

    folders = relationship("NamerWatchFolder", back_populates="namer")
