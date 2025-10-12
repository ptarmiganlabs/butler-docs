# Start Sense tasks using MQTT

Use MQTT messages to trigger Sense task execution in an event-driven manner.

## Overview

Butler can be configured to listen to a specific MQTT topic (specified in config file property `Butler.mqttConfig.taskStartTopic`) and use any message received in that topic as a Sense task ID, which is then started.

## Use Case Example

- A Sense app, used by end users, relies on data in a source system that talks MQTT (there are _lots_ of MQTT libraries available, covering most operating systems).
- The data in the source system can be updated at any time.

In order to update the Sense app with data the most common approach is to schedule reloads of the Qlik Sense app at certain intervals, i.e. polling the source system.

But if the source system instead posts a MQTT message on a well defined topic when new data is available, that message will trigger the Sense app's reload.

This way the Sense app will be updated as quickly as possible after new data is available in the source system.

**_I.e. the end user will have access to more up-to-date data, compared to the polling based solution._**

## Requirements

These config file settings must be set up before Butler will use MQTT messages to start tasks:

- Connection to MQTT broker (=server):
  - Butler.mqttConfig.enable: true
  - Butler.mqttConfig.brokerHost: `<IP or host name of MQTT broker>`
  - Butler.mqttConfig.brokerPort: `<Port where MQTT broker is listening>`
- MQTT topics that Butler should subscribe to
  - Butler.mqttConfig.subscriptionRootTopic: `<Root topic that Butler should subscribe to. Something like "qliksense/#">`
  - Butler.mqttConfig.taskStartTopic: `<Topic used to start Sense tasks. _MUST_ be a subtopic to the root topic above!>`

## Demo

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

<iframe width="560" height="315" src="https://www.youtube.com/embed/5m6FPRqhN14" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## How It Works

1. Configure Butler to connect to your MQTT broker
2. Set up the MQTT topic that Butler should monitor for task start requests
3. When a message arrives on that topic, Butler interprets the message payload as a task ID
4. Butler starts the Sense reload task with that ID

## Benefits

- **Event-driven**: No need for polling, tasks start immediately when data is ready
- **Decoupled**: Source systems don't need to know about Qlik Sense directly
- **Lightweight**: MQTT is a lightweight protocol perfect for IoT and real-time scenarios
- **Flexible**: Any system that can send MQTT messages can trigger Sense reloads
