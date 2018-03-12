# Natura - WebFV - App CN

[![CodeFactor](https://www.codefactor.io/repository/bitbucket/myvizir/webfv-appcn/badge)](https://www.codefactor.io/repository/bitbucket/myvizir/webfv-appcn) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![react:version](https://img.shields.io/badge/react-16.0.0-blue.svg)](https://github.com/facebook/react) [![apollo:version](https://img.shields.io/badge/apollo-2.0.0-yellow.svg)](https://github.com/apollographql/apollo-client)

> A web react application based on **Natura Consultora Mobile App** features

This project is focused on serving a **Natura Consultora Mobile App** features on a web application.

Boilerplated based on ejected [create-react-app (1.4.1)](https://github.com/facebookincubator/create-react-app).

## :rocket: Setup & Run (Linux)

#### Installing dnsmasq

For install dnsmasq just run

```bash
sudo apt-get install dnsmasq # For Ubuntu
brew install dnsmasq # For Mac
```

#### Configuring dnsmasq

Just create a file called /etc/dnsmasq.d/docker_dns.conf with the following
content

    address=/dev/127.0.0.1

After installing dnsmasq run the docker dns container. This will start a nginx
reverse proxy in your machine, this proxy is generic so it's not included in the
project.
Pay special attention the --restart param. It instructs the docker daemon to
restart the container after the reboot, which is ideal, since it does not
consume a lot of system resources and you can run your application and forget
about the reverse proxy.

    docker run -d -t \
      -p 80:80 \
      --restart=always \
      --volume /var/run/docker.sock:/tmp/docker.sock:ro \
      --name=nginx-domain-proxy \
      jwilder/nginx-proxy

### Setup

First, add the **_natura-ui-key_** in the root of the project (ask to the administrator)

Change the natura-ui-key permisssions

```sh
chmod 400 natura-ui-key
```

Install dependencies if you haven't yet

```sh
docker-compose run --rm --no-deps web npm install
```

### Run

Start the application

```sh
docker-compose up -d
```

Access web via http://web.naturawebfv.docker

## :rocket: Setup & Run (OSX)

### Pre-requisites:

Install and configure dinghy (https://github.com/codekitchen/dinghy)

### Setup

First, add the **_natura-ui-key_** in the root of the project (ask to the administrator)

Change the natura-ui-key permisssions

```sh
chmod 400 natura-ui-key
```

Install dependencies if you haven't yet

```sh
docker-compose run --rm --no-deps web npm install
```

### Run

Start the application

```sh
docker-compose up -d
```

Access web via http://web.naturawebfv.docker

## :heavy_check_mark: Running tests

```sh
npm test
```

## :sunglasses: Running coverage report

```sh
npm run coverage && npm run coverage:open
```

## :sparkles: Running lint

```sh
npm run lint
```

## :rotating_light: Production

Add the **_natura-ui-key_** (ask to the administrator) in the root of the project via Jenkins

## License

```
Copyright (c) 2017 Vizir Software Studio
```
