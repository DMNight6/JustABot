import { ICommand } from "../interface";

const PingCommand: ICommand = {
    name: 'ping',
    category: 'Fun',
    alias: [],
    run: async(client, message, args) => {
        await message.channel.send('Pong!')
    }
}

export default PingCommand