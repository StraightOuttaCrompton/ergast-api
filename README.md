# Ergast api

A TypeScript implementation of the [`ergast-f1-api`](https://github.com/jcnewell/ergast-f1-api) using the [Ergast Formula One MySQL database](http://ergast.com/mrd/) developed by Chris Newell.

Based on [NJS-ErgastF1API](https://github.com/Edivad99/NJS-ErgastF1API) developed by Davide Albiero.

The goal of this project is to be a fast, extensible, and tested implementation with a solid foundation for future growth.

Feel free to explore a [deployed example](https://isr4mvvhryaq7p7zh73gfkl4de0tupfy.lambda-url.eu-west-1.on.aws/). This is an unstable environment intended for testing, so please do not use for production purposes.

## Running locally

Start a the local mysql server

```sh
docker compose up
```

Once the mysql server is started, run the api using

```sh
yarn start
```

## Useful commands

### Connect to docker my sql instance

```sh
docker exec -it mysql-server mysql -u root -p
```

Then enter database password `f1`

### Remove all docker cache

To rebuild the mysql db from scratch and ensure that no cache remains, use the following (Warning the rebuild will take a while).

```sh
docker system prune --all --force
docker compose up
```
