FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACK_API_URL
ENV BACK_API_URL=${BACK_API_URL}

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY ./certificates /etc/letsencrypt/live/socket-test.firstcorea.com

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

