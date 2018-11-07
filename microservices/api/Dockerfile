FROM node:10-alpine AS base
WORKDIR /usr/src/app
COPY ./microservices/api/src src
COPY ./microservices/api/config config
COPY ./microservices/api/tsconfig.json tsconfig.json
COPY ./microservices/api/package.json ./
COPY ./microservices/api/yarn.lock ./

FROM base AS dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn
RUN yarn build

FROM base AS release
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=dependencies /usr/src/app/build ./build
CMD ["yarn", "start"]
