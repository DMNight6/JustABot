import discord, lavalink, re
from discord.ext import commands
from configparser import ConfigParser

Config = ConfigParser()
Config.read('config.ini')
Nodes = Config['LAVALINK']

url = re.compile(r'https?://(?:www\.)?.+')

class Lavalink(commands.Cog):
    def __init__(self, client):
        self.client = client

        if not hasattr(client, 'lavalink'):
            client.lavalink = lavalink.Client(client.user.id)
            client.lavalink.add_node(Nodes['HOST'], Nodes['PORT'], Nodes['PASS'], Nodes['REGION'], Nodes['IDENTIFIER'])
            client.add_listener(client.lavalink.voice_update_handler, 'on_socket_response')
        
        lavalink.add_event_hook(self.track_hook)

    def cog_unload(self):
        self.client.lavalink._event_hooks.clear()

    async def cog_before_invoke(self, ctx):
        guild_check = ctx.guild is not None

        if guild_check:
            await self.ensure_voice(ctx)
        
        return guild_check

    #async def cog_command_error(self, ctx, error):
    #    if isinstance(error, commands.CommandInvokeError):
    #        await ctx.send(error.original)
    
    async def ensure_voice(self, ctx):
        player = self.client.lavalink.player_manager.create(ctx.guild.id, endpoint=str(ctx.guild.region))

        should_connect = ctx.command.name in ('play', 'search')

        if not ctx.author.voice or not ctx.author.voice.channel:
            raise commands.CommandInvokeError('Join a voice channel first')

        if not player.is_connected:
            if not should_connect:
                raise commands.CommandInvokeError('Unable to connect, *Is it in the "should_connect" list?*')

            permissions = ctx.author.voice.channel.permissions_for(ctx.me)

            if not permissions.connect or not permissions.speak:
                raise commands.CommandInvokeError('I need the "CONNECT" and "SPEAK" permissions.')
            
            player.store('channel', ctx.channel.id)
            await ctx.guild.change_voice_state(channel=ctx.author.voice.channel)
        else:
            if int(player.channel_id) != ctx.author.voice.channel.id:
                raise commands.CommandInvokeError('You\'re not in the correct voice channel!')
    
    async def track_hook(self, event):
        if isinstance(event, lavalink.events.QueueEndEvent):
            guild_id = int(event.player.guild_id)
            guild = self.client.get_guild(guild_id)
            await guild.change_voice_state(channel=None)
    
    @commands.command()
    async def play(self, ctx, *, query: str):
        player = self.client.lavalink.player_manager.get(ctx.guild.id)
        query = query.strip('<>')

        if not url.match(query):
            query = f'ytsearch:{query}'

        results = await player.node.get_tracks(query)

        if not results or not results['tracks']:
            return await ctx.send('Nothing found!')

        embed = discord.Embed(color=discord.Color.gold())

        if results['loadType'] == 'PLAYLIST_LOADED':
            tracks = results['tracks']

            for track in tracks:
                player.add(requester=ctx.author.id, track=track)

            embed.title = 'Playlist Enqueued!'
            embed.description = f'{results["playlistInfo"]["name"]} - {len(tracks)} tracks'
        else:
            track = results['tracks'][0]
            embed.title = 'Track Enqueued'
            embed.description = f'[{track["info"]["title"]}]({track["info"]["uri"]})'

            track = lavalink.models.AudioTrack(track, ctx.author.id, recommended=True)
            player.add(requester=ctx.author.id, track=track)

        await ctx.send(embed=embed)

        if not player.is_playing:
            await player.play()

    @commands.command()
    async def search(self, ctx, *, query: str):
        player = self.client.lavalink.player_manager.get(ctx.guild.id)
        query = query.strip('<>')

        if url.match(query):
            return await ctx.send("You used the wrong command for this.")
        else:
            query = f"ytsearch:{query}"
        
        results = await player.node.get_tracks(query)

        if not results or not results['tracks']:
            await ctx.send("Nothing Found. Try again.")

        query_embed = discord.Embed(color=discord.Color.dark_blue())
        
        tracks = results['tracks'][0:10]
        i = 0
        query_result = ''
        for track in tracks:
            i = i + 1
            query_result = query_result + f'{i} • [{track["info"]["title"]}]({track["info"]["uri"]})\n'

        query_embed.description = query_result
        await ctx.send(embed=query_embed)

        def check(message):
            return ctx.author == message.author
        
        responses = await self.client.wait_for('message', check=check, timeout=20)
        if responses.content in ['cancel', 'c']:
            return await ctx.send('Canceled search')
        else:
            try:
                track = tracks[int(responses.content)-1]
            except Exception as err:
                raise commands.CommandInvokeError(err)

        embed = discord.Embed(color=discord.Color.gold())
        embed.title = 'Track Enqueued'
        embed.description = f'[{track["info"]["title"]}]({track["info"]["uri"]})'

        await ctx.send(embed=embed)

        addTrack = lavalink.models.AudioTrack(track, ctx.author.id, recommended=True)
        player.add(requester=ctx.author.id, track=addTrack)

        if not player.is_playing:
            await player.play()

    @commands.command()
    async def skip(self, ctx):
        player = self.client.lavalink.player_manager.get(ctx.guild.id)

        if len(player.queue) > 0 and player.is_connected and player.is_playing:
            await ctx.send("Skipped")
            await player.skip()
        else:
            await ctx.send("There's No Song In The Queue For Me To Skip.")

def setup(client):
    client.add_cog(Lavalink(client))