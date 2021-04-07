FROM node:10-alpine as build-step
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
COPY . /frontend

EXPOSE 3000
CMD ["npm", "start"]

# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
