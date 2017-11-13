FROM node:8.9

WORKDIR /app

COPY natura-ui-key /tmp/natura-ui-key
COPY ssh_config /etc/ssh/ssh_config
RUN chmod 400 /tmp/natura-ui-key

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . /app

RUN npm run build
RUN npm run transpile

CMD ["npm", "run", "start:prod"]
