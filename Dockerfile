#
# Created by duydatpham@gmail.com on 26/03/2021
# Copyright (c) 2021 duydatpham@gmail.com
#

# build stage
FROM node:14.17-alpine as build
WORKDIR /app
ENV ver=0.7

# COPY package*.json ./
# RUN yarn install

COPY ./build ./build
# RUN yarn build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]