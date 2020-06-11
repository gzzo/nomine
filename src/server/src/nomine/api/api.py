import os
import os.path
import pathlib
import asyncio

from graphql import parse
from ariadne import MutationType, SubscriptionType, load_schema_from_path

from nomine.models import Namer
from nomine.models.folder_entry import FolderEntry, FILE_TYPE, DIRECTORY_TYPE

mutation = MutationType()
subscription = SubscriptionType()
bindables = [mutation, subscription]
schema_file = load_schema_from_path(
    pathlib.Path(__file__).parent.joinpath("schema.graphql").absolute()
)
schema = parse(schema_file)
queue = asyncio.Queue()


def get_or_create_entry(session, folder_id, dir_entry):
    if dir_entry.is_file():
        entry_type = FILE_TYPE
    elif dir_entry.is_dir():
        entry_type = DIRECTORY_TYPE
    else:
        return

    existing = (
        session.query(FolderEntry).filter(FolderEntry.path == dir_entry.path).first()
    )
    if existing:
        return existing

    entry = FolderEntry()
    entry.path = dir_entry.path
    entry.type = entry_type
    entry.folder_id = folder_id
    session.add(entry)
    return entry


def walk_folder(session, folder_id, folder):
    for dir_entry in os.scandir(folder):
        if dir_entry.is_file():
            entry = get_or_create_entry(session, folder_id, dir_entry)
            queue.put_nowait(entry)

        if dir_entry.is_dir():
            entry = get_or_create_entry(session, folder_id, dir_entry)
            queue.put_nowait(entry)
            walk_folder(session, folder_id, dir_entry.path)


@mutation.field("scan_namer")
def resolve_scan_namer(_, info, id):
    session = info.context["session"]
    namer = session.query(Namer).get(id)

    for folder in namer.folders:
        walk_folder(session, folder.id, folder.folder)
        session.commit()


@subscription.source("namer_entries")
async def namer_entries_generator(obj, info, id):
    while True:
        item = await queue.get()
        yield item
        queue.task_done()


@subscription.field("namer_entries")
def namer_entries_resolver(entry, info, id):
    print("resolving", entry)
    return entry
