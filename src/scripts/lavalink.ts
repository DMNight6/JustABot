import fs from 'fs';
import { spawn } from 'child_process';
import Logger from '../Struct/Logger'
import { resolve } from 'path';
import axios from 'axios';
import { createConfig } from './createLavalinkConfig';

var filedes = '../Lavalink/Lavalink.jar'
async function cronDownload(url: string, dest: string, cb: Function) {

    if(fs.existsSync(dest)) {
        fs.unlinkSync(dest)
    }

    const file = fs.createWriteStream(dest);

    await axios.get(url, {responseType: 'stream'})
        .then( async (res) => {
            await res.data.pipe(file)
            Logger.info("Downloading Lavalink...")
            file.on("finish", async () => {
                file.close();
                Logger.info('Successfully downloaded Lavalink')
                await cb();
            })

        })
}

async function startLv() {
    if (!fs.existsSync('../Lavalink/application.yaml')) {
        await createConfig();
    }

    spawn('java', ['-jar',resolve(__dirname, "..", 'Lavalink', 'Lavalink.jar')])
        .on('error', (err) => {
            Logger.info(err)
        })
        .on('close', (code: any) => {
            Logger.info(`Lavalink exited with code: `+code)
        })
        .on('data', (data: any) => {
            Logger.info(data)
        })
        .on('spawn', () => {
            Logger.info('Lavalink up and ready to be used')
        })
}

Logger.info("Fetching latest Lavalink.jar url...")
axios.get("https://api.github.com/repos/freyacodes/Lavalink/releases/latest")
    .then(res => res.data)
    .then(json => {
        if(json.assets[0] && json.assets[0].browser_download_url){
            Logger.info("Found: "+json.assets[0].browser_download_url)
            cronDownload(json.assets[0].browser_download_url, filedes, startLv)
        }else{
            Logger.warn("Could not find .jar for latest release!")
            Logger.warn("Attempting to download previous release...")
            
            let priorVersion = json["tag_name"].split(".")
            priorVersion[priorVersion.length-1] = Number(priorVersion[priorVersion.length-1])-1
            priorVersion[0] = priorVersion[0].replace("v","")
            priorVersion = priorVersion.join(".")

            let priorDL_URL = `https://github.com/freyacodes/Lavalink/releases/download/${priorVersion}/Lavalink.jar`
            Logger.info("Found: " + priorDL_URL.toString())
            cronDownload(priorDL_URL, filedes, startLv)
        }
    })
    .catch(err =>{
        Logger.error("Error occured when fetching latest release url: "+err)
    });