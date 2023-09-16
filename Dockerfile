FROM node:18

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5303

CMD ["node", "index.js"]


