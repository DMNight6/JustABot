import { ICommand } from "../interface";

const TestArgsEvent: ICommand = {
    name: 'testargs',
    desc: 'Test if args are parsed sucessfully',
    category: 'Dev',
    usage: '[args]',
    alias: [],
    run: async(client, message, args) => {
        message.channel.send(`Successfully called argument TEST command.\nArguments: ${args}`)
    }
}

export default TestArgsEvent