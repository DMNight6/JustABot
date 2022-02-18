#!/bin/bash
clear

while :
do
    git fetch; git pull

    bash stop.sh
    cd ./src/scripts
    bash -c "exec -a Lavalink npx ts-node Spawn.ts"&
    cd ../../
    bash -c "exec -a Main npm start"
done