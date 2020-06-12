FROM node:14-alpine as builder
ENV LANG en_US.utf8
ARG directory=/usr/local/star-wars-api

RUN mkdir -p $directory
WORKDIR $directory

COPY package*.json ./
COPY . $directory
RUN npm install

RUN npm run build

EXPOSE 8008
CMD ["sh", "-c", "node dist/index.js"]
