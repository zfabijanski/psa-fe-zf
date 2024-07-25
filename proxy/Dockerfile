FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY node_modules /usr/src/app

COPY proxy /usr/src/app

CMD [ "yarn", "node:mock" ]