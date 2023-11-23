FROM node

WORKDIR /back-end
COPY package.json .
RUN npm install
COPY . .

EXPOSE 1337

CMD ["npm", "run", "start:dev"]