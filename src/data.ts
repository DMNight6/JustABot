import { config } from "dotenv";
import { resolve } from 'path';

config({ path: resolve(__dirname, '.env')});

const LAVALINK = {
    host: 'localhost',
    port: 7777,
    password: 'LAVALINKJS',
    retryAmount : 10,
    retryDelay: 5_000
};

const LAVALINKCFG = {
    host: '0.0.0.0',
    port: 7777,
    password: 'LAVALINKJS'
};

export const CONFIG = {
    TOKEN: String(process.env.TOKEN),
    ERELA: {
        nodes: [LAVALINK]
    },
    LAVALINKCFG
}

/*
    .env are used to increase security.
    Only this file can read .env at the moment.
*/