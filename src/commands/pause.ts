import { ConvertTime, ICommand } from "../interface";

const expression = /([0-9]*(?=[^0-9]))/g

const PauseCommand: ICommand = {
    name: 'pause',
    description: 'Pauses the player.',
    options: [{
        name: 'time',
        description: 'Unpause after time reach. (Format • 10m1s / 10m / 1s)',
        type: 'STRING',
        required: false
    }],
    run: async(client, interaction) => {
        const string = interaction.options.getString('time');
        const player = client.Music.get(interaction.guild?.id!);

        if (!player) return interaction.reply({ content: 'There is no active player in this guild'});

        if (string) {
            let time: number = 0;

            let FilteredSplit = string.split(expression).filter(n => n);

            if (FilteredSplit.length == 4 && FilteredSplit[1] == 'n' && FilteredSplit[3] == 's' && !(isNaN(+FilteredSplit[0])) && !(isNaN(+FilteredSplit[3]))) {
                time = (+FilteredSplit[0] * 60 * 1_000) + (+FilteredSplit[3] * 1_000);
            } else if (FilteredSplit.length == 2 && FilteredSplit[1] == 'm' && !(isNaN(+FilteredSplit[0]))) {
                time = +FilteredSplit[0] * 60 * 1_000;
            } else if (FilteredSplit.length == 4 && FilteredSplit[1] == 's' && !(isNaN(+FilteredSplit[0]))) {
                time = +FilteredSplit[0] * 1_000;
            } else return interaction.reply({ content: 'Invalid time Format!, `Formats • 1m10s, 10s, 10m`' });

            client.TimerCFG.push({ 
                Id: interaction.guild?.id!, 
                timeout: setTimeout(() => {
                    player.pause(false);
                }, time)
            });

            return interaction.reply({ content: 'Paused the player for ' + ConvertTime(time)});
        } else {
            player.pause(true);
            return interaction.reply({ content: 'Player paused without time limit. '})
        };
    }
};

export default PauseCommand;