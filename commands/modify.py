import discord
from discord.ext import commands

class Modify(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def modify(self, ctx, role_id: int, list: int):
        permission_code = {
            1: "CREATE_INSTANT_INVITE",
            2: "KICK_MEMBERS",
            3: "BAN_MEMBERS",
            4: "ADMINISTRATOR",
            5: "MANAGE_CHANNELS",
            6: "MANAGE_GUILD",
            7: "ADD_REACTIONS",
            8: "VIEW_AUDIT_LOG",
            9: "PRIORITY_SPEAKER",
            10: "STREAM",
            11: "VIEW_CHANNEL",
            12: "SEND_MESSAGES",
            13: "SEND_TTS_MESSAGES",
            14: "MANAGE_MESSAGES",
            15: "EMBED_LINKS",
            16: "ATTACH_FILES",
            17: "READ_MESSAGE_HISTORY",
            18: "MENTION_EVERYONE",
            19: "USE_EXTERNAL_EMOJIS",
            20: "VIEW_GUILD_INSIGHTS",
            21: "CONNECT",
            22: "SPEAK",
            23: "MUTE_MEMBERS",
            24: "DEAFEN_MEMBERS",
            25: "MOVE_MEMBERS",
            26: "USE_VAD",
            27: "CHANGE_NICKNAME",
            28: "MANAGE_NICKNAME",
            29: "MANAGE_ROLES",
            30: "MANAGE_WEBHOOKS",
            31: "MANAGE_EMOJIS_AND_STICKERS",
            32: "USE_APPLICATION_COMMANDS",
            33: "REQUEST_TO_SPEAK",
            34: "MANAGE_THREADS",
            35: "USE_PUBLIC_THREADS",
            36: "USE_PRIVATE_THREADS",
            37: "USE_EXTERNAL_STICKERS"
        }
        
        ## Parsing the permission into 1 list. (Used when error occured.) 
        permission_name = []
        for x in range(0, (len(permission_code ) + 1)):
            permission_name.append(permission_code.get(x))

def setup(client):
    client.add_cog(Modify(client))