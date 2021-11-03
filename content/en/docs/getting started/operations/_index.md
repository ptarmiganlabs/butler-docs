---
title: 'Day 2 operations'
linkTitle: 'Day 2 operations'
weight: 40
description: >
    Options for running Butler.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Running Butler

How to start Butler varies depending on whether you are using Docker or a native Node.js approach.

{{< tabpane >}}
{{< tab header="Docker" >}}

First configure the `docker-compose.yml` file as needed, then start the Docker container in interactive mode (with output sent to the screen).  
This is useful to ensure everything works as intended when first setting up Butler SOS.

    docker-compose up

Once Butler has been verified to work as intended, hit `ctrl-c` to stop it.  
Then start Butler in deameon (background) mode:

    docker-compose up -d

From here on the Docker enviromment will make sure Butler is always running, including restarting it if it for some reason stops.

{{< /tab >}}
{{< tab header="Native Node.js" >}}

Starting Butler as a Node.js on Windows could look like this:  

    d:
    cd \node\butler\src
    node butler.js

It is of course also possible to put those commands in a command file (.bat on Windows, .sh etc on other platforms) file and execute that file instead.

{{< /tab >}}
{{< /tabpane >}}

#### Windows services & process monitors

As Butler is the kind of service that (probably) should always be running on a server, it makes sense using a Node.js process monitor to keep it alive (if running Butler as a Docker container you get this for free).

On Windows you can use the excellent [Nssm](https://nssm.cc/) tool to make Butler run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic restarts etc).

If running Butler as a Node.js app on Linux, [PM2](https://github.com/Unitech/pm2) and [Forever](https://github.com/foreverjs/forever) are two process monitors that both have been successfully tested with Butler.

One caveat with these is that it can be hard to start them (and thus Butler) when a Windows server is rebooted.
PM2 can be used to solve this challenge in a nice way, more info in [this blog post](https://ptarmiganlabs.com/blog/2017/07/12/monitoring-auto-starting-node-js-services-windows-server). On the other hand - just using Nssm is probably the easiest option for Windows.

### Monitoring Butler

Once Butler is running it's a good idea to also monitor it. Otherwise you stand the risk of not getting notified if Butler for some reason misbehaves.

Butler will log data on its memory usage to InfluxDB if

1. The config file's `Butler.uptimeMonitor.enable` and `Butler.uptimeMonitor.storeInInfluxdb.enable` properties are both set to `true`.
2. The remaining InfluxDB properties of the config file are correctly configured.

Assuming everything is correctly set up, you can then create a Grafana dashboard showing Butler's memory use over time. 
You can also set up alerts in Grafana if so desired, with notifications going to most IM tools and email.

A Grafana dashboard can look like this. Note that one of the available metrics (`external`) is not used in this particular dashboard. It's still logged to InfluxDB though.

![alt text](butler-memory-usage-grafana-1.png "Butler memory usage in Grafana dashboard")  

There is a [sample Grafana dashboard](https://github.com/ptarmiganlabs/butler/tree/master/docs/grafana) in Butler's GitHub repo.
