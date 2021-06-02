import discord, sqlite3, os, logging
from discord.ext import commands
from configparser import ConfigParser

Log = logging.getLogger('discord')
Log.setLevel(logging.DEBUG)
Handlers = logging.FileHandler('client.log', 'w', 'utf-8', False)
Handlers.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s] : %(message)s'))
Log.addHandler(Handlers)

Config = ConfigParser()
Config.read('config.ini')

exec(open('./util/create_database.py').read())
database = sqlite3.connect(database='database.db')
cursor = database.cursor()
exec(open('./util/create_table.py').read())

def get_prefix(client, message):
    prefixes = cursor.execute('SELECT prefix FROM sprefix WHERE guildid = $1',(message.guild.id,)).fetchone()
    return prefixes[0]

client = commands.AutoShardedBot(
    command_prefix=get_prefix,
    status = discord.Status.idle,
    activity = discord.Activity(type=3, name='assets getting loaded')
    )

client.remove_command('help')

@client.listen()
async def on_ready():
    print(f'{client.user.name} up and ready')
    await client.change_presence(
        activity=discord.Activity(type=2, name='server_prefix'),
        status=discord.Status.online
    )
    for command in os.listdir('./commands'):
        if command.endswith('.py'):
            client.load_extension(f'commands.{command[:-3]}')

@client.listen()
async def on_guild_join(guild):
    cursor.execute('INSERT INTO sprefix VALUES (?, ?)', (guild.id, '$'))
    database.commit()

@client.listen()
async def on_guild_leave(guild):
    cursor.execute('DELETE FROM sprefix WHERE guildid = $1', (guild.id,))
    database.commit()

client.run(Config['TOKENS']['FIRST_BOT'])