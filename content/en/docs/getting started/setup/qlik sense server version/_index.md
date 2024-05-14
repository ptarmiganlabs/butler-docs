---
title: "Qlik Sense server version"
linkTitle: "Server version"
weight: 110
description: >
  Butler can monitor the server version of the client-managed Qlik Sense environment that Butler is configured to connect to.

  - Check server version at regular intervals.

  - Save version to InfluxDB.
  
  - Makes it easy to keep track of versions running on different Qlik Sense environments, for example PROD, TEST and DEV. 
---

## What's this?

As with most software, client-mananged Qlik Senwse is updated regularly.

Butler can monitor the server version of the Qlik Sense environment that Butler is connected to and store this information in InfluxDB.  
Having this information in InflixDB makes it easy to visualize it in a Grafana dashboard, or similar tool.

If you are running multiple Qlik Sense environments, for example PROD, TEST and DEV, you probably have one Butler instance running for each environment.  
By storing the server version in InfluxDB, you can easily keep track of which Sense version is running on which environment.

## How it works

Butler will periodically poll the Qlik Sense server for information about the server version.
The retrieved information is logged to the log file and can also optionally be stored in InfluxDB.

It is possible to add additional tags to the data sent to InfluxDB, for example to differentiate between PROD, TEST and DEV environments, to make later visualizations easier and richer.

### How often to check the server version

The frequency of the server version check is configurable in the `Butler.qlikSenseVersion.versionMonitor.frequency` setting.  
It uses the [later.js](https://bunkat.github.io/later/) syntax, for example `every 24 hours` or `every 14 days`.

### Which InfluxDB database is used?

The data sent to InfluxDB is stored in the database specified in the `Butler.influxDb` setting.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for monitoring Qlik Sense version info
  # Version info is retrieved from the hostname:9032/v1/systeminfo endpoint in Qlik Sense
  qlikSenseVersion:
    versionMonitor:
      enable: false                   # Should Qlik Sense version info be retrieved?
      frequency: every 24 hours       # https://bunkat.github.io/later/parsers.html#text
      host: <FQDN or IP of Qlik Sense central node>         
      rejectUnauthorized: false       # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
      destination:
        influxDb:                     # Store version data in InfluxDB.
                                      # If enabled, version info will be stored as measurements in InfluxDB.
          enable: false
          tag: 
            static:                   # Static attributes/tags to attach to the data sent to InflixDB
              - name: foo
                value: bar
  ...
  ...
```
