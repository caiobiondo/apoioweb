FROM node:8

WORKDIR /app

COPY natura-ui-key /tmp/natura-ui-key
COPY ssh_config /etc/ssh/ssh_config
COPY package.json .
RUN chmod 400 /tmp/natura-ui-key

RUN npm install
COPY . /app

CMD npm run start
