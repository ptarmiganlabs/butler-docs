---
title: "Sending Windows service alerts to Microsoft Teams"
linkTitle: "MS Teams"
weight: 50
description: >
  This page contains information on how to configure Butler to send alerts messages to Microsoft Teams when Windows services stop or start.
---

## What's this?

These config settings are specific to the Microsoft Teams alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

All settings are found in the `Butler.teamsNotification.serviceStopped` and `Butler.teamsNotification.serviceStarted` sections of the config file.

Butler will send a Teams message to the channel associated with ` Butler.teamsNotification.``<serviceStopped|servierStarted>``.webhookRL ` in the config file when a Windows service stops or starts.

Similarly to how reload-failed Teams alerts work, Butler can send two types of Teams messages:

1. A simple message with just the name of the service that stopped or started. This will be the case if `Butler.teamsNotification.serviceStopped.messageType` or `Butler.teamsNotification.serviceStarted.messageType` is set to `basic`.
2. A more detailed and better formatted message with information about the service, the server it's running on etc. This will be the case if `Butler.teamsNotification.serviceStopped.messageType` or `Butler.teamsNotification.serviceStarted.messageType` is set to `formatted`.

Rate limiting is controlled by the `Butler.teamsNotification.serviceStopped.rateLimit` and `Butler.teamsNotification.serviceStarted.rateLimit` settings.

::: tip
The template used to create formatted Teams messages can be customized.

Check out the [handlebars documentation](https://handlebarsjs.com/) for more information on how to do this.
:::

A formatted Teams message can look something like this:

<ResponsiveImage
  src="/img/getting-started/setup/windows-service-monitor/teams/butler-win-svc-monitor-teams-1.png"
  alt="Teams message when a Windows service has stopped"
  caption="Teams message when a Windows service has stopped"
/>

### Information available in formatted Teams messages

Similar to how failed-reload email notifications work, the templating engine [Handlebars](https://handlebarsjs.com/) is used to format the Teams messages.

The following information is available in formatted Teams messages:

| Handlebars variable                        | Description                                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| <code v-pre>{{host}}</code>                | The hostname of the server where the service is running.                                                                |
| <code v-pre>{{serviceStatus}}</code>       | The status of the service, e.g. `RUNNING` or `STOPPED`.                                                                 |
| <code v-pre>{{servicePrevStatus}}</code>   | The previous status of the service, e.g. `RUNNING` or `STOPPED`.                                                        |
| <code v-pre>{{serviceName}}</code>         | The name of the service as defined in Windows.                                                                          |
| <code v-pre>{{serviceDisplayName}}</code>  | The display name of the service as defined in Windows. Can sometimes be a bit more human readable than the serviceName. |
| <code v-pre>{{serviceFriendlyName}}</code> | The friendly name of the service as defined in the config file.                                                         |
| <code v-pre>{{serviceStartType}}</code>    | The start type of the service, e.g. `AUTO_START` or `DEMAND_START`.                                                     |
| <code v-pre>{{serviceExePath}}</code>      | The path to the service executable.                                                                                     |

## Creating a MS Teams webhook

To create a webhook in MS Teams, follow the steps in the [Concepts section](/docs/concepts/teams-messaging).

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for notifications and messages sent to MS Teams
  teamsNotification:
    serviceStopped:
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service stopped: "{{serviceName}}" on host "{{host}}"'       # Only needed if message type = basic
      rateLimit: 30                   # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/teams/template/directory/service-stopped.handlebars
    serviceStarted:
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service started: "{{serviceName}}" on host "{{host}}"'       # Only needed if message type = basic
      rateLimit: 30                   # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/teams/template/directory/service-started.handlebars
  ...
  ...
```
