import * as yaml from 'yaml';
import * as fs from 'fs';
import CONFIG from '../data';
import Logger from '../Struct/Logger'

Logger.info('Creating Lavalink Config File...');

const LavalinkConfig = {
    server: {
        port: CONFIG.LAVALINK.port,
        address: CONFIG.LAVALINK.host,
    },

    lavalink: {
        server: {
            password: CONFIG.LAVALINK.password,
            sources: {
                youtube: true,
                bandcamp: true,
                soundcloud: true,
                twitch: true,
                vimeo: true,
                http: true,
                local: true,
        },
        bufferDuration: 400,
        youtubePlaylistLoadLimit: 6,
        youtubeSearchEnabled: true,
        soundcloudSearchEnabled: true,
        "gc-warning": true,
        "#ratelimit": {
            "#ipBlocks": ["1.0.0.0/8", "..."], //List of ip blocks
            "#excludedIps": ["...", "..."], //IPs which should be explicit excluded
            "#strategy": "RotateOnBan", //RotateOnBan | LoadBalance | NanoSwitch | RotatingNanoSwitch
            "#searchTriggersFail": true, //Whether a search 429 should trigger marking the ip as failing
            "#retryLimit": -1, //-1 = use default lavaplayer value | 0 = infinity | >0 = retry will happen this numbers times
        },
    },
    },
    metrics: {
        prometheus: {
            enabled: true,
            endpoint: "/metrics",
        },
    },
    sentry: {
        dsn: "",
    },
    logging: false,
}

const yamlFormating = yaml.stringify(LavalinkConfig, {
    indent: 4,
});

export function createLavalinkConfig() {
    fs.writeFileSync("../Lavalink/application.yaml", yamlFormating)
}

fs.writeFileSync("./application.yaml", yamlFormating)