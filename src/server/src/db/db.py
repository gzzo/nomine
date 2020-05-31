import apsw


def get_cursor():
    connection = apsw.Connection('config.db')
    return connection.cursor()
