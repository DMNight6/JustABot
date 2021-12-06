import { Interaction } from "discord.js";
import { IEvent } from "../../interface";

const InterectionCreateEvent: IEvent = {
    name: 'interactionCreate',
    once: false,
    run: async(client, interaction: Interaction) => {
        if (!interaction.guild) return
        if (interaction.isCommand()) {
            const cmd = client.slashcommands.get(interaction.commandName);
            if (!cmd) return interaction.reply({content: 'An error occured.', ephemeral: true});
            await cmd.run(client, interaction)
        }
    }
}

export default InterectionCreateEvent