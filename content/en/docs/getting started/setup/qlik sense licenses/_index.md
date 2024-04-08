---
title: "Qlik Sense licenses"
linkTitle: "Qlik Sense licenses"
weight: 110
description: >
  Butler can monitor and manage Qlik Sense user licenses.  

  - High level metrics per user license type (professional, analyzer etc) are gathered and stored in your database of choice (at the time of writing, InfluxDB is supported).
  
  - User licenses can be released automatically after a certain period of inactivity, allowing them to be used by other users.
---

## What's this?

It's important to keep track of how Qlik Sense end user licenses are used.  
If your Sense environment runs out of licenses, users without a license - but entitled to one - will not be able to access Sense.

By monitoring license usage you can make sure that you have enough licenses available, and get an early warning if you're about to run out.  
New licenses can then be ordered and installed before the current ones run out.

Additionally, some Sense users might only use Sense sporadically.

For example, a user might only use Sense during certain times of the year.  
In such cases it's a waste of resources to keep the license assigned to the user when it's not being used.

Butler can be configured to periodically release Professional and Analyzer user licenses that have been inactive for a certain period of time.

## How it works

Butler periodically polls the Qlik Sense Repository Service (QRS) for information about user licenses and store this information in the database specified in the Butler config file.

Similarly, Butler will periodically release Professional and/or Analyzer user licenses that have been inactive for a certain (configurable) period of time.

### Monitoring Qlik Sense license usage

Looking at the config file settings below, Butler will:

1. Every 6 hours, poll Qlik Sense for information about user licenses.
2. Store this information in InfluxDB and add a tag `foo` with the value `bar` to the data sent to InfluxDB.

Adapt as needed to your environment.

### Releasing inactive user licenses

The settings below will:

1. Every 2 days, release Professional and Analyzer user licenses that have been inactive for 30 days or more.
2. Never release licenses for the users `INTERNAL\sa_repository`, `INTERNAL\sa_api` and `USERDIR\qs_admin_account`.
3. Store information about released licenses in InfluxDB and add a tag `foo` with the value `bar` to the data sent to InfluxDB.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for monitoring Qlik Sense licenses
  qlikSenseLicense:
    licenseMonitor:
      enable: true
      frequency: every 6 hours        # https://bunkat.github.io/later/parsers.html#text
      destination:
        influxDb:                     # Store license data in InfluxDB
          enable: true
          tag: 
            static:                   # Static attributes/tags to attach to the data sent to InflixDB
              - name: foo
                value: bar
    licenseRelease:
      enable: true
      frequency: every 2 days        # https://bunkat.github.io/later/parsers.html#text
      neverReleaseUsers:              # Users that should never have their license released
        - userDir: 'INTERNAL'
          userId: 'sa_repository'
        - userDir: 'INTERNAL'
          userId: 'sa_api'
        - userDir: 'USERDIR'
          userId: 'qs_admin_account'
      licenseType:                    # License types to monitor and release
        analyzer:                     
          enable: true                # Monitor and release Analyzer licenses
          releaseThresholdDays: 30    # Number of days a license can be unused before it is released
        professional:
          enable: true                # Monitor and release Professional licenses
          releaseThresholdDays: 30    # Number of days a license can be unused before it is released
      destination:
        influxDb:                     # Store info about released licenses in InfluxDB
          enable: true
          tag: 
            static:                   # Static attributes/tags to attach to the data sent to InflixDB
              - name: foo
                value: bar
  ...
  ...
```
