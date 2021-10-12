# JustABot
 Just a bot that I [live stream](https://twitch.tv/dmnight6) at :D

## Setup
1. Install the required dependecies

    You will need:

        [Node 16+ With NPM selection selected](https://nodejs.org/en/)

    After installing, do: `<npm install>` (Make sure you are in the correct bot directory)

    After `<npm install>`, do `<npm install typescript ts-node>`

1. Setting up the bot
```ts
    const LAVALINK = {
        host: 'localhost',
        port: 7777,
        pass: "LAVALINKJS"
    }
    export const CONFIG = {
        TOKEN: "EXAMPLE_BOT_TOKEN", // Replace EXAMPLE_BOT_TOKEN with your bot token.
        ERELA: {
            nodes: [LAVALINK]
        },
        LAVALINK
    }
```
Replace `<EXAMPLE_BOT_TOKEN>` with your bot token. No need to create your own data.ts as I already provivded the file for you.

Note: You need to rename the file from `<example.data.ts -> data.ts>`

1. Start the bot
By doing `<npm run start>`, the bot will boot up, logging with bot name + tag with a few string.