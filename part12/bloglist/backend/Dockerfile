FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]