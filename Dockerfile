FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN npm install bcrypt

EXPOSE 3000

CMD ["node", "server.js"]