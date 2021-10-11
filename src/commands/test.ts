import { ICommand } from "../interface";

const TestCommand: ICommand = {
    name: 'test',
    category: 'Dev',
    alias: [],
    run: async (client, message) => {
        message.channel.send('Successfully called TEST command.')
    }
}

export default TestCommand