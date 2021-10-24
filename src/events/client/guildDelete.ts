import { Guild } from "discord.js";
import { IEvent } from "../../interface";

const GuildDeleteEvent: IEvent = {
    name: 'guildDelete', // Event called when bot leaves a guild.
    once: false,
    run: async(client, guild: Guild) => {
        await client.deletePrefix(guild.id) /* This deletes the prefix like a snap from Thanos fingers */
    }
}

export default GuildDeleteEvent