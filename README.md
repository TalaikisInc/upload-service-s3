<p align="center">
  <a href="https://talaikis.com/">
    <img alt="Talaikis Ltd." src="https://github.com/TalaikisInc/talaikis.com_react/blob/master/media/logo.png" width="228">
  </a>
</p>

# Upload Service S3

A Dockerized Node.js API for images upload to S3.

## Features

* Upload images to S3
* Internationalized responses

TODO:

* optimize before uploading
* detect adult images before uplaoding (or via frontend part)

## Install

```bash
npm i
amplify init
amplify add storage
amplify push
```

## Start

```bash
npm run start
```

## Deploy

```bash
./slave_build.sh <name>
./slave_start.sh <name> <port>
```

## Test

```bash
npm run test
```

## Licence

GPL v 3.0
