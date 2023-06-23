FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACK_API_URL
ENV BACK_API_URL=${BACK_API_URL}

RUN npm run build

CMD ["npm", "run", "start:prod"]

