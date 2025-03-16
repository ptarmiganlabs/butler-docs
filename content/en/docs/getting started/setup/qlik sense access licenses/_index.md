---
title: "Qlik Sense access licenses"
linkTitle: "Access licenses"
weight: 116
description: >
  Butler can monitor Qlik Sense user access licenses.  

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

The config file settings below will (if enabled):

1. Every 6 hours, poll Qlik Sense for information about user licenses.
2. Store this information in InfluxDB and add a tag `foo` with the value `bar` to the data sent to InfluxDB.

Adapt as needed to your environment.

### Releasing inactive user licenses

The config file settings below will (if enabled):

1. Every 24 hours, release Professional and Analyzer access licenses that have been inactive for 30 days or more.
2. Never release access licenses for...
   1. users `INTERNAL\sa_repository`, `INTERNAL\sa_api` and `USERDIR\qs_admin_account`.
   2. users tagged with `License do not release` or `some other tag`.
   3. users with custom property `LicenseManage` set to `do-not-release`.
   4. users in user directories `INTERNAL` and `ADMIN`.
3. Disregard users' inactive, blocked and removed externally status when deciding whether to release their access licenses.
4. Store information about released licenses in InfluxDB and add a tag `foo` with the value `bar` to the data sent to InfluxDB.

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
    ...
    ...
    licenseMonitor:                   # Monitor Qlik Sense accesds license usage
      enable: false
      frequency: every 6 hours        # https://bunkat.github.io/later/parsers.html#text
      destination:
        influxDb:                     # Store license data in InfluxDB
          enable: false
          tag:
            static:                   # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar
    licenseRelease:                   # Release unused Qlik Sense access licenses
      enable: false                   # true/false. If true, Butler will release unused licenses according to settings below
      dryRun: true                    # true/false. If true, Butler will not actually release any licenses, just log what it would have done.
      frequency: every 24 hours        # https://bunkat.github.io/later/parsers.html#text
      neverRelease:                   # Various ways of defining which users should never have their licenses released
        user:                         # Users who should never have their licenses released
          - userDir: 'INTERNAL'
            userId: 'sa_repository'
          - userDir: 'INTERNAL'
            userId: 'sa_api'
          - userDir: 'USERDIR'
            userId: 'qs_admin_account'
        tag:                          # Users with these tags will never have their licenses released
          - License do not release
          - some other tag
        customProperty:               # Users with these custom properties will never have their licenses released
          - name: LicenseManage
            value: do-not-release
        userDirectory:                # List of user directories whose users should never have their licenses released
          - INTERNAL
          - ADMIN
        inactive: Ignore              # Ignore/Yes/No. The value is case insensitive
                                      #   No = Don't release licenses for users marked as "Inactive=No" in the QMC
                                      #   Yes = Don't release licenses for users marked as "Inactive=Yes" in the QMC
                                      #   Ignore = Disregard this setting
        blocked: Ignore               # Ignore/Yes/No, No = Don't release licenses for users marked as "Blocked=No" in the QMC
        removedExternally: ignore     # Ignore/Yes/No, No = Don't release licenses for users marked as "Removed externally=No" in the QMC
      licenseType:                    # License types to monitor and release
        analyzer:
          enable: true                # Monitor and release Analyzer licenses
          releaseThresholdDays: 30    # Number of days a license can be unused before it is released
        professional:
          enable: true                # Monitor and release Professional licenses
          releaseThresholdDays: 30    # Number of days a license can be unused before it is released
      destination:
        influxDb:                     # Store info about released licenses in InfluxDB
          enable: false
          tag:
            static:                   # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar
  ...
  ...
```
