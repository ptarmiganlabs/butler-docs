---
title: 'Sending Windows service alerts to Slack'
linkTitle: 'Slack'
weight: 40
description: >
    This page contains information on how to configure Butler to send alerts messages to Slack when Windows services stop or start.
---

## What's this?

These config settings are specific to the Slack alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

All settings are found in the `Butler.slackNotification.serviceStopped` and `Butler.slackNotification.serviceStarted` sections of the config file.

Butler will send a Slack message to the channel specified in the config file when a Windows service stops or starts.

Similarly to how reload-failed Slack alerts work, Butler can send two types of Slack messages:

1. A simple message with just the name of the service that stopped or started. This will be the case if `Butler.slackNotification.serviceStopped.messageType` or `Butler.slackNotification.serviceStarted.messageType` is set to `basic`.
2. A more detailed and better formatted message with information about the service, the server it's running on etc. This will be the case if `Butler.slackNotification.serviceStopped.messageType` or `Butler.slackNotification.serviceStarted.messageType` is set to `formatted`.

Rate limiting is controlled by the `Butler.slackNotification.serviceStopped.rateLimit` and `Butler.slackNotification.serviceStarted.rateLimit` settings.

{{< notice tip >}}
The template used to create formatted Slack messages can be customized.

Check out the [handlebars documentation](https://handlebarsjs.com/) for more information on how to do this.
{{< /notice >}}

A formatted Slack message can look something like this:

![Slack message when a Windows service has stopped](butler-win-svc-monitor-slack-1.png 'Slack message when a Windows service has stopped')

### Information availble in formatted Slack messages

Similar to how failed-reload email notifications work, the templating engine [Handlebars](https://handlebarsjs.com/) is used to format the Slack messages.

The following information is available in formatted Slack messages:

| Handlebars variable | Description |
| --- | --- |
| `{{host}}` | The hostname of the server where the service is running |
| `{{serviceStatus}}` | The status of the service, e.g. `RUNNING` or `STOPPED` |
| `{{servicePrevStatus}}` | The previous status of the service, e.g. `RUNNING` or `STOPPED` |
| `{{serviceName}}` | The name of the service as defined in Windows |
| `{{serviceDisplayName}}` | The display name of the service as defined in Windows. Can sometimes be a bit more human readable than the serviceName. |
| `{{serviceFriendlyName}}` | The friendly name of the service as defined in the config file. |
| `{{serviceStartType}}` | The start type of the service, e.g. `AUTO_START` or `DEMAND_START` |
| `{{serviceExePath}}` | The path to the service executable |

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for notifications and messages sent to Slack
  slackNotification:
    serviceStopped:
      webhookURL: <web hook URL from Slack>
      channel: qliksense-service-alert  # Slack channel to which Windows service stopped notifications are sent
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service stopped: "{{serviceName}}" on host "{{host}}"'       # Only needed if message type = basic
      rateLimit: 30                   # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/slack/template/directory/service-stopped.handlebars
      fromUser: Qlik Sense
      iconEmoji: ':ghost:'
    serviceStarted:
      webhookURL: <web hook URL from Slack>
      channel: qliksense-service-alert  # Slack channel to which Windows service stopped notifications are sent
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service started: "{{serviceName}}" on host "{{host}}"'       # Only needed if message type = basic
      rateLimit: 30                   # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/slack/template/directory/service-started.handlebars
      fromUser: Qlik Sense
      iconEmoji: ':ghost:'
  ...  
  ...
```
