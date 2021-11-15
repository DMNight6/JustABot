import { clear } from "winston";
import { ICommand } from "../../interface";

const DisconnectCommand: ICommand = {
    name: 'disconnect',
    desc: 'Tells the bot to leave the VC',
    category: 'Music',
    usage: 'None',
    alias: ['fuckoff', 'dc'],
    run: async(client, message, args) => {
        let player = client.Music.get(message.guild?.id!);
        if (!player) return message.channel.send(`This guild doesn't have a player (yet)`)
        
        player.queue.clear()
        player.destroy()
        await message.channel.send('Disconnected.')
        if (client.PlayerTimeoutTask) clearTimeout(client.PlayerTimeoutTask);
    }
}

export default DisconnectCommand