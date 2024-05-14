---
title: "Qlik Sense server version"
linkTitle: "Qlik Sense server version"
weight: 55
description: >
  Monitor Qlik Sense server version.  

  - Check server version at regular, configurable intervals.
  
  - Store version info in InfluxDB, then visualize in Grafana.
---

Butler can monitor the server version of the client-managed Qlik Sense environment that Butler is configured to connect to.  
Configuring this is described [here](/docs/getting-started/setup/qlik-sense-server-version/).

## Why is this useful?

You can always see the version of the Qlik Sense server in the main page of the Qlik Management Console (QMC).

But let's say you use Butler and/or Butler SOS to collect operational Sense server metrics (like CPU, memory, failed reload tasks etc) in InfluxDB, and visualize this info in Grafana.  
If you also store the version of the Sense server in InfluxDB, you can include that info in your Grafana dashboards, making it easy to see what the current version of the Sense server is.

Another use case is if you have multiple Sense servers (maybe PROD, TEST, DEV - or different Sense environments for different parts of the company, or...), and you want to keep track of which version each server is running.  
You then probably run one Butler instance for each Sense environment, and each Butler instance can then retrieve and store in InfluxDB the version of the Sense server it is connected to.

It's then easy to create a Grafana dashboard that shows the version of each Sense server, and you can quickly see if any server is running an outdated version.

## Information stored in InfluxDB

Description of what data is stored in InfluxDB is available [here](/docs/reference/influxdb/#qlik-sense-server-version-info).

## Sample Grafana dashboard

Here is an example of a Grafana dashboard that shows the version of the Sense server, and also some info related to the Sense server license:

![Grafana dashboard showing Sense server version and license info](/img/butler-qlik-sense-version-license-in-grafana-1.png)