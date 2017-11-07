# Natura - WebFV - App CN

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![react:version](https://img.shields.io/badge/react-16.0.0-blue.svg)](https://github.com/facebook/react) [![apollo:version](https://img.shields.io/badge/apollo-2.0.0-yellow.svg)](https://github.com/apollographql/apollo-client)

> A web react application based on **Natura Consultora Mobile App** features

This project is focused on serving a **Natura Consultora Mobile App** features on a web application.

Boilerplated based on ejected [create-react-app (1.4.1)](https://github.com/facebookincubator/create-react-app).

## :rocket: Setup & Run

First, add the ***natura-ui-key*** in the root of the project (ask to the administrator)

Change the natura-ui-key permisssions

```sh
chmod 400 natura-ui-key
```

Install dependencies if you haven't yet

```sh
docker-compose run --rm --no-deps web npm install
```

Start the application

```sh
docker-compose up -d
```

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

Add the ***natura-ui-key*** (ask to the administrator) in the root of the project via Jenkins

## License

```
Copyright (c) 2017 Vizir Software Studio
```
