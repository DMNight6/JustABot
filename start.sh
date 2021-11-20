#!/bin/bash
clear
npm install
clear

while :
do

git fetch; git pull
npm install

bash -c "exec -c npm run start"

bash stop.sh

done
