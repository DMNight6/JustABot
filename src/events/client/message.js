const { run } = require("./ready");

module.exports = {
    name: message,
    once: false,
    async run(client, message) {
        if (!message.content.startWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.has(command) || client.commands.find(cmd => cmd.alias && cmd.alias.include(command))
        if(!client.commands.has(command)) return;
        cmd.execute(client, message, args)
    }
}