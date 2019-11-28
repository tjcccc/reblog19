FROM node:12-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY entrypoint.sh /
COPY ecosystem.config.js ./
COPY package.json ./

RUN yarn global add serve
RUN yarn global add pm2
RUN chmod +x /entrypoint.sh
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY build /usr/src/app/build

EXPOSE 3000

# CMD [ "npm", "start" ]
ENTRYPOINT ["/entrypoint.sh"]
