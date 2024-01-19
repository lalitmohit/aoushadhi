# aoushadhi
Backend application for pharmacy  delivery system


### Setup application

``` git clone https://github.com/krish2592/aoushadhi.git ```

### To Install package

``` npm i ```

### To run the application ###

``` npm start ```

### Setup Dockerfile

1. Create Dockerfile in source application folder
2. Paste the following command

```
FROM node:20.9

WORKDIR /home/app-node

RUN apt-get update -y \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

EXPOSE 4000  

CMD [ "npm", "start" ]
```

2. Create .dockerignore file to ignore the packeges you do not want to include in containerisation

3. To automate containerisation create docker-compose.yml file

Run the folling command in application server

```
sudo apt install docker-compose
```

4. In docker-compose.yml write the following command

```
```