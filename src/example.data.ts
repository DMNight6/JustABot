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

/*
This is the example of the configuration file. You put your keys in here. 
To increase security to another level, .env will be used in the future and only data.ts can read .env files.
*/ 