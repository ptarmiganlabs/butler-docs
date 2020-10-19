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

How to start and keep Butler running varies depending on whether you are using Docker or a native Node.js approach.

### Running under Docker

Starting Butler is easy.  
First configure the `docker-compose.yml` file as needed, then start the Docker container in interactive mode (with output sent to the screen). This is useful to ensure everything works as intended when first setting up Butler.

    docker-compose up

Once Butler has been verified to work as intended, hit `ctrl-c` to stop it.  
Then start Butler in deameon (background) mode:

    docker-compose up -d

From here on the Docker enviromment will make sure Butler is always running, including restarting it if it for some reason stops.

### Running as native Node.js app

Starting Butler as a Node.js task is easy too:

    d:
    cd \node\butler\src
    node butler.js

It is of course also possible to put those commands in a command file (.bat on Windows, .sh etc on other platforms) file and execute that file instead.

#### Windows services & process monitors

As Butler is the kind of service that (probably) should always be running on a server, it makes sense using a Node.js process monitor to keep it alive (if running Butler as a Docker container you get this for free).

On Windows you can use the exccelent [Nssm](https://nssm.cc/) tool to make Butler run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic restarts etc).

If running Butler as a Node.js app on Linux, [PM2](https://github.com/Unitech/pm2) and [Forever](https://github.com/foreverjs/forever) are two process monitors that both have been successfully tested with Butler.

One caveat with these is that it can be hard to start them (and thus Butler) when a Windows server is rebooted.
PM2 can be used to solve this challenge in a nice way, more info in [this blog post](https://ptarmiganlabs.com/blog/2017/07/12/monitoring-auto-starting-node-js-services-windows-server). On the other hand - just using Nssm is probably the easiest option for Windows.
