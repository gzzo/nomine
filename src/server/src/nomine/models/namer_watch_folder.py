from sqlalchemy import Integer, Column, String, ForeignKey
from sqlalchemy.orm import relationship

from nomine.db import Base


class NamerWatchFolder(Base):
    __tablename__ = "namer_watch_folder"

    id = Column(Integer, primary_key=True)
    namer_id = Column(ForeignKey("namer.id"), nullable=False)
    folder = Column(String, nullable=False)
    frequency = Column(Integer, server_default="10")
    method = Column(String, nullable=False, server_default="hard_link")

    namer = relationship("Namer", back_populates="folders")
