FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./apps/backend/package*.json ./apps/backend/

RUN npm install

COPY . .

WORKDIR /usr/src/app/apps/backend

RUN npx prisma generate
RUN npm run build

EXPOSE 8001

CMD [ "node", "dist/src/app.js" ]

