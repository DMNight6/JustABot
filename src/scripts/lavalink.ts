import { spawn } from "child_process";
import Logger from "../Struct/Logger";
import fs from 'fs';
import { resolve } from 'path';
import nodeFetch from 'node-fetch';
import { createLavalinkConfig } from './createLavalinkConfig'
const download = async function (url: any, dest: any, cb: any) {
    if (!fs.existsSync('../Lavalink/Lavalink.jar')) {
        const file = fs.createWriteStream(dest, 'utf8');
        nodeFetch(url).then(res => {
            res.body?.pipe(file)
            file.on("finish", () => {
                Logger.info('Downloading Lavalink......')
            })
            file.on("error", err => {
                Logger.info('Filestream error while downloading: ' + err)
            })
            file.on("finish", () => {
                Logger.info('Download Complete.');
                file.close();
                cb;
            })
        })
    }
}

function startLv() {
    Logger.info("Lavalink spawned")
    if (!fs.existsSync('../Lavalink/application.yaml')) {
        createLavalinkConfig()
    }

    const Task = spawn("java", ["-jar", resolve(__dirname, '../', './', 'Lavalink/', 'Lavalink.jar')])
        .on('error', (err) => {
            Logger.info(err)
        })
        .on('close', (code) => {
            Logger.info('Lavalink exited with code: ' + code)
        })
}

Logger.info('Fetching latest build of Lavalink...')
fetch("https://api.github.com/repos/freyacodes/Lavalink/releases/latest")
    .then(res => res.json())
    .then(json => {
        if(json.assets[0] && json.assets[0].browser_download_url) {
            Logger.info('Found: ' + json.assets[0].browser_download_url)
            download(json.assets[0].browser_download_url, '../Lavalink/', startLv)
        } else {
            Logger.info("Could not find .jar for latest release!")
            Logger.info('Attempting to download previous release......')

            let preVer = json["tag_name"].split('.')
            preVer[preVer.length - 1] = Number(preVer[preVer.length - 1]) - 1
            preVer[0] = preVer[0].replace("v", "")
            preVer = preVer.join('.')

            let preVer_URL = `https://api.github.com/repos/freyacodes/Lavalink/releases/download/${preVer}/Lavalink.jar`
            Logger.info("Found: " + preVer_URL)
            download(preVer_URL, "../Lavalink/", startLv)
        }
    })
    .catch( err => {
        Logger.info("Error occured when fetching the latest release url: " + err)
    })