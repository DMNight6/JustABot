import discord
from discord.ext import commands

class Say(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def say(self, ctx, *, suffix):
        await ctx.send(f'{suffix}')
        raise kekw

def setup(client):
    client.add_cog(Say(client))