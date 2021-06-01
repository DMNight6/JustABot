import discord, sqlite3, os, logging
from discord.enums import Status
from discord.ext import commands
from configparser import ConfigParser

Config = ConfigParser()
Config.read('config.ini')

client = commands.AutoShardedBot(
    command_prefix='?',
    status = discord.Status.idle,
    activity = discord.Activity(type=3, name='assets getting loaded')
    )

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

client.run(Config['TOKENS']['FIRST_BOT'])