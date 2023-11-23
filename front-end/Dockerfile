FROM node

WORKDIR /front-end

ENV VITE_REACT_APP_BACKEND_ENDPOINT http://localhost:1337

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]