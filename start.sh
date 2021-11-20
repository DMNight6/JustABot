#!/bin/bash
clear
npm install
clear

while :
do
    git fetch; git pull

    bash stop.sh
    cd src/scripts/
    bash -c "exec -a ts-node SpawnLavalink.ts"&
    cd ../
    bash -c "exec -a ts-node index.ts"
done
