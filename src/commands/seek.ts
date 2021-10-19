import { ICommand } from "../interface";

const stringMatch = /([0-9]{1,2})[:ms](([0-9]{1,2})s?)?/
const SeekCommand: ICommand = {
    name: 'seek',
    desc: 'Seek the position of desired time of track.',
    category: "Music",
    run: async (client, message, args) => {
        const match = args.toLocaleString().match(stringMatch);
        const timeArray = []
        if (!match) return message.channel.send('Invalid time string');

        if (match[1] !== undefined && match[3] !== undefined) {
            let time = +match[1] * 60 * 1000 + +match[3]*1000
            timeArray.push(time)
        } else if (match[1] !== undefined) {
            let time = +match[1] * 1000
            timeArray.push(time) 
        }

        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send('This guild doesn\'t have any player (yet)')

        if (player.queue.current?.duration! > timeArray[0]) {
            player.seek(timeArray[0])
            message.channel.send(`Seeked to ${args.toString()}`)
        } else return message.channel.send(`Time need to be lower than current track duration`)
    }
}

export default SeekCommand