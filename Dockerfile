FROM node:20.9

WORKDIR /home/app-node

RUN apt-get update -y \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

EXPOSE 4000  

CMD [ "npm", "start" ]