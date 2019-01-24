FROM node:10-alpine AS base
WORKDIR /usr/src/app
COPY ./microservices/users/src src
COPY ./microservices/users/config config
COPY ./microservices/users/package.json ./
COPY ./microservices/users/yarn.lock ./
RUN yarn install
CMD ["yarn", "start"]
