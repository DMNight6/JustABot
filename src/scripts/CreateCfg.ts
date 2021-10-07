import { CONFIG } from "../data";
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

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
} // File Data of application.yml. 

const Formatting = yaml.stringify(LavalinkConfig, {indent: 5}); // Formatting of the file

export async function createcfg(): Promise<void> {
    return fs.writeFileSync(path.resolve(__dirname, "..", "Lavalink", "application.yml"), Formatting)
} // Will be used in SpawnLavalink.ts