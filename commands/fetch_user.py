import discord
from discord.ext import commands

class FetchUser(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def getuser(self, ctx, *, id=None):
        id = discord.User or discord.utils.get(ctx.guild.members, id=id)
        embed = discord.Embed()
        embed.set_thumbnail(url=id.avatar_url)
        embed.description = f"""
            Username : {id.name}
            On guild name : {id.display_name}
            Bot? : {id.bot}
            Created At : {id.created_at}
        """
        await ctx.send(embed=embed)

def setup(client):
    client.add_cog(FetchUser(client))