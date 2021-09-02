import discord
from discord.ext import commands

class Clear(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def clear(self, ctx, suffix: int):
        if ctx.author.guild_permissions.manage_message and suffix > 0:
            await ctx.channel.purge(limit=suffix)

def setup(client):
    client.add_cog(Clear(client))
