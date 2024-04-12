---
title: "MQTT"
linkTitle: "MQTT"
weight: 80
description: >
  
---

## MQTT as unified message bus

When a reload fails, Butler can send information about the failed reload to an MQTT broker.

MQTT is a lightweight messaging protocol that is commonly used in IoT applications, but it is a mature and versatile protocol that can be used in many different scenarios.

In short, MQTT works by having a broker that clients can connect to. Clients can publish messages to the broker, and clients can subscribe to messages from the broker.  
This makes MQTT a great way to integrate different systems in a publish/subscribe pattern.

By sending information about failed reloads to an MQTT broker, Butler can be integrated with any system that can consume MQTT messages - which is a lot of systems.

The information included in the MQTT message is described [here](/docs/getting-started/setup/reload-alerts/alert-mqtt/).

Here is an example of how the information about a failed reload can be viewed in MQTT Explorer:

![Information about a failed reload, viewed in MQTT Explorer](/img/failed-reload-mqtt-explorer-1.png 'Information about a failed reload, viewed in MQTT Explorer')

## Configuration

Configuration of this feature is described [here](/docs/getting-started/setup/mqtt/).
