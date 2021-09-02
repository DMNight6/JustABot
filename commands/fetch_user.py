import discord
from discord.ext import commands

class FetchUser(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def getuser(self, ctx, *, suffix: discord.Member=None):
        member = suffix or ctx.author
        embed = discord.Embed()
        embed.set_thumbnail(url=member.avatar_url)
        embed.description = f"""
            Username • {member.name}
            On guild name • {member.display_name}
            Bot? • {member.bot}
            Created At • {member.created_at}
        """
        await ctx.send(embed=embed)

def setup(client):
    client.add_cog(FetchUser(client))