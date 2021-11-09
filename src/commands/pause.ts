import { ICommand } from "../interface";

const PauseCommand: ICommand = {
    name: 'pause',
    desc: 'Pauses the player (Toggle Type.)',
    usage: 'None',
    category: 'Music',
    run: async(client, message, args) => {
        let player = client.Music.get(message.guild?.id!);
        if (!player) return message.channel.send(`There is no player in this guild (yet)`);
        if (!player.queue.current) return message.channel.send('There is no music playing!')

        switch(player.paused) {
            case true:
                player.pause(false);
                message.channel.send('Resumed Track.')
                break;
            case false:
                player.pause(true)
                message.channel.send(`Paused Track.`)
                break;
        } /*
            Break a sweat man, I like using switch cases instead of spamming lots of if else
        */
    }
}

export default PauseCommand