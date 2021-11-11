import { ICommand, sortRegArray } from "../../interface";

const stringMatch = /([0-9]{1,2})[:ms](([0-5]?[0-9]{1,2})s?)?/ // Edit RegExp to limit seconds to 59s only.

const SeekCommand: ICommand = {
    name: 'seek',
    desc: 'Seek the position of desired time of track.',
    category: "Music",
    usage: '[Time (1m1s/1m/1s)]',
    run: async (client, message, args) => {
        let match = args.toLocaleString().match(stringMatch); // Match string with RegExp. ^RegExp. #L3 (RegExp)^
        let ovableTime: number = -1; // Overwriteable. default to -1 for a reason. (^#L36 explains why.^)
        if (!match) return message.channel.send('Invalid Time String');
        let filterMatch: Array<string> = await sortRegArray(match);

        /* Rewrite Time Sorting */
        switch (filterMatch.length) {
            case 4:
                let msTime = +filterMatch[1] * 60 * 1000 + (+filterMatch[3] * 1000) // Preventing confusion. ^ Doing +string will convert string to number (Only capable when string is a number.)^
                ovableTime = msTime
                break;
            case 2:
                if (filterMatch[0].endsWith('m')) {
                    let mTime = +filterMatch[1] * 60 * 1000
                    ovableTime = mTime
                }
                else {
                    let sTime = +filterMatch[1] * 1000
                    ovableTime = sTime
                }
                break;
        }    
        /* End of Time Rewrite */

        const player = client.Music.get(message.guild?.id!)
        if (!player) return message.channel.send('This guild doesn\'t have any player (yet)')

        if (player.queue.current?.duration! > ovableTime && ovableTime > -1 && !player.queue.current?.isStream) { // When ovableTime is less or equal than -1 || ovableTime is > than current track duration || current track is stream, this function is skipped and moved to else part.
            player.seek(ovableTime) // Go to provided duration.
            message.channel.send(`Seeked to ${args.toString()}`)
        } else return message.channel.send(`Invalid time range!`)
    }
}

export default SeekCommand