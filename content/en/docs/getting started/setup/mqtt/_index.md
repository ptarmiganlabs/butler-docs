---
title: "Setting up MQTT messaging"
linkTitle: "MQTT"
weight: 140
description: >
  Butler can use MQTT as a channel for pub-sub style M2M (machine to machine) messages. This page describes how to configure MQTT in Butler.
---

## What's this?

[MQTT](https://mqtt.org/) is a light weight messaging protocol based on a publish-subscribe metaphore. It is widely used in the Internet of Things (IoT) and telecom sectors.

MQTT has features such as guaranteed delivery of messages, which makes it very useful for communicating between Sense and both up- and downstream source/destination systems.

Butler can be configured to forward events from Sense (reload task failures, aborted reload tasks, windows services starting/stopping, user session start/stop etc) as MQTT messages.

Butler's [REST API](/docs/reference/rest-api-1/?operationsSorter=alpha) also has an endpoint that makes it possible to send MQTT messages from Sense apps' load scripts.

## Defining what MQTT broker/server to connect to

Butler can use either of two kinds of MQTT brokers:

1. A standard MQTT broker, such as [Mosquitto](https://mosquitto.org/).
2. An [Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/overview) MQTT broker.

The former is useful if you want to use Butler in an on-prem environment where there is no need to communicate outside of the local network.

The latter is useful if you want to use Butler's MQTT related features outside of the local network, for example in a cloud environment.  
A concrete example could be that a system that Sense read data from is located in the cloud, and that system should trigger reload tasks in Sense when new data is available.

The Azure Event Grid option is also useful if you want to use Butler's MQTT features in a hybrid environment, where some of the systems are on-prem and some are in the cloud.

The Butler config file controls which kind of MQTT broker Butler will connect to.

- If `Butler.mqttConfig.enable` is set to `true` and `Butler.mqttConfig.azureEventGrid.enable` is set to `false`, Butler will connect the standard MQTT broker defined in `Butler.mqttConfig.brokerHost` and `Butler.mqttConfig.brokerPort`. No authentication is supported in this case.
- If `Butler.mqttConfig.enable` is set to `true` and `Butler.mqttConfig.azureEventGrid.enable` is set to `true`, Butler will connect to an Azure Event Grid MQTT broker, using the settings defined in `Butler.mqttConfig.azureEventGrid` to authenticate with Azure.

### Setting up MQTT in Azure Event Grid

Setting up Event Grid with MQTT support is described [here](https://learn.microsoft.com/en-us/azure/event-grid/mqtt-publish-and-subscribe-portal).

It's worth noting that there may be costs associated with using Event Grid, depending on the number of messages sent and received.  
At the time of this writing, Azure Event Grid has a generous free tier that should be sufficient for most use cases.  
Check the [Azure pricing page](https://azure.microsoft.com/en-us/pricing/details/event-grid/) for the latest information.

## Using MQTT to get evens from Qlik Sense Cloud

Butler can use MQTT as a transport layer for events from Qlik Sense Cloud, for example app reload failure events.
A separate MQTT configuration section in the config file is used for this, see below.

## Settings in config file

The config file contains several settings related to MQTT:

1. Defining what MQTT broker/server to connect to for handling client-managed Qlik Sense events and messages.
2. What MQTT topics should be used when forwarding various client-managed Qlik Sense events to MQTT.
3. Settings related to Butler's use of MQTT for connecting with Qlik Sense Cloud.

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
    serviceRunningTopic: qliksense/service_running
    serviceStoppedTopic: qliksense/service_stopped
    serviceStatusTopic: qliksense/service_status
    qlikSenseServerLicenseTopic: qliksense/qliksense_server_license          # Topic to which Sense server license info is published
    qlikSenseServerLicenseExpireTopic: qliksense/qliksense_server_license_expire # Topic to which Sense server license expiration alerts are published
    qlikSenseCloud:                                                   # MQTT settings for Qlik Sense Cloud integration
      event:
        mqttForward:                                                  # QS Cloud events forwarded to MQTT topics, which Butler will subscribe to
          enable: false
          broker:                                                     # Settings for MQTT broker to which QS Cloud events are forwarded
            host: mqttbroker.company.com
            port: <port>
            username: <username>
            password: <password>
          topic:
            subscriptionRoot: qscloud/#                     # Topic that Butler will subscribe to
            appReload: qscloud/app/reload
  ...
  ...
```
