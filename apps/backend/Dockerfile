FROM node:16-alpine as base

FROM base as deps

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./apps/backend/package*.json ./apps/backend/
COPY ./packages/schemas/package*.json ./packages/schemas/
COPY ./packages/types/package*.json ./packages/types/

# required for postinstall
COPY ./lerna.json ./lerna.json 

RUN npm install

FROM base as builder 

WORKDIR /usr/src/app

COPY --from=deps ./usr/src/app/node_modules/ ./node_modules/
COPY --from=deps ./usr/src/app/apps/backend/node_modules/ ./node_modules/
COPY --from=deps ./usr/src/app/packages/schemas/node_modules/ ./node_modules/
COPY --from=deps ./usr/src/app/packages/types/node_modules/ ./node_modules/

COPY ./apps/backend/ ./apps/backend/
COPY ./packages/ ./packages/
COPY ./package.json ./package.json
COPY ./lerna.json ./lerna.json

RUN cd ./apps/backend && npx prisma generate
RUN npx lerna run build --scope="{types,schemas,backend}"

FROM base as runner 

WORKDIR /usr/src/app

COPY --from=builder ./usr/src/app/node_modules/ ./node_modules/
COPY --from=builder ./usr/src/app/apps/backend/dist/ ./
COPY --from=builder ./usr/src/app/packages/ ./packages/
COPY --from=builder ./usr/src/app/package.json ./package.json

EXPOSE 8001

ENV NODE_ENV=production

CMD [ "node", "./src/app.js" ]