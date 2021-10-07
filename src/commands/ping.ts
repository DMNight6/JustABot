import { ICommand } from "../interface";

const PingCommand: ICommand = {
    name: 'ping',
    category: 'Fun',
    alias: [],
    run: async(client, message, args) => {
        message.channel.send('Pong!')
    }
}

export default PingCommand