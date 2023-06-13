---
title: 'Sending Windows service alerts to New Relic'
linkTitle: 'New Relic'
weight: 20
description: >
    This page contains information on how to configure Butler to send alerts messages to New Relic when Windows services stop or start.
---

## What's this?

These config settings are specific to the New Relic alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

All settings are found in the `Butler.incidetTool.newRelic.serviceMonitor` section of the config file.

Butler can send two kinds of messages to New Relic: events and logs entries.  
New Relic events and log entries are good at different things, and you can choose to send either or both.

In general, events are good for monitoring and alerting while log entries are good for logging and troubleshooting.  
If in doubt, send both - that will give you the freedom to choose later which to use in the New Relic dashboards, alerts and incidents.

### New Relic events

Windows service events will be sent to New Relic with the name of `qs_serviceStateEvent`.

The static attributes attached to events sents to New Relic events are the ones defined in the config file.  
These can be used to identify which of potentially several Butler instances the message originated from, and to filter and group messages in New Relic.

The values of dynamic attributes are determined at runtime and can be enabled or disabled in the config file:

| Dynamic attribute name in New Relic | Description |
| --- | --- |
| butler_serviceHost | The hostname of the server where the service is running |
| butler_serviceName | The name of the service as defined in Windows |
| butler_serviceDisplayName | The display name of the service as defined in Windows. Can sometimes be a bit more human readable than the serviceName. |
| butler_serviceStatus | The status of the service, e.g. `RUNNING` or `STOPPED` |

![New Relic event for a Windows service alert message](butler-win-svc-monitor-new-relic-event-1.png 'New Relic event for a Windows service alert message')

### New Relic log entries

Windows service log entries will be sent to New Relic with a log type of `qs_serviceStateLog`.

Static and dynamic attributes are handled in the same way as for events.

The raw data of a New Relic lg entry will look something like this:

![New Relic log entry for a Windows service alert message](butler-win-svc-monitor-new-relic-log-1.png 'New Relic log entry for a Windows service alert message')


## Settings in config file

```yaml
---
Butler:
  ...
  ...
  incidentTool: 
    newRelic:
      serviceMonitor:
        destination:
          event: 
            enable: false
            sendToAccount:                # Windows service events are sent to these New Relic accounts
              - First NR account
              - Second NR account
            attribute: 
              static:                     # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute
                  value: abc 123
              dynamic:
                serviceHost: true         # Should host where service is running be sent to New Relic as attribute?
                serviceName: true         # Should service name be sent to New Relic as attribute?
                serviceDisplayName: true  # Should service display name be sent to New Relic as attribute?
                serviceState: true        # Should service state be sent to New Relic as attribute?
          log:
            enable: false
            sendToAccount:                # Windows service log entries are sent to these New Relic accounts
              - First NR account
              - Second NR account
            attribute: 
              static:                     # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute
                  value: def 456
              dynamic:
                serviceHost: true         # Should host where service is running be sent to New Relic as attribute?
                serviceName: true         # Should service name be sent to New Relic as attribute?
                serviceDisplayName: true  # Should service display name be sent to New Relic as attribute?
                serviceState: true        # Should service state be sent to New Relic as attribute?
        monitorServiceState:              # Control whih service states are sent to New Relic
          running:
            enable: true
          stopped:
            enable: true
        sharedSettings:
          rateLimit: 5                    # Min seconds between events/logs sent to New Relic for a given host+service. Defaults to 5 minutes.
          header:                         # Custom http headers
            - name: X-My-Header           # Example
              value: Header value 2       # Example
          attribute: 
            static:                       # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service             # Example
                value: butler             # Example
              - name: environment         # Example
                value: prod               # Example
  ...  
  ...
```
