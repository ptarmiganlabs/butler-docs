---
title: "Task and service alerts via MQTT"
linkTitle: "MQTT"
weight: 60
description: >
  Description of how task and Windows service alerts can be sent as MQTT messages.
---

## What's this?

Butler can send alert messages as MQTT messages for:

**Task monitoring:**
- When a scheduled, running reload task fails
- When a scheduled, running reload task is stopped/aborted

**Windows service monitoring:**
- When a Windows service is running
- When a Windows service stops
- Service status information

::: info Task type limitation for task alerts
For **task alerts**, MQTT notifications are only available for **reload tasks** (failed and aborted).  

They are **not supported** for:
- Distribute tasks
- Preload tasks
- External program tasks  
- User sync tasks
- Successful reload tasks

For these task types, use [Email alerts](/docs/getting-started/setup/task-alerts/client-managed/alert-emails/) or [InfluxDB metrics](/docs/getting-started/setup/task-alerts/client-managed/alert-influxdb/) instead.
:::

## How it works

### Basic message

The MQTT message will be sent on the MQTT topic defined in the config file property `Butler.mqttConfig.taskAbortedTopic` or `Butler.mqttConfig.taskFailureTopic`, depending on the event type.  
The task name will be sent in the message body.

The basic message looks like this when viewed in the MQTTLens app:

![A basic reload task failed message sent via MQTT](/img/getting-started/setup/task-alerts/client-managed/alert-mqtt/mqtt_failed_task_basic_1.png A basic reload task failed message sent via MQTT)  

### Complete message

Optionally a larger, more complete message is also sent if `Butler.mqttConfig.taskFailureSendFull` or `Butler.mqttConfig.taskFailureSendFull` are set to true.  
This message contains a stringified JSON of all available information about the failed/aborted task.  
The message is sent on the `Butler.mqttConfig.taskFailureFullTopic` or `Butler.mqttConfig.taskAbortedFullTopic` topics.

That message can look like this:

![A complete reload task failed message sent via MQTT](/img/getting-started/setup/task-alerts/client-managed/alert-mqtt/mqtt_failed_task_full_1.png A complete reload task failed message sent via MQTT)  

::: warning Remember
Don't forget to create the log appender .xml files on the Sense server(s).  
[This page](../) describes how.

Those xml files are the foundation on top of which all Butler alerts are built - without them the alerts described on this page won't work.
:::

The concept is more or less the same as for [alert emails](../alert-emails/#how-it-works).

## Settings in config file

MQTT messages are configured for both **reload tasks** and **Windows services**:

```yaml
---
Butler:
  ...
  ...
  mqttConfig:
    enable: false                                     # Should Qlik Sense events be forwarded as MQTT messages?
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
    azureEventGrid:
      enable: false              # If set to true, Butler will connect to an Azure Event Grid MQTT Broker, using brokerHost and brokerPort above 
      clientId: <client ID>
      clientCertFile: <path to client certificate file>
      clientKeyFile: <path to client key file>
    taskFailureSendFull: true
    taskAbortedSendFull: true
    subscriptionRootTopic: qliksense/#                                  # Topic that Butler will subscribe to
    taskStartTopic: qliksense/start_task                                # Topic for incoming messages used to start Sense tasks. Should be subtopic to subscriptionRootTopic
    taskFailureTopic: qliksense/task_failure
    taskFailureFullTopic: qliksense/task_failure_full
    taskFailureServerStatusTopic: qliksense/butler/task_failure_server
    taskAbortedTopic: qliksense/task_aborted
    taskAbortedFullTopic: qliksense/task_aborted_full
    serviceRunningTopic: qliksense/service_running                      # Topic for Windows service running notifications
    serviceStoppedTopic: qliksense/service_stopped                      # Topic for Windows service stopped notifications
    serviceStatusTopic: qliksense/service_status                        # Topic for Windows service status information
  ...
  ...
  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started? true/false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998
  ...
  ...
```
