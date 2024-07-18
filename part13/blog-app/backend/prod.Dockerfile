FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

RUN npm ci --only=production

CMD ["node", "dist/index.js"]