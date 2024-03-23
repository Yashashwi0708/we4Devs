#!/bin/bash

cleanup() {
    echo "Exiting script..."
    pkill -P $$
    exit 0
}

trap cleanup SIGINT

python './SpamModel/app.py' &

python_pid=$!

node './Backend/main.js' &

node_pid=$!

wait -n

if [ $? -eq 0 ]; then
    echo "One of the child processes exited. Killing the other one..."
    kill $python_pid $node_pid
fi

cleanup
