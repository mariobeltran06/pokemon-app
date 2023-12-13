# Usa una imagen de Node.js como base
FROM node:16 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/pokemon-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]