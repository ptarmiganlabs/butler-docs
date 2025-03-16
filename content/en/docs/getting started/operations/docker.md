---
title: "Docker"
linkTitle: "Docker"
weight: 20
description: >
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Running Butler in Docker

First configure the `docker-compose.yml` file as needed, then start the Docker container in interactive mode (with output sent to the screen).  
This is useful to ensure everything works as intended when first setting up Butler SOS.

    docker-compose up

Once Butler has been verified to work as intended, hit `ctrl-c` to stop it.  
Then start Butler in daemon (background) mode:

    docker-compose up -d

From here on the Docker environment will make sure Butler is always running, including restarting it if it for some reason stops.

{{< notice tip >}}
There is a [sample docker-compose.yaml file](https://github.com/ptarmiganlabs/butler/blob/master/docs/docker-compose/docker-compose.yaml) available in the [Butler repository](https://github.com/ptarmiganlabs/butler) over at GitHub.
{{< /notice >}}
