const axios = require('axios').default;
const fs = require('fs');
const {createConfig} = require('./CreateApplication')
const {resolve} = require('path');

const CronTask = async function(url, dest, func) {
    const file = fs.createWriteStream(dest);
    axios({
        url: url,
        method: 'GET',
        responseType: 'stream',
    }).then((res) => {
        res.data.pipe(file);
        console.log('Downloading Lavalink.jar...')
        file.on('finish', () => {
            console.log('Downloaded Lavalink.jar');
            createConfig()
            file.close(func);
        })
        file.on('error', (err) => {
            console.log(`File encountered an error while trying to download: ` + err);
        })
    })
    .catch(err => {
        console.log("Fetch error while downloading: "+err)
    })
}

function spawnLv() {
    const spawn = require('child_process').spawn;
    const child = spawn("java", ["-jar", resolve(__dirname, "..", "Lavalink", "Lavalink.jar")]);

    child.stderr.setEncoding('utf-8');
    child.stdout.setEncoding('utf-8');

    child.stdout.on("data", (data) => {
        console.log(`Lavalink: `+data)
    })

    child.stderr.on('error', (err) => {
        console.log(`Lavalink Error: ` + err)
    })

    child.on('close', (code) => {
        console.log(`Lavalink exited with code ${code}`)
    })
}

console.log("Fetching the latest lavalink jar")
axios.get("https://api.github.com/repos/freyacodes/Lavalink/releases/latest")
    .then(res => res.data)
    .then(json => {
        if(json.assets[0] && json.assets[0].browser_download_url){
            console.log("Found: "+json.assets[0].browser_download_url)
            CronTask(json.assets[0].browser_download_url, resolve(__dirname, "..", "Lavalink", "Lavalink.jar"), spawnLv)
        }else{
            console.log("Could not find .jar for latest release!")
            console.log("Attempting to download previous release...")
            
            let priorVersion = json["tag_name"].split(".")
            priorVersion[priorVersion.length-1] = Number(priorVersion[priorVersion.length-1])-1
            priorVersion[0] = priorVersion[0].replace("v","")
            priorVersion = priorVersion.join(".")

            let priorDL_URL = `https://github.com/freyacodes/Lavalink/releases/download/${priorVersion}/Lavalink.jar`
            console.log("Found: "+priorDL_URL)
            CronTask(json.assets[0].browser_download_url, resolve(__dirname, "..", "Lavalink", "Lavalink.jar"), spawnLv)
        }

    })
    .catch(err =>{
        console.log("Error occured when fetching latest release url: "+err)
    });