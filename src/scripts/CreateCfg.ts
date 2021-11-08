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

fs.writeFileSync(path.resolve(__dirname, "Lavalink", "application.yml"), Formatting) // Wrtie when this file ran by manual.

export async function createcfg(): Promise<void> {
    return fs.writeFileSync(path.resolve(__dirname, "application.yml"), Formatting)
} // Will be used in SpawnLavalink.ts