---
title: "Running Butler as a native Node.js application"
linkTitle: "Native app"
weight: 30
description: >
  How to install Butler as a Node.js application.
---

## Selecting an OS

While Qlik Sense Enterprise is a Windows only system, Butler should be able to run on any OS where Node.js is available.  
Butler has been succesfully used - during development and production - on Windows, Linux (Debian and Ubuntu tested) and mac OS.

## Prerequisites

What | Comment
---- | -------
Qlik Sense Enterprise on Windows | *Mandatory.* Butler is developed with Qlik Sense Enterprise on Windows (QSEoW) in mind. <br>While some Butler features might also work with Sense Desktop or Sense cloud, you are on your own there.
Node.js | *Mandatory.* Butler is written in Node - which is thus a firm requirement.
MQTT broker | *Optional.* MQTT is used for both in- and out-bound pub-sub messaging. Butler assumes a working MQTT broker is available, the IP of which is defined in the Butler config file. Mosquitto is a nice open source broker. It requires very little hardware to run, even the smallest (usually free) Amazon/Google/Microsoft/... instance is enough, if you want a dedicated MQTT server. If you don't care about the pubsub features of Butler, you don't need a MQTT broker. In this case you can disable the MQTT features in the config YAML file.
| [InfluxDB](https://www.influxdata.com/time-series-platform/) | *Optional.* A database for realtime information, used to store metrics around Butler's own memory usage over time (if this feature is enabled). |
## Installation steps

* **Install node.js**  
    Butler has been developed and tested using the 64 bit version of [Node.js](https://nodejs.org/en/download/). The most recent LTS (Long Term Support) version is usually a good choice.

* **Decide where to install Butler**  
    It is usually a good starting point to run Butler on the Sense server. If there are more than one server in the Sense cluster, Butler can be placed on the reload server (as the /createDir endpoint then can be used to create folders in which QVD and other files can be stored).  

    On the other hand, you might want to keep the Sense servers as clean as possible (with respect to software running on them). If that is a priority you should install Butler on some other server.  

    The bottom line is that Butler can run on any server, as long as there is network connectivity to the Sense server(s).  

* **Download Butler**  
    Download the repository zip from the [releases page](https://github.com/ptarmiganlabs/butler/releases) file or clone the Butler repository using your git tool of choice. Both options achieve the same thing, i.e. a directory such as d:\node\butler, which is then Butler's root directory.  

* **Install node dependencies**  
    From a Windows command prompt (assuming the Butler ZIP file/repository was saved to d:\\node\\butler):  

        d:
        cd \node\butler\src
        npm install  

    This will download and install all Node.js modules used by Butler.  
    On some OSs you'll get some warnings during the installation - they are usually harmless. Try to run Butler even if you got some warnings, chances are good that things will work just fine. This is common on especially Windows Server and is a result of some Butler dependencies being primarily developed on Linux rather than Windows.

* **MQTT message broker**

    Several of Butler's features use [MQTT](https://mqtt.org/) for sending and receiving messages.  
    MQTT is a standardised messaging protocol, and it should be possible to use [any broker following the MQTT standard](https://github.com/mqtt/mqtt.org/wiki/software?id=software).  

    Butler has been developed and tested using [Mosquitto](https://mosquitto.org/) running on mac OS and Debian Linux - both work flawlessly.
