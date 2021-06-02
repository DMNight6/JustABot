cursor.execute('CREATE TABLE IF NOT EXISTS sprefix(guildid NUMERIC UNIQUE NOT NULL, prefix TEXT DEFAULT "$")')
database.commit()