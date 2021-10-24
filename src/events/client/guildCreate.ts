import { Guild } from "discord.js";
import { IEvent } from "../../interface";

const GuildCreateEvent: IEvent = {
    name: 'guildCreate', // Event called when bot joins the server
    once: false, // This event always run when defined. do not tell the bot to run it once.
    run:  async(client, guild: Guild) => {
        await client.configPrefix(guild.id, '$') // This sets prefix to file guild_prefix.json. Must be awaited else nothing will change and error will be returned
    }
}

export default GuildCreateEvent