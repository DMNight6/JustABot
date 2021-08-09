# JustABot
 Just a bot that I [live stream](https://twitch.tv/dmnight6) at :D

## Setup
1. Setting up the bot
    ```ini
    [TOKENS]
    FIRST_BOT = BOT_TOKEN_HERE

    [LAVALINK]
    HOST = LAVALINK_HOST_HERE # Lavalink IP here, If its your own PC, do 0.0.0.0
    PORT = LAVALINK_PORT_HERE # Lavalink Port here, on Lavalink Default config (yml), its 2333
    PASS = LAVALINK_PASSWORD_HERE # Lavalink Password here, default pass in lavalink, its 'youshallnotpass'
    REGION = LAVALINK_REGION_HERE # this is technically any country code do 'eu' for better performance (meybe, idk.)
    IDENTIFIER = LAVALINK_IDENTIFER_HERE # Just a identifier for the .jar  logging, pretty much just put any name you want.
    ```
Replace `<BOT_TOKEN_HERE>` with the discord bot token. A tutorial can be seen [here](https://www.youtube.com/watch?v=j_sD9udZnCk).
NOTE: You'll need to invite the bot after its up and ready to be used.

To Do List:
- [] Add Lavalink text channel check
- [] Add server prefix fix
- [] Optimize the code for faster load speed