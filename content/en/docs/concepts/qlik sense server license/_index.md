---
title: "Qlik Sense server license"
linkTitle: "Qlik Sense server license"
weight: 60
description: >
  Monitor and alert on expiring Qlik Sense server license.  

  - Check server license status at regular, configurable intervals.
   
  - Store license status in InfluxDB, then visualize in Grafana. Or send licens status to webhooks or MQTT.

  - Alert via InfluxDB/Grafana, webhooks or MQTT when the license is about to expire.
---

## Why is this useful?

If the Qlik Sense server license expires, the Qlik Sense environment will go into a disabled state and users will not be able to access Sense.

Butler can monitor the Qlik Sense server license and alert if the license is about to expire.  
The number of days before expiration that the alert should be sent is configurable in the `Butler.qlikSenseLicense.serverLicenseMonitor.alert.thresholdDays` setting.

## How it works

Butler will periodically poll the Qlik Sense server for information about the Qlik Sense server license.

The retrieved information can be stored in/sent to zero or more of InfluxDB, webhooks and MQTT.

If the license is about to expire, Butler will send an alert to the configured alert destinations.

The alert will be sent a configurable number of days before the license expires, giving you time to renew the license.

Continusly storing info in InfluxDB and sending to other destinations, as well as sending alerts, can be individually enabled/disabled for each destination using the `sendRecurring` and `sendAlert` settings for each destination in the config file.

## Information stored in InfluxDB

Description of what data is stored in InfluxDB is available [here](/docs/reference/influxdb/#qlik-sense-server-license-info).

## Sample Grafana dashboard

Here is an example of a Grafana dashboard that shows the version of the Sense server, and also some info related to the Sense server license:

![Grafana dashboard showing Sense server version and license info](/img/butler-qlik-sense-version-license-in-grafana-1.png)
