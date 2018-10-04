# iSeries API

[![GitHub Release](https://img.shields.io/github/release/timmo001/iseries-api.svg)](https://github.com/timmo001/iseries-api/releases)
[![License](https://img.shields.io/github/license/timmo001/iseries-api.svg)](LICENSE.md)
[![pipeline status](https://gitlab.com/timmo/iseries-api/badges/master/pipeline.svg)](https://gitlab.com/timmo/iseries-api/commits/master)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/timmo001/iseries-api.svg?columns=To%20Do,On%20Hold,In%20Progress,Done)](https://waffle.io/timmo001/iseries-api)
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
- Run commands using just but passing in your server host, username and password

## Setup

TBD

## Websocket Usage

TBD

## API Usage

- GET `/` - Test the api is active

- POST `/sql` - Run a single SQL command and get the result back in JSON:

  ```json
  {
    "host": "server_hostname",
    "username": "username",
    "password": "password",
    "command": "SELECT * FROM SOMETHING"
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
