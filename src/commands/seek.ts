import { ICommand, sortRegArray } from "../interface";

const stringMatch = /([0-9]{1,2})[:hms](([0-9]{1,2})[:m]?)?(([0-9]{1,2})s?)?/
const SeekCommand: ICommand = {
    name: 'seek',
    desc: 'Seek the position of desired time of track.',
    category: "Music",
    usage: '[Time (2h1m2s/1m20s/1s)]',
    run: async (client, message, args) => {
        let match = args.toLocaleString().match(stringMatch); // Match string with RegExp. ^RegExp. #L3 (RegExp)^

        let ovableTime: number = -1; // Overwriteable. default to -1 for a reason. (^#L36 explains why.^)
        if (!match) return message.channel.send('Invalid Time String');
        let filterMatch: Array<string> = await sortRegArray(match);

        /* Rewrite Time Sorting */
        switch (filterMatch.length) {
            case 6:
                let hmstime = +filterMatch[1] * 360 * 1000 + +filterMatch[3] * 60 * 1000 + +filterMatch[5] * 1000
                ovableTime = hmstime;
                break;
            case 4:
                let mstime = +filterMatch[1] * 60 * 1000 + +filterMatch[3] * 1000
                ovableTime = mstime;
                break;
            case 2:
                let stime = +filterMatch[1] * 1000
                ovableTime = stime;
                break;
        }    
        /* End of Time Rewrite */

        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send('This guild doesn\'t have any player (yet)')

        if (player.queue.current?.duration! > ovableTime && ovableTime > -1) { // When ovableTime is less or equal than -1 || ovableTime is > than current track duration, this function is skipped and moved to else part.
            player.seek(ovableTime)
            message.channel.send(`Seeked to ${args.toString()}`)
        } else return message.channel.send(`Invalid time range!`)
    }
}

export default SeekCommand