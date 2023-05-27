FROM node:alpine

RUN addgroup app && adduser -S -G app app

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD echo Load data;npm run generate;echo Start server;npm start