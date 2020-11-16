---
title: "Reload alerts via MQTT"
linkTitle: "MQTT"
weight: 40
description: >
  Description of how reload alerts can be sent as MQTT messages.
---

{{% alert title="Optional" color="primary" %}}
These settings are optional.  
If alerts via MQTT are not of interest, just turn off this feature and leave the default values in the config as they are.

Do note though that Butler expects the configuration properties below to exist in the config file, but will *ignore their values* if the related features are disabled.
{{% /alert %}}

## What's this?

Butler can send two kinds of alert messages as MQTT messages:

- When a scheduled, running reload task fails.
- When a scheduled, running reload task is somehow stopped.

## How it works

The MQTT message will be sent on the MQTT topic defined in the config file property `Buler.mqttConfig.taskAbtortedTopic` or `Butler.mqttConfig.taskFailureTopic`, depending on the nature of the event.

The task name will be sent in the message body.

{{% alert title="Remember" color="warning" %}}
Don't forget to create the log appender .xml files on the Sense server(s).  
[This page](../) describes how.

Those xml files are the foundation on top of which all Butler alerts are built - without them the alerts described on this page won't work.
{{% /alert %}}

The concept is more or less the same as for [alert emails](../alert-emails/#how-it-works).

Butler's MQTT alerts don't currently support the templates available for alert emails.

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
  mqttConfig:
    enable: false                                     # Should Qlik Sense events be forwarded as MQTT messages?
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
    taskFailureTopic: qliksense/task_failure
    taskFailureServerStatusTopic: qliksense/butler/task_failure_server
    taskAbortedTopic: qliksense/task_aborted
  ...
  ...
  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started? true/false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998
  ...
  ...
```
