const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const { resolve } = require('path')

module.exports = class Core extends Client {
    constructor(bot_token) {
        super({
            intents: new Intents(32767),     
        })
        this.token = bot_token;
    }
    
    commands = new Collection();

    async importEvents() {
        const files = readdirSync(resolve(__dirname, "..", "events", "client")).filter(file => file.endsWith("js"))
        for(const file of files) {
            const event = (
                exports[file.slice(0, -3)] = {
                    name: '',
                    run: async() => {},
                    ...require(resolve(__dirname, "..", "events", "client", file))
                }
            )
            this.on(event.name, (...args) => event.run(this, ...args))
        }
    }

    async importCommands() {
        const commands = readdirSync(resolve(__dirname, "..", "commands"))
    }

    async connect() {
        await this.importEvents()
        return this.login(this.token)
    }
}