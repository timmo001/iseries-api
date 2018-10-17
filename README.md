# iSeries API

[![GitHub Release](https://img.shields.io/github/release/timmo001/iseries-api.svg)](https://github.com/timmo001/iseries-api/releases)
[![License](https://img.shields.io/github/license/timmo001/iseries-api.svg)](LICENSE.md)
[![pipeline status](https://gitlab.com/timmo/iseries-api/badges/master/pipeline.svg)](https://gitlab.com/timmo/iseries-api/commits/master)
[![Greenkeeper badge](https://badges.greenkeeper.io/timmo001/iseries-api.svg)](https://greenkeeper.io/)

[![Docker Version][version-shield]][microbadger]
[![Docker Layers][layers-shield]][microbadger]
[![Docker Pulls][pulls-shield]][dockerhub]
[![Anchore Image Overview][anchore-shield]][anchore]

![Supports armhf Architecture][armhf-shield]
![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
![Supports i386 Architecture][i386-shield]

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

REST API and Websocket for access to IBM iSeries (IBMi) and AS/400 systems

## Features

- Access to the IBMi via an expressjs REST API or Websocket
- Run commands by passing in your server host, username and password + the
 command

## Setup

### Docker Compose

- Install [Docker](https://www.docker.com/community-edition) and
 [Docker Compose](https://docs.docker.com/compose/install/)
- Create a directory for your compose file. For example, `iseries-api`
- Create a `docker-compose.yml` file:

#### SSL

> This example maps the `ssl` directory in the home directory.
> Inside this directory are two files `fullchain.pem` and `privkey.pem`
> which are files generated by [Let's Encrypt](https://letsencrypt.org/).
> Change the environment variables to your own Home Assistant details

```yaml
---
version: '3'

services:
  api:
    image: timmo001/iseries-api
    environment:
      CERTIFICATES_DIR: /ssl
    ports:
      - 28365:28365
    volumes:
      - ~/ssl:/ssl
```

#### Non-SSL

> This example shows how to set up the app without ssl. This is useful for
> testing, but is **unsecure**, so don't expose the app to the outside
> world.

```yaml
---
version: '3'

services:
  api:
    image: timmo001/iseries-api
    ports:
      - 28365:28365
```

### Docker

- Install [Docker](https://www.docker.com/community-edition)
- Run image

#### SSL

> This example maps the `ssl` directory in the home directory.
> Inside this directory are two files `fullchain.pem` and `privkey.pem`
> which are files generated by [Let's Encrypt](https://letsencrypt.org/).
> Change the environment variables to your own Home Assistant details

```bash
docker run -d \
  -e CERTIFICATES_DIR='/ssl' \
  -p 28365:28365 \
  -v ~/ssl:/ssl \
  timmo001/iseries-api
```

#### Non-SSL

> This example shows how to set up the app without ssl. This is useful for
> testing, but is **unsecure**, so don't expose the app to the outside
> world.

```bash
docker run -d \
  -p 28365:28365 \
  timmo001/iseries-api
```

### Node JS

- First clone the repository
- Checkout the version you want via releases
- Install packages

  ```bash
  yarn install
  ```

- Run

  ```bash
  yarn start
  ```

## Websocket Usage

Connect to the same port as you would for the API. Sends stringified JSON as
 the result.

### SQL

Run an SQL command and get the result back in JSON:

```json
{
  "request": "sql",
  "hostname": "server_hostname",
  "username": "username",
  "password": "password",
  "command": "SELECT * FROM SOMESCHEMA.SOMETABLE",
  "get_columns": false
}
```

> Note that `get_columns` requires a set schema.
> ie. requires `SOMESCHEMA.SOMETABLE`

## API Usage

- GET `/` - Test the api is active

- POST `/sql` - Run an SQL command and get the result back in JSON:

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "command": "SELECT * FROM SOMETHING"
  }
  ```

  Supports `SELECT` `UPDATE` `DELETE` and `INSERT` commands.

- POST `/insert` - Batch insert data into a table:

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "table": "ZZATTSTF",
    "data": [
      { "VLFD256A": "Test 09" },
      { "VLFD256A": "Test 10" },
      { "VLFD256A": "Test 11" },
      { "VLFD256A": "Test 12" }
    ]
  }
  ```

  Be sure that all items are the same in the data array.

- POST `/ifs/read` - Read a file from the IFS and return its data:

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "path": "/path/to/file.txt"
  }
  ```

- POST `/ifs/write` - Write to a file in the IFS:

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "path": "/path/to/file.txt",
    "data": "test data"
  }
  ```

- POST `/ifs/delete` - Delete a file in the IFS:

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "path": "/path/to/file.txt"
  }
  ```

- POST `/pgm` - Run a program. Set the parameters with `params` and run with `props`.

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "program": "MYPROGRAM",
    "params": [
      { "type": "DECIMAL", "precision": 10, "scale": 0, "name": "myId" },
      { "type": "NUMERIC", "precision": 8, "scale": 0, "name": "myDate" },
      { "type": "NUMERIC", "precision": 12, "scale": 2, "name": "myTotalValue" },
      { "type": "CHAR", "precision": 32, "scale": 0, "name": "myString" }
    ],
    "props": {
      "myId": 123,
      "myDate": "20170608",
      "myTotalValue": 88450.57,
      "myString": "This is a test"
    }
  }
  ```

- POST `/message` - Get AS400
 [messages](https://javadoc.midrange.com/jtopen/index.html?com/ibm/as400/access/MessageFile.html).

  ```json
  {
    "hostname": "server_hostname",
    "username": "username",
    "password": "password",
    "path": "/QSYS.LIB/YOURLIB.LIB/YOURMSGF.MSGF",
    "message_id": "AMX0051"
  }
  ```

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armhf-shield]: https://img.shields.io/badge/armhf-yes-green.svg
[i386-shield]: https://img.shields.io/badge/i386-yes-green.svg
[anchore-shield]: https://anchore.io/service/badges/image/023a2818b2274b9bb3a7dae5eeb75a6f523c44b2827a7d624a86a2c05f72106a
[anchore]: https://anchore.io/image/dockerhub/timmo001%2Fiseries-api%3Alatest
[dockerhub]: https://hub.docker.com/r/timmo001/iseries-api
[layers-shield]: https://images.microbadger.com/badges/image/timmo001/iseries-api.svg
[microbadger]: https://microbadger.com/images/timmo001/iseries-api
[pulls-shield]: https://img.shields.io/docker/pulls/timmo001/iseries-api.svg
[version-shield]: https://images.microbadger.com/badges/version/timmo001/iseries-api.svg
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/timmo
