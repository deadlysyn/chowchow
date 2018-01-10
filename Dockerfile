FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY dev-package.json /app/
RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD [ "npm", "start" ]
