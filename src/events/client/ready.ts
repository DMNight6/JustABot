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
    }
}

export default ReadyEvent