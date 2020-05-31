import apsw


def get_cursor():
    connection = apsw.Connection('config.db')
    return connection.cursor()


def init_db() -> None:
    cursor = get_cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS namer 
        (
            id INTEGER PRIMARY KEY,
            name TEXT
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS namer_watch_folder 
        (
            id INTEGER PRIMARY KEY,
            namer_id INTEGER NOT NULL,
            folder TEXT NOT NULL,
            FOREIGN KEY (namer_id) REFERENCES namer (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
        )
    ''')
