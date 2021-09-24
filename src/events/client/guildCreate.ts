import { IEvent } from 'm1';
import { Guild } from 'discord.js';
import fs from 'fs';
import Logger from '../../Struct/Logger';

var prefixes = require('../../prefix_data.json');
const guildCreateEvent: IEvent = {
    name: 'guildCreate',
    async execute(client, guild: Guild) {
        if (!prefixes[guild.id]) {
            prefixes[guild.id] = {
                prefix: '$'
            }
        }
        fs.writeFile('../../prefix_data.json', JSON.stringify(prefixes, null, 2), (err) => {
            if (err) Logger.info(err)
        })
    } 
}

export default guildCreateEvent;