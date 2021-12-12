/* Dynamic help command 131021*/
import { EmbedFieldData, Formatters, MessageEmbed, MessageReaction, User } from "discord.js";
import { info } from "winston";
import { ICommand } from "../../interface";

const DynamicHelpCommand: ICommand = {
    name: 'help',
    desc: 'Get a list of commands',
    category: 'Information',
    usage: '[None/command name]',
    alias: ['h'],
    run: async(client, message, args) => {
        const prefix = await client.getPrefix(message.guild?.id!) || '$'; // Get prefix from guild_prefix.json and returns strings (if not exist, use prefix after ||)
        const cmd: ICommand | undefined = client.commands.get(args.toString()) // Map from discord.Collection • Returns ICommand if exist else undefined.
        const fields: Record<string, ICommand[]> = {}; // Structure for Record • commands.

        for(const command of Array.from(client.commands)) {
            if (!fields[command[1].category]) fields[command[1].category] = [command[1]];
            else fields[command[1].category] = [...fields[command[1].category], command[1]];
        } // Sort Array into fields

        if (!args.length) {
            let currentPage = 0;
            const reactions = ['⬅', '➡'];

            const embed = await ReturnPageination(client.user?.displayAvatarURL({dynamic: true})!, prefix, fields)
            const sendEmbed = await message.channel.send({embeds: [embed[currentPage].setFooter(`Requested By • ${message.author.tag} | Page ${currentPage + 1}/${embed.length}`, message.author.displayAvatarURL({dynamic: true}))]})

            reactions.forEach(async(reaction) => {
                await sendEmbed.react(reaction);
            });

            let filter = (reaction: MessageReaction, user: User) =>  reactions.includes(reaction.emoji.name!) && user.id === message.author.id;
            const collector = sendEmbed.createReactionCollector({filter:  filter, time: 60_000});

            collector.on('collect', async(reaction) => {
                switch(reaction.emoji.name) {
                    case '⬅':
                        if (currentPage !== 0) {
                            --currentPage;
                            sendEmbed.edit({embeds: [embed[currentPage].setFooter(`Requested By • ${message.author.tag} | Page ${currentPage + 1}/${embed.length}`, message.author.displayAvatarURL({dynamic: true}))]})
                        }
                        break;
                    case '➡':
                        if (currentPage < embed.length - 1) {
                            ++currentPage;
                            sendEmbed.edit({embeds: [embed[currentPage].setFooter(`Requested By • ${message.author.tag} | Page ${currentPage + 1}/${embed.length}`, message.author.displayAvatarURL({dynamic: true}))]})
                        }
                        break;
                }
            });
        } else if (cmd !== undefined) {
            const embed = new MessageEmbed()
                .setAuthor(`Bot Commands`, client.user?.displayAvatarURL())
                .setDescription(`C • ${prefix}${cmd.name} ${cmd.usage}\nA: ${cmd.alias} \nD • ${cmd.desc}`)
                .setFooter(`Requested By • ${message.author.tag}`, message.author.displayAvatarURL())

            message.channel.send({ embeds: [embed]})
        } else {
            message.channel.send({ content: `There is no such command called \`${args.toString()}\``})
                .then(msg => setTimeout(() => msg.delete(), 10_000))
        }

    }
}

/* Setting Pagination Soon (Base) */
async function ReturnPageination(iconurl: string, prefix: string, content: any): Promise<Array<MessageEmbed>> {
    const embed = [];

    for(const category in content) {
        const commands = content[category]
        let info = commands.map((cmd: any) => `\`${prefix}${cmd.name} ${cmd.usage}\` • ${cmd.desc}`).join(`\n`);
        const embeds = new MessageEmbed()
            .setAuthor(`Bot Commands`,  iconurl)
            .setDescription(`**${category}**\n${info}`)
            .setColor('GREY')

        embed.push(embeds)
    }

    return <Array<MessageEmbed>>embed
}

export default DynamicHelpCommand