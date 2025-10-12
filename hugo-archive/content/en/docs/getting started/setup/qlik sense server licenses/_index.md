---
title: "Qlik Sense server license"
linkTitle: "Server license"
weight: 114
description: >
  Butler can monitor the Qlik Sense server license that is used to run client-managed Qlik Sense (=Qlik Sense Enterprise on Windows).  

  - Check license expiration date and alert a configurable number of days before expiration.

  - Send license status and expiration alerts to InfluxDB, webhooks and MQTT.
---

## What's this?

If the Qlik Sense server license expires, the Qlik Sense environment will go into a disabled state and users will not be able to access Sense.

Butler can monitor the Qlik Sense server license and alert if the license is about to expire.

## How it works

Butler will periodically poll the Qlik Sense server for information about the Qlik Sense server license.  
The retrieved information can be stored in/sent to zero or more of InfluxDB, webhooks and MQTT.

If the license is about to expire, Butler will send an alert to the configured alert destinations.  
The alert will be sent a configurable number of days before the license expires, giving you time to renew the license.  
The alert can also be stored in InfluxDB and/or sent to webhooks and MQTT.

### How often to check the license

The frequency of the license check is configurable in the `Butler.qlikSenseLicense.serverLicenseMonitor.frequency` setting.  
It uses the [later.js](https://bunkat.github.io/later/) syntax, for example `every 24 hours` or `every 14 days`.

### What's sendRecurring?

For each destination, you can configure if Butler should send the license status to the destination every time the license is checked.

This is useful if you want to keep track of the license status over time, for example in a Grafana dashboard.

### What's sendAlert?

For each destination, you can configure if Butler should send an alert if the license is about to expire, i.e. if the number of days left on the license is below the threshold specified in the `Butler.qlikSenseLicense.serverLicenseMonitor.alert.thresholdDays` setting.

This is useful if you want to be alerted (repeatedly) if the license is about to expire and possibly also store the alerts in InfluxDB.

### Which InfluxDB database is used?

The data sent to InfluxDB is stored in the database specified in the `Butler.influxDb` setting.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for monitoring Qlik Sense licenses
  qlikSenseLicense:
    serverLicenseMonitor:
      enable: false
      frequency: every 24 hours       # https://bunkat.github.io/later/parsers.html#text
      alert:                          # Alert if the number of days left on the license is below the threshold
                                      # License expiry alerts on a global level are enabled here, then configured on
                                      # a per-destination basis elsewhere in this config file.
        thresholdDays: 60
      destination:
        influxDb:                     # Store license data in InfluxDB
          enable: false
          tag:
            static:                   # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar
        mqtt:
          enable: false
          sendRecurring:              # Send license data to the MQTT broker at the frequency specified above
            enable: true
          sendAlert:                  # Send an MQTT alert if the number of days left on the license is below the threshold
            enable: true
        webhook:
          enable: false
          sendRecurring:              # Send license data to webhook(s) at the frequency specified above
            enable: true
          sendAlert:                  # Send alert to webhook(s) if the number of days left on the license is below
                                      # the threshold or the license has already expired
            enable: true
  ...
  ...
```
