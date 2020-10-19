---
title: 'Running Butler as a native Node.js application'
linkTitle: 'Node.js app'
weight: 40
description: >
    How to install Butler as a Node.js application.
---

While Qlik Sense Enterprise is a Windows only system, Butler runs on any OS where Node.js is available.  
Butler has been succesfully used using standard Node.js - during development and production - on Windows, Linux (Debian and Ubuntu tested) and Mac OS.

## Running as Node.js app

Prerequisites:

| What             | Comment |
| ---------------- | ------- |
| Sense Enterprise | _Mandatory._ Butler is developed with Sense Enterprise in mind. While many Butler features might also work with Sense Desktop, you are on your own there. |
| Node.js          | _Mandatory._ |
| MQTT broker | *Optional.* MQTT is used for both in- and out-bound pub-sub messaging. Butler assumes a working MQTT broker is available, the IP of which is defined in the Butler config file. [Mosquitto](https://mosquitto.org/) is a nice open source broker. It requires very little hardware to run, even the smallest (usually free) Amazon/Google/Microsoft/... instance is enough, if you want a dedicated MQTT server. If you don't care about the pubsub features of Butler, you don't need a MQTT broker. In this case you can disable the MQTT features in Butler's config file. |
| [InfluxDB](https://www.influxdata.com/time-series-platform/) | *Optional.* A database for realtime information, used to store metrics around Butler's own memory usage over time (if this feature is enabled). |

## Installation steps

- **Install node.js**  
    Butler has been developed and tested using the 64 bit version of [Node.js](https://nodejs.org/en/download/). The most recent LTS (Long Term Support) version is usually a good choice.

- **Decide where to install Butler**  
    It is usually a good starting point to run Butler on the Sense server. If there are more than one server in the Sense cluster, Butler can be placed on the reload server (as the /createDir endpoint then can be used to create folders in which QVD and other files can be stored).

    On the other hand, you might want to keep the Sense servers as clean as possible (with respect to software running on them). If that is a priority you should install Butler on some other server. A small "utility" or "misc" server can often be useful for running various add-on services to Qlik Sense.

    The bottom line is that Butler can run on any server, as long as Node.js is available and there is network connectivity to the actual Qlik Sense server(s).

- **Download Butler**  
    Download the repository zip from the [releases page](https://github.com/ptarmiganlabs/butler/releases) file or clone the Butler repository using your git tool of choice. Both options achieve the same thing, i.e. a directory such as d:\node\butler, which is then Butler's root directory.

- **Install node dependencies**  
    From a Windows command prompt (assuming the Butler ZIP file/repository was saved to d:\\node\\butler):

      d:
      cd \node\butler\src
      npm install

    This will download and install all Node.js modules used by Butler.

- **MQTT message broker**

    Several of Butler's features use [MQTT](http://mqtt.org/) for sending and receiving messages.  
    MQTT is a standardised messaging protocol, and it should be possible to use [any broker following the MQTT standard](https://github.com/mqtt/mqtt.github.io/wiki/software?id=software).

    Butler has been developed and tested using [Mosquitto](https://mosquitto.org/) running on OSX, Debian Linux and Windows Server - all work flawlessly.
