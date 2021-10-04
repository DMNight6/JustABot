const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const { resolve } = require('path');
const { WinstonLogger }= require('./Logger');
const { Manager } = require('erela.js');

module.exports = class Core extends Client {
    constructor(bot_token, lvData) {
        super({
            intents: new Intents(32767),     
        })
        this.token = bot_token;
        this.lvCfg = lvData
    }
    
    commands = new Collection();
    logger = WinstonLogger
    Music = new Manager({
        nodes: [
            ...this.lvCfg
        ],
        send(id, payload) {
            const guild = this.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    })

    async importEvents() {
        const eventFiles = readdirSync(resolve(__dirname, '..', 'events', 'client')).filter(file => file.endsWith('js'));
        for (const file of eventFiles) {
            const event = require(resolve(__dirname, "..", "events", "client", file));
            (event.once? this.once(event.name, (...args) => event.run(...args)) : this.on(event.name, (...args) => event.run(...args)))
        }
    }

    async importManagerEvents() {
        const ManagerEvent = readdirSync(resolve(__dirname, '..', 'events', 'manager')).filter(file => file.endsWith('js'))
        for (const file of ManagerEvent) {
            const Manager = require(resolve(__dirname, '..', 'events', 'manager', file));
            this.Music.on(Manager.name, (...args) => Manager.run(...args))
        }
    }

    async importCommands() {
        const comamndFiles = readdirSync(resolve(__dirname, '..', 'commands')).filter(file=>file.endsWith('js'))
        for (const file of comamndFiles) {
            const command = (
                exports[file.slice(0, -3)] = {
                    name: 'test',
                    category: 'Uncategorized',
                    info: 'No description provided.',
                    alias: [],
                    run: async() => {},
                    ...require(resolve(__dirname, '..', 'commands', file))
                }
            )
            this.commands.set(command.name, command)
        }
    }

    async connect() {
        await this.importEvents();
        await this.importManagerEvents();
        await this.importCommands();
        return this.login(this.token);
    }
}