FROM node

WORKDIR /socket-client

COPY package.json .

RUN npm ci

COPY . .

CMD ["npm","run", "start:dev"]