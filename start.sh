#!/bin/bash
clear
npm install
clear

while :
do
    git fetch; git pull

    bash stop.sh
    cd ./src/scripts
    bash -c "exec -a Lavalink ts-node SpawnLavalink.ts"&
    cd ../../
    bash -c "exec -a main ts-node ."
done
