# Build
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve with custom nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
