import { SlashCommandBuilder } from "../interface/slashcommands";

const PingSlashCommand: SlashCommandBuilder = {
    name: 'ping',
    description: 'Returns Websocket Ping',
    run: async(client, interection) => {
        await interection.reply({content: `Ping is ${client.ws.ping}ms`})
    }
}

export default PingSlashCommand