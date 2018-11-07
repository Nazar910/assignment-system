FROM node:10-alpine AS base
WORKDIR /usr/src/app
COPY ./microservices/assignments/src src
COPY ./microservices/assignments/config config
COPY ./microservices/assignments/tsconfig.json tsconfig.json
COPY ./microservices/assignments/package.json ./
COPY ./microservices/assignments/yarn.lock ./

FROM base AS dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn
RUN yarn build

FROM base AS release
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=dependencies /usr/src/app/build ./build
CMD ["yarn", "start"]
