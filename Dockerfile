FROM node:14-alpine as builder
ENV LANG en_US.utf8

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . ./

EXPOSE 8008
CMD ["sh", "-c", "node dist/index.js"]
