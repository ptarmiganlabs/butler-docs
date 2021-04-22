---
title: "Configuring Butler metrics & monitoring"
linkTitle: "Uptime monitor"
weight: 210
description: >
  Butler can optionally log its logfiles how long it's been running and how much memory it uses. 

  Optionally the memory usage can also be stored to an InfluxDB database, for later viewing/alerting in for example a Grafana dashboard.
---

{{% alert title="Optional" color="primary" %}}
These settings are optional.

If you don't need this feature just disable it and leave the default values in the config as they are.

Do note though that Butler expects the configuration properties below to exist in the config file, but will *ignore their values* if the related features are disabled.
{{% /alert %}}

## What's this?

In some cases - especially when investigating issues or bugs - it can be useful to get log messages telling how long Butler has been running and how much memory it uses.

This feature is called "uptime monitoring" and can be enabled in the main config file.

The logging interval is configurable, as is the log level required for uptime messages to be shown.

The memory usage data can optionally be written to InfluxDB, from where it can later be viewed in Grafana.  
If the specified InfluxDB database does not exist it will be created. The same is true for the retenion policy.

Select a reasonable retention policy and logging frequency!  
You will rarely if ever need to know how much memory Butler used a month ago... A retention policy of 1-2 weeks is usually a good start, with logging every few minutes.

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
  # Uptime monitor
  uptimeMonitor:
    enable: false                   # Should uptime messages be written to the console and log files?
    frequency: every 15 minutes     # https://bunkat.github.io/later/parsers.html
    logLevel: verbose               # Starting at what log level should uptime messages be shown?
    storeInInfluxdb:
      enable: false                 # Should Butler memory usage be logged to InfluxDB?
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
