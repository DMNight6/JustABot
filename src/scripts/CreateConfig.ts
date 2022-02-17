import { CONFIG } from '../data';

const LavalinkConfig = {
    server: {
        port: CONFIG.LAVALINKCFG.port,
        address: CONFIG.LAVALINKCFG.host
    },

    lavalink: {
        server: {
            password: CONFIG.LAVALINKCFG.password,
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
            'gc-warning': true
        }
    },

    metrics: {
        prometheus: {
            enabled: true,
            endpoint: "/metrics"
        }
    },

    sentry: {
        dsn: ""
    },

    logging: false
}; // Data of application.yml

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const Format = yaml.stringify(LavalinkConfig, { indent: 5 });

// Run when file got executed manually.
fs.writeFileSync(path.resolve(__dirname, 'Lavalink', 'application.yml'), Format);

// Module execute type.
export async function CreateConfig(): Promise<void> {
    return fs.writeFileSync(path.resolve(__dirname, 'application.yml'), Format);
};
