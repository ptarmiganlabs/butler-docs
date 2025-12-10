---
title: 'Monitoring Windows services'
linkTitle: 'Windows services'
weight: 108
description: >
    Butler can monitor Windows services and alert if they are not running.  
      
    This is useful for monitoring services that are critical for Qlik Sense to function - or any other important service.  
      
    Messages can be sent when services stop or start, with message destinations such as Slack, Teams, email, New Relic, InfluxDB, webhooks and MQTT.
---

## What's this?

Qlik Sense uses Windows Services to run the Qlik Sense Engine, Qlik Sense Repository Service, Qlik Sense Scheduler Service and more.

If any of these services stop, Qlik Sense will not work.  
Butler can monitor these services and alert if they are not running and when they start again.

This feature is only available when Butler is running on Windows, on other OSs a warning will be logged when Butler is starting and the feature will be disabled.

::: tip Improved in Butler 15.0.0
Butler 15.0.0 adds hostname validation for Windows service monitoring. If a service host is misconfigured (e.g., invalid hostname format), Butler will now provide clearer error messages to help diagnose the issue.
:::

## How it works

Butler will poll the Windows Service Control Manager (SCM) for the status of the services that are configured to be monitored.  
The polling interval is configurable via the `Butler.serviceMonitor.frequency` setting, but defaults to 30 seconds.

The services to be monitored are listed in `Butler.serviceMonitor.monitor` section of the config file.  
If firewalls etc allow it it is possible to monitor services on remote Windows machines as well.

Three pieces of information are needed for each service to be monitored:

1. The host name of the machine where the service is running (`Butler.serviceMonitor.monitor.<host>`).  
   This config entry is shared for all services monitored on the same host.
2. The name of the service (`Butler.serviceMonitor.monitor.<services>.name`).  
   This is the name of the service as it appears in the Windows Service Control Manager (SCM).
   Right click on a service in the Windows Services app and select Properties, then find the "Service name" on the General tab.
3. A "friendly name" that can be anything (`Butler.serviceMonitor.monitor.<services>.friendlyName`). This is useful as the Windows service name are not always very descriptive.  
   The friendly name is used in the alert messages sent to the various alert destinations, including InfluxDB and New Relic.

Each alert destination can be enabled or disabled via the `Butler.serviceMonitor.alertDestination.<destination>.enable` setting.  

## Settings in config file

The configuration of each alert destination is done in the destinations' own section of the config file, for example `Butler.teamsNotification.serviceStopped`, `Butler.emailNotification.serviceStopped`, `Butler.emailNotification.serviceStarted` etc.

Those settings are described in sub-pages of this page.


```yaml
---
Butler:
  ...
  ...
  # Monitor Windows services.
  # This feature only works when Butler is running on Windows Server or desktop.
  # On other OSs service monitoring will be automatically disabled.
  serviceMonitor:
    enable: false                    # Main on/off switch for service monitoring
    frequency: every 30 seconds     # https://bunkat.github.io/later/parsers.html
    monitor:
      - host: <hostname or IP>      # Host name of Windows computer where services are running
        services:                   # List of services to monitor
          - name: postgresql-x64-12       # Posgress/repository db
            friendlyName: Repository DB
          - name: QlikSenseEngineService
            friendlyName: Engine
          - name: QlikSensePrintingService
            friendlyName: Printing
          - name: QlikSenseProxyService
            friendlyName: Proxy
          - name: QlikSenseRepositoryService
            friendlyName: Repository
          - name: QlikSenseSchedulerService
            friendlyName: Scheduler
          - name: QlikSenseServiceDispatcher
            friendlyName: Service Dispatcher
    alertDestination:               # Control to thich destinations service related alerts are sent
      influxDb:                     # Send service alerts to InfluxDB
        enable: true
      newRelic:                     # Send service alerts to New Relic
        enable: true
      email:                        # Send service alerts as emails
        enable: true                
      mqtt:                         # Send service alerts as MQTT messages
        enable: true
      teams:                        # Send service alerts as MS Teams messages
        enable: true
      slack:                        # Send service alerts as Slack messages
        enable: true
      webhook:                      # Send service alerts as outbound webhooks/http calls
        enable: true
  ...
  ...
```
