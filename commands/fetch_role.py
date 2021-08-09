import discord
from discord.ext import commands, menus

class RoleMenu(menus.ListPageSource):
    def __init__(self, content, role):
        super().__init__(content, per_page=10)
        self.role = role

    async def format_page(self, menu, page):
        pages = menu.current_page * self.per_page
        embed = discord.Embed()
        embed.title = "Users with role of"
        embed.description = f"""
        Name of role : {self.role}

            [Users With Role]
        """ + '\n'.join(f'{i}' for i in enumerate(page, start=pages))
        return embed

class FetchRole(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def getrole(self, ctx, *, suffix: int):
        try:
            suffix = discord.utils.get(ctx.guild.roles, id=suffix)
            if suffix is None:
                await ctx.send('There\'s no such user with this role, skipping...')
            else:
                menu = menus.MenuPages(source=RoleMenu(suffix.members.mention, suffix.mention), clear_reactions_after=True, delete_message_after=True, timeout=30)
                await menu.start(ctx)
        except:
            await ctx.send("Can't find that role.")

def setup(client):
    client.add_cog(FetchRole(client))