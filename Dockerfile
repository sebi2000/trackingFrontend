FROM node:10-alpine as build-step
RUN mkdir /client
WORKDIR /client
COPY package.json /client
RUN npm install
COPY . /client
EXPOSE 3000
CMD ["npm", "start"]

# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
