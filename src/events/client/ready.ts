import { IEvent } from "../../interface";

/*
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
*/

const ReadyEvent: IEvent = {
    name: 'ready',
    once: true,
    run: async(client) => {
        client.Music.init(client.user?.id); // Initialize manager once its ready.
        client.logger.info(`${client.user?.tag} is up and online`); // Log that the bot is up and ready.

        /*
            Registering slash command globally will take around 1-24 hours. 
            If you wish to test the command, its best you register the command via guild only.
            How? Here's a example. :
                await client.guilds.cache
                    .get(<guild id goes here>) // Get the guild or return undefined
                    ?.commands.set(client.RegisterSlash) // ? is for checking guild is defined or not. If defined, set command at specific guild.
        */
        await client.application?.commands.set(client.RegisterSlash) // This allows you to set the slash command globally.
    }
}

export default ReadyEvent