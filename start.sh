#!/bin/bash
clear
npm install
clear

while :
do

git fetch; git pull
npm install

cd src/scripts
bash -c "exec -a JS-Lavalink ts-node spawnLavalink.ts"
cd ../../
bash -c "exec -a main ts-node ."

bash stop.sh

done
