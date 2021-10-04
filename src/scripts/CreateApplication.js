const yaml = require('yaml');
const fs = require('fs');
const {CONFIG} = require('../data');
const {resolve} = require('path');

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

const yamlFormat = yaml.stringify(LavalinkConfig, {
    indent: 4,
})

exports.createConfig = async function createConfig() {
    fs.writeFileSync(resolve(__dirname, "..", "Lavalink", "application.yml"), yamlFormat)
}