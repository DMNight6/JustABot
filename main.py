import discord, sqlite3, os, logging, asyncio
from discord.ext import commands
from configparser import ConfigParser

exec(open('./util/logging.py').read())

Config = ConfigParser()
Config.read('./config.ini')

exec(open('./util/create_database.py').read())
database = sqlite3.connect(database='database.db')
cursor = database.cursor()
exec(open('./util/create_table.py').read())

def get_prefix(client, message):
    prefixes = cursor.execute('SELECT prefix FROM sprefix WHERE guildid = $1',(message.guild.id,)).fetchone()
    return prefixes[0]

# Intents Fix, Command returining permission to API error. (Line 26)
client = commands.AutoShardedBot(
    command_prefix=get_prefix,
    status = discord.Status.idle,
    activity = discord.Activity(type=3, name='assets getting loaded'),
    intents = discord.Intents.all()
    )

client.remove_command('help')

async def change_presence(client, timer: int):
    presence_list = ['whatismyprefix','help']
    for x in presence_list:
        await client.change_presence(
            activity=discord.Activity(type=3, name=x),
            status = discord.Status.online    
        )
        await asyncio.sleep(timer)
@client.listen('on_ready')
async def load_command():
    for command in os.listdir('./commands'):
        if command.endswith('.py'):
            print(f'Loaded <{command[:-3]}>')
            client.load_extension(f'commands.{command[:-3]}')

@client.listen('on_ready')
async def start_sync_presence():
    await client.loop.create_task(change_presence(client=client, timer=10))
    print(f'{client.user.name} up and ready')
    
@client.listen()
async def on_guild_join(guild):
    cursor.execute('INSERT INTO sprefix VALUES (?, ?)', (guild.id, '$'))
    database.commit()

@client.listen()
async def on_guild_leave(guild):
    cursor.execute('DELETE FROM sprefix WHERE guildid = $1', (guild.id,))
    database.commit()

@client.listen('on_message')
async def return_prefix(message):
    if message.content == "whatismyprefix":
        await message.channel.send(await client.get_prefix(message))

client.run(Config['TOKENS']['FIRST_BOT'])