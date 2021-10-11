import { ICommand } from "../interface";

const TestArgsEvent: ICommand = {
    name: "testargs",
    category: 'Dev',
    alias: [],
    run: async(client, message, args) => {
        message.channel.send(`Successfully called argument TEST command.\nArguments: ${args}`)
    }
}

export default TestArgsEvent