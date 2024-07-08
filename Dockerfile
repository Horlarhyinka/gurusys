FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g nodemon

EXPOSE 8000

COPY . .

CMD [ "npm", "run", "start:dev" ]