FROM node:12-alpine3.13

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "start"]