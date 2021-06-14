FROM node:12.18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Bundle app source
COPY . .

RUN npm install && npm install typescript && npm install ts-node && npm install jest
RUN npm run build

ENV NODE_ENV production
ENV PORT=4000
ENV HIPSUM_HOST_API_HOST=https://hipsum.co
ENV DATABASE_USER=cmr_admin
ENV DATABASE_PASSWORD=julio12345
ENV DATABASE_NAME=tl_database
ENV DATABASE_NAME_TEST=tl_database_test

EXPOSE 4000
CMD [ "npm", "start" ]
