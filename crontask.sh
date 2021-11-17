#!/bin/bash

tmux new-session -d -s BotLv
tmux send-keys -t BotLv "bash start.sh" Enter