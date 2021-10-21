import { ICommand } from "../interface";

const QueueLoopCommand: ICommand = {
    name: 'queueloop',
    desc: 'Loop the queue',
    category: 'Music',
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!);
        if (!player) return message.channel.send(`There is no player available in this guild (yet)`)

        if (player.queue.length === 0) return message.channel.send(`You can't do queue loop as queue is empty afaik`)

        switch(player.queueRepeat) {
            case true:
                player.setQueueRepeat(false)
                await message.channel.send(`Disabled Queue Loop`)
                break;
            case false:
                player.setQueueRepeat(true)
                await message.channel.send(`Enabled Queue Loop`)
                break;
        } // If statement but better.
    }
}

export default QueueLoopCommand