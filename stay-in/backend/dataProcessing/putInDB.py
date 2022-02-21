import csv, sqlite3
from sqlite3 import Error

# Create a test DB
def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()



#create_connection(r"/Users/sinarest/Documents/DEV_Stuff/Web/SE/Stay.in/stay-in/backend/automation/test.db")

# Putting data
def putInDB():
    con = sqlite3.connect("/Users/sinarest/Documents/DEV_Stuff/Web/SE/Stay.in/stay-in/backend/automation/test.db") # change to 'sqlite:///your_filename.db'
    cur = con.cursor()
    cur.execute("DROP TABLE t;")
    #cur.execute("CREATE TABLE for_sale (id, userID, state, lat, long, purpose, price, title, rooms, baths, area, photoUrl, contact_name);") # use your column names here

    with open('data.csv','r') as fin: # `with` statement available in 2.5+
        # csv.DictReader uses first line in file for column headings by default
        dr = csv.DictReader(fin) # comma is default delimiter
        to_db = [(i['col1'], i['col2']) for i in dr]

    cur.executemany("INSERT INTO t (col1, col2) VALUES (?, ?);", to_db)
    con.commit()
    con.close()
    
putInDB()