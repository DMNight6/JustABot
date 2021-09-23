# JustABot
 Just a bot that I [live stream](https://twitch.tv/dmnight6) at :D (dw, this is a branch for javascript users)

## Setup
1. Install the required dependecies
    You will need:
        [Node.js](https://nodejs.org/en/)
        [Java JDK < 11](https://www.oracle.com/java/technologies/downloads/)
    After installing, do: `npm install` (Make sure you are in the correct bot directory)

1. Setting up the bot
    ```ts
    const LAVALINK = {
    host: "localhost",
    port: 7777,
    password: 'LAVALINKJS'
    }

    const CONFIG = {
        TOKEN: "EXAMPLE_BOT_TOKEN",
        ERELA: {
            nodes: [LAVALINK],
        }
    }

    export default CONFIG
    ```
Replace `<BOT_TOKEN_HERE>` with the discord bot token.
NOTE: You'll need to invite the bot after its up and ready to be used.
NOTE2: The Example file is provided, You just need to rename `<example.data.ts>` in `<./src/>` to `<data.ts>`
NOTE3: Lavalink is automatically downloaded by the script `<./src/scripts/lavalink.ts>`. No need to manually download it

1. Start the Bot
    To start the Bot, all you need to do is do `<npm run start>` to start the bot. As package.json has:
    ```json
    "scripts": {
        "start": "npm run pm2:lavalink && npm run pm2:bot",
        "pm2:bot": "pm2 start src/index.ts --name\"Bot\"",
        "pm2:lavalink": "pm2 start src/scripts/lavalink.ts --name \"Lavalink\""
    },
    ```