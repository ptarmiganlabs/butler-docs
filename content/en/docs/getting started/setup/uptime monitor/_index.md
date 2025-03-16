---
title: "Configuring Butler metrics & monitoring"
linkTitle: "Uptime monitor"
weight: 210
description: >
  Butler can optionally log to the console and its logfiles how long it's been running and how much memory it uses. 

  <br><br>Optionally the memory usage can also be stored to an external database for later viewing/alerting in for example a Grafana dashboard.
  <br>InfluxDB and New Relic are currently supported targets.
---

## What's this?

In some cases - especially when investigating issues or bugs - it can be useful to get log messages telling how long Butler has been running and how much memory it uses.

This feature is called "uptime monitoring" and can be enabled in the main config file.

The logging interval is configurable, as is the log level required for uptime messages to be shown.

### InfluxDB

The memory usage data can optionally be written to InfluxDB, from where it can later be viewed in Grafana.  
If the specified InfluxDB database does not exist it will be created. The same is true for the retention policy.

Select a reasonable retention policy and logging frequency!  
You will rarely if ever need to know how much memory Butler used a month ago... A retention policy of 1-2 weeks is usually a good start, with logging every few minutes.

### New Relic

Another option for storing the memory usage data is New Relic.

This is a SaaS solution that does not require a local InfluxDB database and can thus be easier to get started with compared to InfluxDB.  
That said, InfluxDB does offer more flexibility with respect to what kinds of data can be stored.

The uptime related data sent to New Relic is:

- Timestamp
- Dimensions
  - All static attributes/dimensions defined in the Butler config file
  - Version of the Butler app, if enabled in Butler's config file.
- Metrics
  - qs_butlerHeapUsed
  - qs_butlerHeapTotal
  - qs_butlerExternalMem
  - qs_butlerProcessMem
  - qs_butlerUptimeMillisec

## Settings in config file

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
    storeNewRelic:
      enable: false
      destinationAccount:
        - First NR account
        - Second NR account
      # There are different URLs depending on whther you have an EU or US region New Relic account.
      # The available URLs are listed here: https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/choose-your-data-center/
      # As of this writing the options for the New Relic metrics API are
      # https://insights-collector.eu01.nr-data.net/metric/v1
      # https://metric-api.newrelic.com/metric/v1
      url: https://insights-collector.eu01.nr-data.net/metric/v1   # Where should uptime data be sent?
      header:                       # Custom http headers
        - name: X-My-Header
          value: Header value
      metric:
        dynamic:
          butlerMemoryUsage:
            enable: true            # Should Butler's memory/RAM usage be sent to New Relic?
          butlerUptime:
            enable: true            # Should Butler's uptime (how long since it was started) be sent to New Relic?
      attribute:
        static:                     # Static attributes/dimensions to attach to the data sent to New Relic.
          - name: metricType
            value: butler-uptime
          - name: service
            value: butler
          - name: environment
            value: prod
        dynamic:
          butlerVersion:
            enable: true            # Should the Butler version be included in the data sent to New Relic?
  ...
  ...
```
