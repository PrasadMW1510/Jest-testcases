FROM node:6-slim

RUN apt-get update && apt-get install libpng12-0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD package*.json ./
RUN npm install

COPY . .

RUN npm run build:dll

ENV HOST="0.0.0.0"

EXPOSE 3000

CMD ["npm", "start"]
