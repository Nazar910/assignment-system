FROM node:10 as build-deps
WORKDIR /usr/src/app
COPY ./microservices/frontend/package.json package.json
COPY ./microservices/frontend/yarn.lock yarn.lock
RUN yarn
COPY ./microservices/frontend/src src
COPY ./microservices/frontend/public public
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
