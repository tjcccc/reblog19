#!/bin/bash

cd /usr/build/app
pm2-runtime start ecosystem.config.js --env production
