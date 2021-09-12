import DiscordJS, { Intents } from 'discord.js';
import create_db from './util/create_db';

create_db(__dirname)
const client = new DiscordJS.Client(
    {
        intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]
    }
);