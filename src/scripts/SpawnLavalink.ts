import axios from 'axios';
import fs from 'fs';
import Logger from '../struct/Logger';
import { spawn } from 'child_process';
import { resolve } from 'path';

/* Script Rewrite */



async function cronTask(url: string, dest: string, func: Function) {
    const file = fs.createWriteStream(dest);

    await axios.get(url, {responseType: 'stream'})
        .then(async(res) => {
            res.data.pipe(file)
            file.on('finish', async () => {
                Logger.info(`Successed download Lavalink.jar. Starting...`)
                file.close()
                await func()
            })

            file.on('error', (error) => {
                Logger.error(`Failed to download Lavalink due to <${error.message}>`)
            })
        })
};

async function spawnLv() {
    const child = spawn(`Java`, [`-Jar`, resolve(__dirname, '..', 'Lavalink', 'Lavalink.jar')])

    child.on('message', (message) => {
        Logger.info(`${message}`)
    })

    child.on('error', (error) => {
        Logger.error(`${error.message}`)
    })

    child.on('exit', (code) => {
        Logger.info(`Successfully exited Lavalink with code • ${code}`)
    })
};

Logger.info(`Fetching the latest Lavalink.jar, Please Wait...`)
axios.get("https://api.github.com/repos/freyacodes/Lavalink/releases/latest", {responseType: 'json'})
    .then(res => Object(res.data))
    .then(json => {
        if(json.assets[0] && json.assets[0].browser_download_url){
            Logger.info("Found: "+json.assets[0].browser_download_url)
            cronTask(json.assets[0].browser_download_url, resolve(__dirname, '..', 'Lavalink', 'Lavalink.jar'), spawnLv)
        }else{
            Logger.warn("Could not find .jar for latest release!")
            Logger.warn("Attempting to download previous release...")
            
            let priorVersion = json["tag_name"].split(".")
            priorVersion[priorVersion.length-1] = Number(priorVersion[priorVersion.length-1])-1
            priorVersion[0] = priorVersion[0].replace("v","")
            priorVersion = priorVersion.join(".")

            let priorDL_URL = `https://github.com/freyacodes/Lavalink/releases/download/${priorVersion}/Lavalink.jar`
            Logger.info("Found: " + priorDL_URL.toString())
            cronTask(priorDL_URL, resolve(__dirname, '..', 'Lavalink', 'Lavalink.jar'), spawnLv)
        }
    })
    .catch(err =>{
        Logger.error("Error occured when fetching latest release url: "+err)
    });