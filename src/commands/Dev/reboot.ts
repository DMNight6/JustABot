import { ICommand } from "../../interface";
import { resolve } from 'path'

const RebootCommand: ICommand = {
    name: 'reboot',
    desc: 'Reboots the bot',
    usage: 'None',
    category: 'Dev',
    owneronly: true,
    run: async(client, message, args) => {
        message.channel.send(`Executed reboot.`);
        (await import('child_process')).exec(resolve(__dirname, '..', '..', '..', 'stop.sh')) // Fix script not executing properly.
    }
}

export default RebootCommand