---
title: "Running Butler as a native, pre-built application"
linkTitle: "Native app"
weight: 15
description: >
  How to install the pre-built, stand alone Butler applications.
---

## Downloading the app

Download Butler for your preferred operating systym.

Latest version is available on [GitHub](https://github.com/ptarmiganlabs/butler/releases/latest).

## Prerequisites

What | Comment
---- | -------
Qlik Sense Enterprise on Windows | *Mandatory.* Butler is developed with client-managed Qlik Sense Enterprise on Windows (QSEoW) in mind. <br>While some Butler features might also work with Sense Desktop or Sense cloud, you are on your own there.
MQTT broker | *Optional.* MQTT is used for both in- and out-bound pub-sub messaging. Butler assumes a working MQTT broker is available, the IP of which is defined in the Butler config file. [Mosquitto](https://mosquitto.org/) is a great open source broker. It requires very little hardware to run, even the smallest (usually free) Amazon/Google/Microsoft/... instance is enough, if you want a dedicated MQTT server. If you don't care about the pubsub features of Butler, you don't need a MQTT broker. In this case you can disable the MQTT features in the config YAML file.
| [InfluxDB](https://www.influxdata.com/time-series-platform/) | *Optional.* A database for realtime information, used to store metrics around Butler's own memory usage over time (if this feature is enabled). |

## Installation steps

There is no installation needed for the stand-alone Butler executables.  

The steps below outline the steps needed to install Butler as a native Node.js application on for example Windows Server.

Additional information is found on the [Day 2 operations](/docs/getting-started/operations/) page.

* **Decide where to install Butler**  
    It is usually a good starting point to run Butler on the Sense server. If there are more than one server in the Sense cluster, Butler can be placed on the reload server (as the /createDir endpoint then can be used to create folders in which QVD and other files can be stored).  

    On the other hand, you might want to keep the Sense servers as clean as possible (with respect to software running on them). If that is a priority you should install Butler on some other server.  

    The bottom line is that Butler can run on any server, as long as there is network connectivity to the Sense server(s).  

    It's usually a good idea to keep 3rd party tools installed in the same directory tree, to maintenance as easy as possible.  
    A good place for Butler could be `c:\tools\butler` on Windows, for example.

* **Download Butler**  
    Download the latest version from the [releases page](https://github.com/ptarmiganlabs/butler/releases/latest).  
    Make sure to get the binary file for your preferred operating system.

    Unzip the downloaded file, then copy or move the butler binary to the desired directory (e.g. `c:\tools\butler`) and that's it.

{{< notice tip >}}
On Windows you should "unblock" the ZIP file before extracting the Butler binary from it.  
This is basically a way to tell Windows that the ZIP is safe even though it was downloaded from Internet.

Right click on the ZIP file, then select `Properties`.  
If there is an "Unblock" check box in the lower right part of the properties window you should click that box and hit OK.  
Then unpack the ZIP file.
{{< /notice >}}


* **MQTT message broker**

    Several of Butler's features use [MQTT](https://mqtt.org/) for sending and receiving messages.  
    MQTT is a standardised messaging protocol and it should be possible to use [any broker following the MQTT standard](https://github.com/mqtt/mqtt.org/wiki/software?id=software).  

    Butler has been developed and tested using [Mosquitto](https://mosquitto.org/) running on mac OS, Debian Linux and Docker - all work flawlessly.
