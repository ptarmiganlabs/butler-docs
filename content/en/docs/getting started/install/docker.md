---
title: "Running Butler in Docker"
linkTitle: "Docker"
weight: 20
description: >
  How to install Butler as a Docker container.
---

## Installation steps

The following steps give some guidance on how to get Butler running on Docker.  
Here Mac OS was used, things will look different on Linux and Windows.

Note: While the console logs below refer to an older version of Butler's Docker image, the steps involved are the same also for current/most recent version of Butler.

```bash
proton:~ goran$ mkdir /Users/goran/butler
proton:~ goran$ cd /Users/goran/butler
proton:butler goran$ mkdir -p config/certificate
proton:butler goran$
proton:butler goran$ wget https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/docker-compose.yaml
--2021-10-25 17:07:23--  https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/docker-compose.yaml
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 660 [text/plain]
Saving to: ‘docker-compose.yaml’

docker-compose.yaml 100%[=====================================================================================================================================>]     660  --.-KB/s    in 0s

2021-10-25 17:07:23 (42.0 MB/s) - ‘docker-compose.yaml’ saved [660/660]


proton:butler goran$ cat docker-compose.yaml
# docker-compose.yml
version: '3.3'
services:
  butler:
    image: ptarmiganlabs/butler:6.1.0
    container_name: butler
    restart: always
    ports:
      - "8080:8080"       # REST API available on port 8180 to services outside the container
      - "9998:9998/udp"   # UDP port for task failure events
    volumes:
      # Make config file accessible outside of container
      - "./config:/nodeapp/config"
      - "./log:/nodeapp/log"
    environment:
      - "NODE_ENV=production"
    logging:
      driver: json-file
      options:
        max-file: "5"
        max-size: "5m"
proton:butler goran$

```

At this point you should

1. Export certificates from the Qlik Sense QMC. Export a full set of certificates in PEM format, no psasword on the certificates.
2. Copy the certificates to the `./config/certificate` directory.
3. Copy the [template config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/production_template.yaml) from the GitHub repository to the ./config directory, modify it as needed based on your system(s) and which Butler features you want enabled, and rename it to for example `production.yaml`.  
You can name the config file anything, but its name has to match the NODE_ENV environment variable, as set it the `docker-compose.yaml` file.
4. *Optional.* Copy the [template schedule file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/schedule_template.yaml) to the location specified in Butler's config file. This is only needed if you manually want to add schedules. If using the API to create schedules, there is no need to first manually create a schedules file (the schedule file will be created by Butler in this case).

When done, you should see something like this:

```bash
proton:butler goran$ pwd
/Users/goran/butler
proton:butler goran$ ls -la
total 8
drwxr-xr-x   4 goran  staff   128 Sep 26 16:36 .
drwxr-xr-x+ 59 goran  staff  1888 Sep 26 16:24 ..
drwxr-xr-x   4 goran  staff   128 Sep 26 16:36 config
-rw-r--r--   1 goran  staff   565 Sep 26 16:25 docker-compose.yml
proton:butler goran$
proton:butler goran$ ls -la config/
total 8
drwxr-xr-x  4 goran  staff   128 Sep 26 16:36 .
drwxr-xr-x  4 goran  staff   128 Sep 26 16:36 ..
drwxr-xr-x  6 goran  staff   192 Sep 26 16:36 certificate
-rw-r--r--  1 goran  staff  1861 Sep 26 16:36 production.yaml
proton:butler goran$
proton:butler goran$ ls -la config/certificate/
total 32
drwxr-xr-x  6 goran  staff   192 Sep 26 16:36 .
drwxr-xr-x  4 goran  staff   128 Sep 26 16:36 ..
-rw-r--r--@ 1 goran  staff  1166 Sep 26 16:36 client.pem
-rw-r--r--@ 1 goran  staff  1702 Sep 26 16:36 client_key.pem
-rw-r--r--@ 1 goran  staff  1192 Sep 26 16:36 root.pem
proton:butler goran$
```

At this point everything is ready and you can start the Butler container using docker-compose:

```bash
proton:butler goran$ docker-compose up
Creating network "butler_default" with the default driver
Pulling butler (ptarmiganlabs/butler:6.1.0)...
6.1.0: Pulling from ptarmiganlabs/butler
7d63c13d9b9b: Already exists
bb262aff53d8: Already exists
24467fa1084c: Already exists
d318401bbcfd: Already exists
fef5c41ac380: Already exists
da4caec0e1fa: Pull complete
d69466c67eaa: Pull complete
ad6e84e85ade: Pull complete
56b17f947d30: Pull complete
9aa9ea345c5a: Pull complete
Digest: sha256:046989e7d440b1fde2db6abfb2cc5eab740b82559ef392c32287ba188bae6235
Status: Downloaded newer image for ptarmiganlabs/butler:6.1.0
Creating butler ... done
Attaching to butler
butler    | 2021-10-25T16:35:31.739Z info: Adding normalized fileCopy directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir1",
butler    |   "toDir": "/Users/goran/butler-test-dir2"
butler    | }
butler    | 2021-10-25T16:35:31.739Z info: Adding normalized fileCopy directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir2",
butler    |   "toDir": "/Users/goran/butler-test-dir1"
butler    | }
butler    | 2021-10-25T16:35:31.740Z info: Adding normalized fileCopy directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir1/abc",
butler    |   "toDir": "/Users/goran/butler-test-dir1"
butler    | }
butler    | 2021-10-25T16:35:31.741Z info: Adding normalized fileCopy directories {
butler    |   "fromDir": "/from/some/directory2",
butler    |   "toDir": "/to/some/directory2"
butler    | }
butler    | 2021-10-25T16:35:31.742Z info: Adding normalized fileMove directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir1",
butler    |   "toDir": "/Users/goran/butler-test-dir2"
butler    | }
butler    | 2021-10-25T16:35:31.743Z info: Adding normalized fileMove directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir2",
butler    |   "toDir": "/Users/goran/butler-test-dir1"
butler    | }
butler    | 2021-10-25T16:35:31.744Z info: Adding normalized fileMove directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir1/abc",
butler    |   "toDir": "/Users/goran/butler-test-dir1"
butler    | }
butler    | 2021-10-25T16:35:31.745Z info: Adding normalized fileMove directories {
butler    |   "fromDir": "/Users/goran/butler-test-dir2/abc-dest",
butler    |   "toDir": "/Users/goran/butler-test-dir1"
butler    | }
butler    | 2021-10-25T16:35:31.745Z info: Adding normalized fileDelete directory /Users/goran/butler-test-dir1
butler    | 2021-10-25T16:35:31.746Z info: Adding normalized fileDelete directory /Users/goran/butler-test-dir1
butler    | 2021-10-25T16:35:31.747Z info: Adding normalized fileDelete directory /Users/goran/butler-test-dir2/abc-dest
butler    | 2021-10-25T16:35:31.747Z info: Enabled API endpoints: [
butler    |   "activeUserCount",
butler    |   "activeUsers",
butler    |   "apiListEnbledEndpoints",
butler    |   "base62ToBase16",
butler    |   "base16ToBase62",
butler    |   "butlerping",
butler    |   "createDir",
butler    |   "createDirQVD",
butler    |   "fileDelete",
butler    |   "fileMove",
butler    |   "fileCopy",
butler    |   "keyValueStore",
butler    |   "mqttPublishMessage",
butler    |   "createNewSchedule",
butler    |   "getSchedule",
butler    |   "getScheduleStatusAll",
butler    |   "updateSchedule",
butler    |   "deleteSchedule",
butler    |   "startSchedule",
butler    |   "stopSchedule",
butler    |   "senseAppReload",
butler    |   "senseAppDump",
butler    |   "senseListApps",
butler    |   "senseStartTask",
butler    |   "slackPostMessage",
butler    |   "getBookmarkList",
butler    |   "applyBookmark",
butler    |   "getSessions",
butler    |   "deleteSession"
butler    | ]
butler    | 2021-10-25T19:06:41.265Z info: CONFIG: Influxdb enabled: false
butler    | 2021-10-25T19:06:41.265Z info: CONFIG: Influxdb host IP: 192.168.100.20
butler    | 2021-10-25T19:06:41.265Z info: CONFIG: Influxdb host port: 8086
butler    | 2021-10-25T19:06:41.265Z info: CONFIG: Influxdb db name: butler
butler    | 2021-10-25T19:06:41.567Z info: --------------------------------------
butler    | 2021-10-25T19:06:41.567Z info: Starting Butler
butler    | 2021-10-25T19:06:41.568Z info: Log level      : verbose
butler    | 2021-10-25T19:06:41.568Z info: App version    : 6.1.0
butler    | 2021-10-25T19:06:41.568Z info: Instance ID    : b6292735c80987393c5cf1a5c685e8548b46e6385b940789e2599936e20d5080
butler    | 2021-10-25T19:06:41.568Z info:
butler    | 2021-10-25T19:06:41.569Z info: Node version   : v16.11.1
butler    | 2021-10-25T19:06:41.569Z info: Architecture   : x64
butler    | 2021-10-25T19:06:41.569Z info: Platform       : linux
butler    | 2021-10-25T19:06:41.569Z info: Release        : 11
butler    | 2021-10-25T19:06:41.570Z info: Distro         : Debian GNU/Linux
butler    | 2021-10-25T19:06:41.570Z info: Codename       : bullseye
butler    | 2021-10-25T19:06:41.570Z info: Virtual        : false
butler    | 2021-10-25T19:06:41.570Z info: Processors     : 4
butler    | 2021-10-25T19:06:41.570Z info: Physical cores : 4
butler    | 2021-10-25T19:06:41.571Z info: Cores          : 4
butler    | 2021-10-25T19:06:41.571Z info: Docker arch.   : undefined
butler    | 2021-10-25T19:06:41.571Z info: Total memory   : 6233116672
butler    | 2021-10-25T19:06:41.571Z info: --------------------------------------
butler    | 2021-10-25T19:06:41.571Z info: Client cert: /nodeapp/config/certificate/client.pem
butler    | 2021-10-25T19:06:41.571Z info: Client cert key: /nodeapp/config/certificate/client_key.pem
butler    | 2021-10-25T19:06:41.572Z info: CA cert: /nodeapp/config/certificate/root.pem
butler    | 2021-10-25T19:06:41.584Z info: MAIN: Didn't load schedules from file
butler    | 2021-10-25T19:06:41.627Z info: MAIN: REST server listening on http://0.0.0.0:8080
butler    | 2021-10-25T19:06:41.633Z info: MAIN: Started Docker healthcheck server on port 12398.
butler    | 2021-10-25T19:06:46.029Z info: /v4/senselistapps called from 192.168.176.1

```

What you see on your screen will depend on which Butler version you are using and what features are enabled.

Let's make sure things are working by opening a new terminal window and from there requesting a list of all apps on the server:

```bash
proton:~ goran$
proton:~ goran$ curl "http://localhost:8080/v4/senselistapps"
[{"id":"492a1bca-1c41-4a01-9104-543a2334c465","name":"2018 sales targets"},
{"id":"5b243cb2-8d00-44c9-b865-08b00a0af18b","name":"App 1"},
...
...
{"id":"181d101f-986c-49c5-a457-d351058c05b4","name":"Template app 1 DEV"}]
proton:~ goran$

```

Nice, looking good.

In the terminal where you ran docker-compose, you will see a new line saying that a app list was retrieved:

```bash
butler    | 2021-10-25T19:20:50.356Z info: /v4/senselistapps called from 192.168.176.1

```
