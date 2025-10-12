---
title: "Docker healthcheck"
linkTitle: "Docker healthcheck"
weight: 220
description: >
  Docker has a concept of "health checks", which is a way for Docker containers to tell the Docker runtime engine that the container is alive and well.
    
  Butler can be configured to send such health check messages to Docker.
---

Note: Enabling these health check messages is only meaningful when running Butler as a Docker container.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Docker health checks are used when running Butler as a Docker container. 
  # The Docker engine will call the container's health check REST endpoint with a set interval to determine
  # whether the container is alive/well or not.
  # If you are not running Butler in Docker you can safely disable this feature. 
  dockerHealthCheck:
    enable: false    # Control whether a REST endpoint will be set up to serve Docker health check messages
    port: 12398      # Port the Docker health check service runs on (if enabled)
  ...
  ...
```
