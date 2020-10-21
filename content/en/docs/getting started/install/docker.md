---
title: "Installing Butler in a Docker container"
linkTitle: "Docker"
weight: 30
description: >
  How to install Butler as a Docker container.
---

Prerequisites for running Butler in Docker:

| What | Comment |
| ---- | ------- |
| Qlik Sense Enterprise on Windows | *Mandatory.* Butler is developed with Sense Enterprise in mind. While some Butler features might also work with Sense Desktop or Sense cloud, you are on your own there. |
| Docker | *Mandatory.* A Docker runtime environment on any supported platform. This means you can run Butler on any platform where Docker is available, including Linux, Mac OS, Windows and most cloud providers. It is very doable to run Butler under Kubernetes too, if so desired. |
| MQTT broker | *Optional.* MQTT is used for both in- and out-bound pub-sub messaging. Butler assumes a working MQTT broker is available, the IP of which is defined in the Butler config file. [Mosquitto](https://mosquitto.org/) is a nice open source broker. It requires very little hardware to run, even the smallest (usually free) Amazon/Google/Microsoft/... instance is enough, if you want a dedicated MQTT server. If you don't care about the pubsub features of Butler, you don't need a MQTT broker. In this case you can disable the MQTT features in Butler's config file. |
| [InfluxDB](https://www.influxdata.com/time-series-platform/) | *Optional.* A database for realtime information, used to store metrics around Butler's own memory usage over time (if this feature is enabled). |

## Installation steps

The following steps give some guidance on how to get Butler running on Docker.  
Here Mac OS has been used, things will look different on Linux and Windows.

```bash
proton:~ goran$ mkdir /Users/goran/butler
proton:~ goran$ cd /Users/goran/butler
proton:butler goran$ mkdir -p config/certificate
proton:butler goran$
proton:butler goran$ wget https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/docker-compose.yml
--2019-11-18 22:47:02--  https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/docker-compose.yml
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.84.133
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.84.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 618 [text/plain]
Saving to: 'docker-compose.yml'

docker-compose.yml                         100%[========================================================================================>]     618  --.-KB/s    in 0s

2019-11-18 22:47:03 (10.7 MB/s) - 'docker-compose.yml' saved [618/618]


proton:butler goran$ cat docker-compose.yml
# docker-compose.yml
version: '3.3'
services:
  butler:
    image: ptarmiganlabs/butler:3.0.0
    container_name: butler
    restart: always
    ports:
      - "8080:8080"     # REST API available on port 8180 to services outside the container
      - "9997:9997"     # UDP port for session connection events
      - "9998:9998"     # UDP port for task failure events
    volumes:
      # Make config file accessible outside of container
      - "./config:/nodeapp/config"
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
2. Copy the certificates to the ./config/certificate directory.
3. Copy the [template config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/production_template.yaml) from the GitHub repository to the ./config directory, modify it as needed based on your system(s) and which Butler features you want enabled, and rename it to for example `production.yaml`.  
You can name the config file anything, but its name has to match the NODE_ENV environment variable, as set it the `docker-compose.yml` file.
4. *Optional.* Copy the template schedule file to the location specified in Butler's config file. This is only needed if you manually want to add schedules. If using the API to create schedules, there is no need to first manually create a schedules file.

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
Pulling butler (ptarmiganlabs/butler:3.0.0)...
3.0.0: Pulling from ptarmiganlabs/butler
9a0b0ce99936: Already exists
db3b6004c61a: Already exists
f8f075920295: Already exists
6ef14aff1139: Already exists
0bbd8b48260f: Already exists
524be717efb1: Already exists
da330b3729a7: Already exists
2c9863d012f5: Already exists
06cd084e76f0: Already exists
2c5533f377d0: Pull complete
307c3aa5e73e: Pull complete
10617d6f19b9: Pull complete
ad221e369f17: Pull complete
b1f6c19b1af6: Pull complete
Digest: sha256:b3c17c93c1779d62e21db5f3f7691f524ab0c21d8b0814cab41a66e814702a17
Status: Downloaded newer image for ptarmiganlabs/butler:3.0.0
Creating butler ... done
Attaching to butler
butler    | 2019-11-18T21:51:17.630Z info: --------------------------------------
butler    | 2019-11-18T21:51:17.634Z info: Starting Butler
butler    | 2019-11-18T21:51:17.635Z info: Log level is: debug
butler    | 2019-11-18T21:51:17.636Z info: App version is: 3.0.0
butler    | 2019-11-18T21:51:17.637Z info: --------------------------------------
butler    | 2019-11-18T21:51:17.638Z debug: Client cert: /nodeapp/config/certificate/client.pem
butler    | 2019-11-18T21:51:17.639Z debug: Client cert key: /nodeapp/config/certificate/client_key.pem
butler    | 2019-11-18T21:51:17.639Z debug: CA cert: /nodeapp/config/certificate/root.pem
butler    | 2019-11-18T21:51:17.673Z debug: Registering REST endpoint /v2/activeUserCount
butler    | 2019-11-18T21:51:17.676Z debug: Registering REST endpoint /v2/activeUsers
butler    | 2019-11-18T21:51:17.679Z debug: Registering REST endpoint /v2/slackPostMessage
butler    | 2019-11-18T21:51:17.680Z debug: Registering REST endpoint /v2/createDir
butler    | 2019-11-18T21:51:17.681Z debug: Registering REST endpoint /v2/createDirQVD
butler    | 2019-11-18T21:51:17.681Z debug: Registering REST endpoint /v2/mqttPublishMessage
butler    | 2019-11-18T21:51:17.682Z debug: Registering REST endpoint /v2/senseStartTask
butler    | 2019-11-18T21:51:17.683Z debug: Registering REST endpoint /v2/senseAppDump
butler    | 2019-11-18T21:51:17.684Z debug: Registering REST endpoint /v2/senseListApps
butler    | 2019-11-18T21:51:17.684Z debug: Registering REST endpoint /v2/butlerping
butler    | 2019-11-18T21:51:17.685Z debug: Registering REST endpoint /v2/base62ToBase16
butler    | 2019-11-18T21:51:17.686Z debug: Registering REST endpoint /v2/base16ToBase62
butler    | 2019-11-18T21:51:17.687Z debug: Server for UDP server: butler
butler    | 2019-11-18T21:51:17.688Z debug: REST server host: butler
butler    | 2019-11-18T21:51:17.688Z debug: REST server port: 8080
butler    | 2019-11-18T21:51:17.696Z info: UDP server listening on 172.21.0.2:9998
butler    | 2019-11-18T21:51:17.699Z info: REST server listening on http://172.21.0.2:8080
butler    | 2019-11-18T21:51:17.700Z info: UDP server listening on 172.21.0.2:9997

```

What you see on your screen will depend on which Butler features are enabled.
In the example above *all* Butler features are enabled.

Let's make sure things are working by opening a new terminal window and from there requesting a list of all apps on the server:

```bash
proton:~ goran$
proton:~ goran$ curl "http://localhost:8180/v2/senseListApps"
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
butler           | 2018-09-26T14:40:32.740Z - debug: Server for UDP server: localhost
butler           | 2018-09-26T14:40:32.746Z - info: REST server listening on http://[::]:8080
butler           | 2018-09-26T14:40:32.748Z - info: UDP server listening on 127.0.0.1:9997
butler           | 2018-09-26T14:40:32.750Z - info: UDP server listening on 127.0.0.1:9998
butler           | 2018-09-26T14:43:05.381Z - info: Getting list of all apps

```
