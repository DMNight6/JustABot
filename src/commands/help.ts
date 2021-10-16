/* Dynamic help command 131021*/
import { MessageEmbed } from "discord.js";
import { ICommand } from "../interface";

const DynamicHelpCommand: ICommand = {
    name: 'help',
    category: 'Infomation',
    alias: ['h'],
    run: async(client, message, args) => {
        const array = Object.values(client.commands).slice().sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
        const fields: Record<string, Array<string>> = {};
        for (let i = 0; i < array.length; i++) {
            const command = array[i]
            if (fields[command.category] === undefined) {
                fields[command.category] = []
            }
            fields[command.category].push(command.name);
        }

        if (!args.length) {
            /* Will do this another time kek */
        }
    }
}


export default DynamicHelpCommand