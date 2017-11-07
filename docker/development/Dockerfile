FROM node:8.8

WORKDIR /app

COPY natura-ui-key /tmp/natura-ui-key
COPY ssh_config /etc/ssh/ssh_config
RUN chmod 400 /tmp/natura-ui-key

COPY . /app

CMD npm run start
