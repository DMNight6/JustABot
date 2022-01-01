import { SlashCommandBuilder } from "../interface/slashcommands";

interface FilterDataStrcuture {
    [key: string]: Function
}

const SlashFliterCommand: SlashCommandBuilder = {
    name: 'filter',
    description: 'Enable/Disabled provided filter',
    options: [
        {
            name: 'filtername',
            description: 'Provided filter',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Nightcore',
                    value: 'nightcore'
                }, 
                {
                    name: '8D',
                    value: 'eightd'
                },
                {
                    name: 'Daycore',
                    value: 'daycore'
                },
                {
                    name: 'Trebble Bass',
                    value: 'trebblebass'
                },
                {
                    name: 'Soft',
                    value: 'soft'
                },
                {
                    name: 'Tremolo',
                    value: 'tremolo'
                },
                {
                    name: 'Ear rape',
                    value: 'earrape'
                },
                {
                    name: 'Pop',
                    value: 'pop'
                },
                {
                    name: 'Vaporwave',
                    value: 'vaporwave'
                },
                {
                    name: 'Distortion',
                    value: 'distortion'
                },
                {
                    name: 'Vibrato',
                    value: 'vibrato'
                },
                {
                    name: 'Karaoke',
                    value: 'karaoke'
                },
                {
                    name: 'Clear Filter',
                    value: 'clear'
                },
            ],
        }
    ],
    run: async(client, interaction) => {
        let filterName = interaction.options.getString('filtername')!.toLowerCase();
        let player = client.Music.get(interaction.guild?.id!);

        if (!player) return interaction.reply({ content: 'There is no player in this guild (yet).', ephemeral: true });
        const FilterData: FilterDataStrcuture = {
            nightcore: () => {
                if (player?.filters.nightcore) {player.setNightcore(false); return -1;}
                else return player!.setNightcore(true)
            },
            eightd: () => {
                if (player?.filters.eightD) { player.setEightD(false); return -1; }
                else return player!.setEightD(true);
            },
            daycore: () => {
                if (player?.filters.daycore) { player.setDaycore(false); return -1; }
                else return player!.setDaycore(true);
            },
            trebblebass: () => {
                if (player?.filters.trebblebass) { player.setTrebbleBass(false); return -1;}
                else return player!.setTrebbleBass(true);
            },
            soft: () => {
                if (player?.filters.soft) { player.setSoft(false); return -1; }
                else return player!.setSoft(true)
            },
            tremolo: () => {
                if (player?.filters.tremolo) { player.setTremolo(false); return -1; }
                else return player!.setTremolo(true)
            },
            earrape: () => {
                if (player?.filters.earrape) { player.setEarrape(false); return -1; }
                else return player!.setEarrape(true)
            },
            pop: () => {
                if (player?.filters.pop) { player.setPop(false); return -1; }
                else return player!.setPop(true)
            },
            vaporwave: () => {
                if (player?.filters.vaporwave) { player.setVaporwave(false); return -1; }
                else return player!.setVaporwave(true)
            },
            distortion: () => {
                if (player?.filters.distortion) { player.setDistortion(false); return -1; }
                else return player!.setDistortion(true)
            },
            vibrato: () => {
                if (player?.filters.vibrato) { player.setVibrato(false); return -1; }
                else return player!.setVibrato(true)
            },
            karaoke: () => {
                if (player?.filters.karaoke) { player.setKaraoke(false); return -1; }
                else return player!.setKaraoke(true)
            }
        }

        if (filterName == "clear") {
            switch(Object.values(player.filters).includes(true)) {
                case true:
                    player.clearFilters()
                    return interaction.reply({ content: "Cleared all active fitlers", ephemeral: true });
                case false: 
                    return interaction.reply({ content: 'There\'s no active filter', ephemeral: true });
            } // Clear Filter Handler.
        }

        if (!FilterData[filterName]) return interaction.reply({ content: 'There is no such Filter!'});
        else {
            if (FilterData[filterName]() === -1) return interaction.reply({ content: `Requested Filter - \`\`${filterName.charAt(0).toUpperCase() + filterName.slice(1)}\`\` is now off.`, ephemeral: true });
            else return interaction.reply({ content: `Requested Fitler - \`\`${filterName.charAt(0).toUpperCase() + filterName.slice(1)}\`\` is now on.`})
        }
    }
}

export default SlashFliterCommand