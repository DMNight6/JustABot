import { ICommand } from "../../interface";

const VolumeCommand: ICommand = {
    name: 'volume',
    desc: 'Configure the player volume',
    category: 'Music',
    usage: '<value | 100 <= x > -1 |>',
    alias: ['v', 'vol'],
    run: async(client, message, args) => {
        const player = client.Music.get(message.guild?.id!)

        if(!player) return message.channel.send('This player does not have the player (yet)')
        if (!player.queue.current) return message.channel.send(`Unable to configure volume as there is nothing for me to play.`)

        //Check if value is number (args to number convertion.)
        if (isNaN(+args[0])) return message.channel.send('Value must be a number, not a string!')
        else if (+args[0] > -1 && +args[0] < 101) {
            player.setVolume(+args[0])
            await message.channel.send(`Volume set to ${args[0]}`)
        }

    }
}

export default VolumeCommand