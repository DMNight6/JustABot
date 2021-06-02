import os

if os.path.isfile('database.db'):
    pass
else:
    open('./database.db', 'w').close()