FROM node:16-alpine AS builder

WORKDIR /app

COPY src/client/package.json src/client/yarn.lock ./

RUN yarn install

COPY ./src/client/. .

RUN yarn build

FROM nginx:1.23.3-alpine

WORKDIR /var/www/html

COPY --from=builder /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
