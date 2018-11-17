FROM node:10-alpine AS base
WORKDIR /usr/src/app
COPY ./microservices/users/src src
COPY ./microservices/users/config config
COPY ./microservices/assignments/tsconfig.json tsconfig.json
COPY ./microservices/assignments/package.json ./
COPY ./microservices/assignments/yarn.lock ./
CMD ["yarn", "start"]
