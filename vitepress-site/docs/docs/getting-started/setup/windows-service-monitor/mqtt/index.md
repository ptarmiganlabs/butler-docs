---
title: 'Sending Windows service alerts as MQTT messages'
linkTitle: 'MQTT'
weight: 60
description: >
  This page contains information on how to configure Butler to send alerts as MQTT messages when Windows services stop or start.
---

## What's this?

These config settings are specific to the MQTT alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

All settings are found in the `Butler.mqttConfig` section of the config file.

Butler will send two kinds of MQTT messages:

- A state message indicating that a service has changed its state, for example from `RUNNING` to `STOPPED`.
  - When a service stops or starts, Butler will send a message to the topic defined in `Butler.mqttConfig.serviceStoppedTopic`, with `/<hostname>/<serviceName>` appended to the topic.
    The payload will be a JSON with information about the service (name, display name, current state, previous state, dependencies, EXE path etc.).)
  - When a service starts the same thing happens, but the base topic used is defined in `Butler.mqttConfig.serviceStartedTopic`.
- A message containing the current state of a service. These messages are sent when Butler starts up and when the state of a service changes. 
  - The base MQTT topic for these messages are defined in the `Butler.mqttConfig.serviceStateTopic` setting. To this topic, Butler will append `/<hostname>/<serviceName>` before sending the message.  
  - These messages are sent every time Butler checks the status of the Windows services, i.e. every `Butler.serviceMonitor.frequency` seconds.
  - The MQTT message will be sent as a JSON with information about the service (name, display name, current state, dependencies, EXE path etc.).

A few MQTT message can look like this when viewed in [MQTT Explorer](https://mqtt-explorer.com):

![MQTT messages related to Windows services](/img/getting-started/setup/windows-service-monitor/mqtt/butler-win-svc-monitor-mqtt-1.png 'MQTT messages related to Windows services')

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  mqttConfig:
    enable: false                                     # Should Qlik Sense events be forwarded as MQTT messages?
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
    serviceRunningTopic: qliksense/service_running
    serviceStoppedTopic: qliksense/service_stopped
    serviceStatusTopic: qliksense/service_status  
  ...  
  ...
```
