---
title: "Running Butler in Docker"
linkTitle: "Running in Docker"
weight: 2
description: >
  How to install Butler as a Docker container.
---

## Running in Docker

If you have access to or can set up a Docker runtime environment, this is by far the preferred way of running Butler.  
Installation is less error prone compared to installing Butler natively, you get all the benefits from the Docker ecosystem (monitoring of running containers etc), and upgrades to future Butler versions become trivial.

Prerequisites:

What | Comment
---- | -------
Sense Enterprise | *Mandatory.* Butler is developed with Sense Enterprise in mind. While many Butler features might also work with Sense Desktop, you are on your own there.
Docker | *Mandatory.* A Docker runtime environment on any supported platform. This means you can run Butler on any platform where Docker is available, including Linux, Mac OS, Windows and most cloud providers. It is very doable to run Butler under Kubernetes too, if so desired.
MQTT broker | *Optional.* MQTT is used for both in- and out-bound pub-sub messaging. Butler assumes a working MQTT broker is available, the IP of which is defined in the Butler config file. Mosquitto is a nice open source broker. It requires very little hardware to run, even the smallest (usually free) Amazon/Google/Microsoft/... instance is enough, if you want a dedicated MQTT server. If you don't care about the pubsub features of Butler, you don't need a MQTT broker. In this case you can disable the MQTT features in the config YAML file.

## Installation steps

The following steps give some guidance on how to get Butler running on Docker.  
Here Mac OS has been used, things will of course look slightly different on Linux and Windows.

```bash
proton:~ goran$ mkdir /Users/goran/butler
proton:~ goran$ cd /Users/goran/butler
proton:butler goran$ mkdir -p config/certificate
proton:butler goran$
proton:butler goran$ wget https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/docker-compose.yml
--2018-09-26 16:27:14--  https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/docker-compose.yml
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.84.133
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.84.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 565 [text/plain]
Saving to: 'docker-compose.yml.1'

docker-compose.yml.1                                       100%[========================================================================================================================================>]     565  --.-KB/s    in 0s

2018-09-26 16:27:15 (6.34 MB/s) - 'docker-compose.yml.1' saved [565/565]

proton:butler goran$ cat docker-compose.yml
# docker-compose.yml
version: '2.2'
services:
  verisure-mqtt:
    image: ptarmiganlabs/butler:latest
    container_name: butler
    restart: always
    ports:
      - "8180:8080"     # REST API available on port 8180 to services outside the container
      - "9997:9997"     # UDP port for session connection events
      - "9998:9998"     # UDP port for task failure events
    volumes:
      # Make config file accessible outside of container
      - "./config:/nodeapp/config"
    environment:
      - "NODE_ENV=production"
    logging:
      driver: json-file
proton:butler goran$

```

At this point you should

1. Export certificates from the Qlik Sense QMC. Export a full set of certificates in PEM format, no psasword on the certificates.
2. Copy the certificates to the ./config/certificate directory.
3. copy the [template config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/default_template.yaml) from the GitHub repository to the ./config directory, modify it as needed based on your system(s), and rename it to for example `production.yaml`.  

You can name the config file anything, but its name has to match the NODE_ENV environment variable, as set it the `docker-compose.yml` file.

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
Creating butler ... done
Attaching to butler
butler           | 2018-09-26T14:38:57.895Z - debug: Server for UDP server: localhost
butler           | 2018-09-26T14:38:57.912Z - info: REST server listening on http://[::]:8080
butler           | 2018-09-26T14:38:57.918Z - info: UDP server listening on 127.0.0.1:9997
butler           | 2018-09-26T14:38:57.930Z - info: UDP server listening on 127.0.0.1:9998
butler           | 2018-09-26T14:38:58.124Z - info: Connected to MQTT server 192.168.1.51:1884, with client ID mqttjs_215c09dc

```

If you haven't configured MQTT in the config file, you won't see the "...Connected to MQTT server" line.

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
