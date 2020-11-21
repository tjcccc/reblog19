#!/bin/bash

# server
#cd /usr/build/app/server
#pm2-runtime start ecosystem.config.js --env production

# client
cd /usr/build/app
pm2-runtime start ecosystem.config.js --env production
