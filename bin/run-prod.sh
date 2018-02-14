#!/bin/bash
export NODE_PATH=./../override:./:./src:
export NODE_ENV=production

pm2 delete app; pm2 start ./src/app.js


