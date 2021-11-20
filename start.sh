#!/bin/bash
clear
npm install
clear

while :
do
    git fetch; git pull

    bash stop.sh
    cd src/scripts/
    bash -c "exec -a ts-node spawnLavalink.ts"&
    cd ../../
    bash -c "exec -a ts-node ."
done
