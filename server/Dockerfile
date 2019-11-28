FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY entrypoint.sh /
COPY db-config.js ./
COPY package.json ./

RUN yarn
RUN npm install -g pm2
RUN chmod +x /entrypoint.sh
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

# CMD [ "npm", "start" ]
ENTRYPOINT ["/entrypoint.sh"]
