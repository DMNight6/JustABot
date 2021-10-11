import { MessageEmbed } from "discord.js";
import { ICommand } from "../interface";

const GetGuildInfoCommand: ICommand = {
    name: 'getguild',
    category: 'Information',
    run: async(client, message, args) => {
        const Embed = new MessageEmbed();
        Embed.setAuthor(`Guild Info • ${message.guild?.name}`, message.guild?.iconURL({dynamic: true})!)
        Embed.description = `
                Creation Date • ${message.guild?.createdAt.toLocaleString()} 
                Owner • ${(await message.guild?.fetchOwner())?.user.tag} 
                Verification Level • ${message.guild?.verificationLevel} 
                Verified? : ${message.guild?.verified ? 'Yes' : 'No'} 
        `
        Embed.setFooter(`Requested By • ${message.author.tag}`, message.author.displayAvatarURL())
        Embed.setColor("RANDOM")
        await message.channel.send({embeds: [Embed]})
    }
}

export default GetGuildInfoCommand