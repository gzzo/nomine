from sqlalchemy import Integer, Column, String, ForeignKey
from sqlalchemy.orm import relationship

from nomine.db import Base

DIRECTORY_TYPE = "directory"
FILE_TYPE = "file"


class FolderEntry(Base):
    __tablename__ = "folder_entry"

    id = Column(Integer, primary_key=True)
    path = Column(String, nullable=False, unique=True)
    folder_id = Column(ForeignKey("namer_watch_folder.id"), nullable=False)
    type = Column(String, nullable=False)

    folder = relationship("NamerWatchFolder", back_populates="folders")

    def is_dir(self):
        return self.type == "directory"
