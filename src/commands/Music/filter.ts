import { Message } from "discord.js";
import { Player } from "erela.js";
import { ICommand } from "../../interface";

interface FilterDataStrcuture {
    [key: string]: Function
}

const FilterCommand: ICommand = {
    name: 'filter',
    desc: 'Enables a certain filter for all tracks',
    category: 'Music',
    usage: '<>|[clear]',
    run: async(client, message, args) => {
        let player = client.Music.get(message.guild?.id!)
        let name = args[0].toLowerCase()
        if (!player) return message.channel.send('There is no player in this guild (yet)')
        if (!player.queue.current) return message.channel.send(`There is no music playin atm.`)

        const FilterData: FilterDataStrcuture = {
            nightcore: () => {
                if (player?.filters.nightcore) return -1;
                else return player!.setNightcore(true)
            },
            eightd: () => {
                if (player?.filters.eightD) return -1;
                else return player!.setEightD(true);
            },
            '8d': () => { // Just in case when user do 8d instead of eightd.
                if (player?.filters.eightD) return -1;
                else return player!.setEightD(true);
            },
            daycore: () => {
                if (player?.filters.daycore) return -1;
                else return player!.setDaycore(true);
            },
            trebblebass: () => {
                if (player?.filters.trebblebass) return -1;
                else return player!.setTrebbleBass(true);
            },
        }

        if (name == 'clear' && Object.values(player.filters).includes(true)) {
            player.clearFilters()
            return message.channel.send('Cleared all active filters.')
        }

        if (!FilterData[name]) return message.channel.send(`There is no such Filter!`)
        else {
            if (FilterData[name]() === -1) return message.channel.send('Requested Filter is already on.')
            else return message.channel.send(`Requested Filter - \`\`${name.charAt(0).toUpperCase()+name.slice(1)}\`\` is now on.`)

        }
    } 
}

export default FilterCommand