# base image
FROM node:20.11.1-alpine3.19 as build

# set working directory
WORKDIR /app

# exposing all our Node.js binaries
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json
COPY package.json /app/package.json

# npm install
RUN npm install

# add app
COPY . /app

# build app
RUN npm run build

FROM nginx:latest

# Remove default nginx static resources
RUN rm /etc/nginx/conf.d/default.conf

#copies React to the container directory
COPY nginx/nginx.conf /etc/nginx/conf.d

# Set working directory to nginx resources directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]