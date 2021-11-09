import { ICommand } from "../interface";

const LoopCommand: ICommand = {
    name: 'loop',
    desc: 'This enable looping for current track. (Toggle type.)',
    category: 'Music',
    usage: 'None',
    run: async(client, message) => {
        let player = client.Music.get(message.guild?.id!);

        if (!player) return message.channel.send(`This guild doesn't have a guild (yet)`);
        if (player.queue.length === 0 && !player.playing) return message.channel.send(`You didn't play any music kek`);

        switch(player.trackRepeat) {
            case true:
                player.setTrackRepeat(false);
                message.channel.send(`Disabled Track Loop.`);
                break;
            case false:
                player.setTrackRepeat(true);
                message.channel.send(`Enabled Track Repeat`);
                break;
        };
    }
}

export default LoopCommand