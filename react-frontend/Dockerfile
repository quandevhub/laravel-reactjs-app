FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#CMD ["npm", "start"]
#CMD ["npm","run","dev"]

#docker build . -t img-react-dev
#docker run -d -p 3001:5173 --name cons-react-dev img-react-dev