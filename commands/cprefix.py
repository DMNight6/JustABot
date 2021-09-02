import discord, sqlite3
from discord.ext import commands

database = sqlite3.connect('database.db')
cursor = database.cursor()

class cprefix(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def cprefix(self, ctx, *, suffix):
        if suffix is None or suffix == discord.Member.mention:
            await ctx.send("Prefix cannot be a mention or empty")
        else:
            cursor.execute('UPDATE sprefix SET prefix = $1 WHERE guildid = $2',(suffix, ctx.guild.id,))
            database.commit()

def setup(client):
    client.add_cog(cprefix(client))

