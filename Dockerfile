FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# RUN npm install --legacy-peer-deps

RUN npm install --force

COPY . . 

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]