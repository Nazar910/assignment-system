FROM node:10-alpine AS base
WORKDIR /usr/src/app
COPY ./microservices/api/config config
COPY ./microservices/api/src src
COPY ./microservices/api/tsconfig.json tsconfig.json
COPY ./microservices/api/package*.json ./

FROM base AS dependencies
RUN apk add --no-cache make gcc g++ python
RUN npm install
RUN npm run build

FROM base AS release
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=dependencies /usr/src/app/build ./build
CMD ["npm", "start"]
