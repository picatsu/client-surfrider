FROM node:14-alpine

WORKDIR /var/www

COPY package*.json ./
COPY .babelrc ./
RUN npm install
COPY ./src ./src
EXPOSE 8000
CMD ["npm", "start"]