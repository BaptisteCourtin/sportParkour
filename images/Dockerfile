FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
RUN npm i 

COPY src src
COPY tsconfig.json tsconfig.json

CMD npm run start