const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const { resolve } = require('path');
const { WinstonLogger } = require('./Logger');

module.exports = class Core extends Client {
    constructor(bot_token) {
        super({
            intents: new Intents(32767),     
        })
        this.token = bot_token;
    }
    
    commands = new Collection();
    logger = WinstonLogger

    async importEvents() {
        const eventFiles = readdirSync(resolve(__dirname, '..', 'events', 'client')).filter(file => file.endsWith('js'));
        for (const file of eventFiles) {
            const event = require(resolve(__dirname, "..", "events", "client", file));
            (event.once ? this.once(event.name, (...args) => event.run(...args)) : this.on(event.name, (...args) => event.run(...args)))
        }
    }

    async importCommands() {

    }

    async connect() {
        await this.importEvents();
        await this.importCommands();
        return this.login(this.token);
    }
}