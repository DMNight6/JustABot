import fs from 'fs';
import { spawn } from 'child_process';
import Logger from '../struct/Logger';
import path from 'path';
import axios from 'axios';
import { createcfg } from './CreateCfg';

async function DownloadFile(url: string, dest: string, cb: Function) {
    if (fs.existsSync(dest)) {
        fs.unlinkSync(dest)
    }

    const file = fs.createWriteStream(dest);
    await axios({
        url: url,
        method: 'GET',
        responseType: 'stream'
    })
    .then(async(res) => {
        await res.data.pipe(file)
        file.on('finish', async () => {
            file.close();
            Logger.info(`Successfully downloaded Lavalink.`);
            await cb();
        })
    })
}

async function SpawnTask() {
    if (!fs.existsSync(path.resolve(__dirname, '..', 'Lavalink', 'application.yml'))) {
        await createcfg();
    }

    spawn('java', ['-jar', path.resolve(__dirname, '..', 'Lavalink', 'Lavalink.jar')])
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

Logger.info("Fetching Latest Lavalink.jar...")
axios.get("https://api.github.com/repos/freyacodes/Lavalink/releases/latest", {responseType: 'json'})
    .then(res => res.data)
    .then(json => {
        if(json.assets[0] && json.assets[0].browser_download_url){
            Logger.info("Found: "+json.assets[0].browser_download_url)
            DownloadFile(json.assets[0].browser_download_url, path.resolve(__dirname, '..', 'Lavalink', 'Lavalink.jar'), SpawnTask)
        }else{
            Logger.warn("Could not find .jar for latest release!")
            Logger.warn("Attempting to download previous release...")
            
            let priorVersion = json["tag_name"].split(".")
            priorVersion[priorVersion.length-1] = Number(priorVersion[priorVersion.length-1])-1
            priorVersion[0] = priorVersion[0].replace("v","")
            priorVersion = priorVersion.join(".")

            let priorDL_URL = `https://github.com/freyacodes/Lavalink/releases/download/${priorVersion}/Lavalink.jar`
            Logger.info("Found: " + priorDL_URL.toString())
            DownloadFile(priorDL_URL, path.resolve(__dirname, '..', 'Lavalink', 'Lavalink.jar'), SpawnTask)
        }
    })
    .catch(err =>{
        Logger.error("Error occured when fetching latest release url: "+err)
    });