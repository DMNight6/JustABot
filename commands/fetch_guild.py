import discord
from discord.ext import commands, menus

class FetchGuildMenu(menus.ListPageSource):
    def __init__(self, content, ctx):
        super().__init__(content, per_page=10)
        self.ctx = ctx

    async def format_page(self, menu, page):
        pages = menu.current_page * self.per_page
        embed = discord.Embed()
        embed.title = "List of guild I am in"
        embed.description = '\n'.join(f'{i + 1} • {v}' for i, v in enumerate(page, start=pages))
        return embed

class FetchGuild(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def getguild(self, ctx, *, suffix=None):
        guildList = self.client.guilds
        try: suffix = int(suffix)
        except Exception as err: pass

        if suffix is None:
            p = menus.MenuPages(source=FetchGuildMenu(guildList, ctx), clear_reactions_after=True, timeout=30)
            await p.start(ctx)
        else:
            embed = discord.Embed()
            guildList = self.client.guilds[suffix - 1]
            embed.title = f"Guild Info • {guildList.name}"
            embed.description = f"""
                Owner of this guild • {guildList.owner}
                Member count including Bots • {len(guildList.members)}
                Verfication Level • {guildList.verification_level}
            """
            embed.set_thumbnail(url=guildList.icon_url)
            await ctx.send(embed=embed)

def setup(client):
    client.add_cog(FetchGuild(client))