FROM node:18.7.1

# Create app directory
WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5303

CMD ["node", "index.js"]


