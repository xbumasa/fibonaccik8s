FROM node:14.15.4-alpine

WORKDIR /api

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
