exports.name = "argstest",
exports.category = "Dev",
exports.info = "Testing if args works as expected."
exports.alias = [],
exports.run  = async(client, message, args) => {
    if (!args.length) message.channel.send('Arguments cannot be empty!');
    await message.channel.send(args);
}