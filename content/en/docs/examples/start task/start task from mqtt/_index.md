---
title: "Start Sense tasks using MQTT"
linkTitle: "MQTT"
weight: 20
description: >
  
---
## Use MQTT to start Sense tasks

Butler can be configured to listen to a specific MQTT topic (specified in config file property `Butler.mqttConfig.taskStartTopic`) and use any message received in that topic as a Sense task ID, which is then started.

For example:  

* A Sense app, used by end users, relies on data in a source system that talks MQTT (there are *lots* of MQTT libraries available, covering most operating systems).
* The data in the source system can be updated at any time.

In order to update the Sense app with data the most common approach is to schedule reloads of the Qlik Sense app at certain intervals, i.e. polling the source system.

But if the source system instead posts a MQTT message on a well defined topic when new data is available, theat message will trigger the Sense app's reload.
  
This way the Sense app will be updated as quickly as possible after new data is availabe in the source system.

***I.e. the end user will have access to more up-to-date data, compared to the polling based solution.***

## Requirements for starting tasks via MQTT

These config file settings must be set up before Butler will use MQTT messages to start tasks:

* Connection to MQTT broker (=server):
  * Butler.mqttConfig.enable: true
  * Butler.mqttConfig.brokerHost: <IP or host name of MQTT broker>
  * Butler.mqttConfig.brokerPort: <Port where MQTT broker is listening>
* MQTT topics that Butler should subscribe to
  * Butler.mqttConfig.subscriptionRootTopic: <Root topic that Butler should subscribe to. Something like `qliksense/#`>
  * Butler.mqttConfig.taskStartTopic: <Topic used to start Sense tasks. *MUST* be a suptopic to the root topic above!>

## Seeing is believing

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

{{< youtube id="5m6FPRqhN14" modestbranding=true color="red">}}
