### config.py
import mysql.connector

def get_connection():
    """
    Establish a connection to the MySQL database.
    """
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Liku@123#",
            database="school_ma",
            auth_plugin='mysql_native_password'
        )
        print("Database connected!")
        return connection
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
        raise
