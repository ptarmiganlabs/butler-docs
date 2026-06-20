---
title: "Configuring Butler heartbeats"
linkTitle: "Heartbeats"
weight: 200
description: >
  Heartbeats provide a way to monitor that Butler is running and working as intended.  

  Butler can send periodic heartbeat messages to a monitoring tool, which can then alert if Butler hasn't checked in as expected.
---

## What's this?

A tool like Butler should be viewed as mission critical, at least if it's features are used by mission critical Sense apps.

But how can you know whether Butler itself is working?  
Somehow Butler itself should be monitored.

Butler (and most other tools in the Butler family) has a **heartbeat** feature.  
It sends periodic messages to a monitoring tool, which can then alert if Butler hasn't checked in as expected.

[Healthchecks.io](https://healthchecks.io/) is an example of such as tool. It's open source but also a SaaS option if so preferred.

[Uptime Kuma](https://github.com/louislam/uptime-kuma) is another open source option that in addition to monitoring Butler itself can also monitor infrastructure components such as Sense servers, databases, source systems etc.

Butler can send heartbeats to these monitoring services to verify that Butler is alive and well.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Heartbeats can be used to send "I'm alive" messages to any other tool, e.g. an infrastructure monitoring tool
  heartbeat:
    enable: false
    remoteURL: http://my.monitoring.server/some/path/
    frequency: every 30 seconds         # https://bunkat.github.io/later/parsers.html
  ...
  ...
```
