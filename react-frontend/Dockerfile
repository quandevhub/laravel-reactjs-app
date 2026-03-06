FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

#CMD ["npm", "start"]
CMD ["npm","run","dev"]

#docker build . -t img-react-dev
#docker run -d -p 3001:5173 --name cons-react-dev img-react-dev