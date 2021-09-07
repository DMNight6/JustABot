import discord
from discord.ext import commands

class FetchUserRole(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def getuserrole(self, ctx, *, suffix: discord.Member=None):
        suffix = ctx.author or suffix

        user_role = [x.mention for x in suffix.roles]

        embed = discord.Embed()
        embed.title = f'Role • {suffix}'
        embed.description = f'{user_role.remove("@@everyone")}'
        await ctx.send(embed=embed)

def setup(client):
    client.add_cog(FetchUserRole(client))