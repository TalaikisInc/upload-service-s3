# Upload Service S3

A Dockerized API for images upload to S3.

Work in progress.

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
