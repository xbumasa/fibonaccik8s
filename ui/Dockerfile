FROM node:14.15.4-alpine

WORKDIR /ui

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /ui/build /usr/share/nginx/html
