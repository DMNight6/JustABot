import Discord from 'discord.js'
import { ICommand } from '../interface'

const QueueCommand: ICommand = {
    name: 'queue',
    category: 'Music',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send(`This guild doesn't have any player (yet)`)
        if (player?.queue.length === 0 && !player.queue.current) return message.channel.send(`kekw, this guild doesn't have any song playing + queue is empty`)

    }
}

export default QueueCommand
