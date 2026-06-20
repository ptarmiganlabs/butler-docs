---
title: "Storing Windows service alerts in InfluxDB"
linkTitle: "InfluxDB"
weight: 30
description: >
  This page contains information on how to configure Butler to store alert information in InfluxDB when Windows services stop or start.
---

## What's this?

These config settings are specific to the InfluxDB alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

There is no specific InfluxDB configuration for Windows Service monitoring, so the general InfluxDB in `Butler.influxDb` settings are used.  
This means that information about Windows service alerts are stored in the same InfluxDB database as other data points sent to InfluxDB from Butler (e.g. uptime metrics).

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # InfluxDB settings
  influxDb:
    enable: false                  # Master switch for InfluxDB integration. If false, no data will be sent to InfluxDB.
    hostIP: <IP or host name>     # Where is InfluxDB server located?
    hostPort: 8086                # InfluxDB port
    auth:
      enable: false               # Does InfluxDB require login?
      username: user_joe
      password: joesecret
    dbName: butler                # Name of database in InfluxDB to which Butler's data is written
    instanceTag: DEV              # Tag that can be used to differentiate data from multiple Butler instances
    # Default retention policy that should be created in InfluxDB when Butler creates a new database there.
    # Any data older than retention policy threshold will be purged from InfluxDB.
    retentionPolicy:
      name: 10d
      duration: 10d
  ...
  ...
```
