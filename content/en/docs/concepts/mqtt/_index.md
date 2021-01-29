---
title: "MQTT integration"
linkTitle: "MQTT integration"
weight: 50
description: >
  Details about how Qlik Sense can use Butler to send pub-sub messages using MQTT.
---


## What is MQTT?

[MQTT](https://mqtt.org) is a light weight publish-subscribe ("pub-sub") protocol.

Used in both the telecomms industry and various Internet of Things applications, there are client libraries available for many different languages and platforms. This is important, as there is a good chance other systems can find a way of sending MQTT messages, which Butler can then listen for/subscribe to.

## Outgoing MQTT from Butler itself

If MQTT is enabled, Butler will forward events (reload failed, user opened a session to Sense etc) to MQTT. These events are sent to the MQTT topics defined in the `Butler.mqttConfig` section of Butler's config file.

## Outgoing MQTT - publish

Butler can post messages to MQTT topics. The `/v4/mqttpublishmessage` API endpoint is used for this.  
This way Butler can send status information and notifications to other systems, outside of Qlik Sense. Use cases include:

* Notify downstream systems that Sense has finished creating some data set that the downstream system depends on.
* Send debug or trace messages to MQTT instead of to the Sense log. Using a MQTT client (there are multiple ones on both Windows, OSX and Linux) you can then monitor the messages in real time. Very useful during development of tricky Sense load scripts!
* Start Sense tasks (typically reloads) from the Sense load script. Very useful when you need to trigger a second app reload once the first app's load script reaches some specific point of execution.  
This way the scheduling and execution of Sense tasks can be made much more flexible than using the built in QMC scheduler.

  Note: While possible to start reload tasks using MQTT, it's usually easier to do this using [Butler's REST API](/docs/reference/rest-api).
* Send messages to platforms such as Node-RED. Node-RED is an open source platform (with a graphical editor) intended for integrating different systems and data sources. As it is built on node.red there are many different modules available, offering integrations with all sorts of systems and protocols.  
Using Node.RED together with Qlik Sense and Butler, it is possible to interface with social media from the Sense load script (send a Tweet when some condition occur during app reload, for example).

## Incoming MQTT - subscribe

Butler listens to all MQTT messages in the `qliksense/#` topic tree. Which in MQTT lingo means "listen to all messages in the qliksense topic, as well as in any subtopics".

When Butler finds such a message, it is analysed and if the topic matches any of the predefined topics with special meaning, the associated tasks are carried out.  

Topics with special meaning are:

* `qliksense/start_task`: Starts the Sense task identified by the ID sent in the message body. See the [Examples](/docs/examples/start-task-from-mqtt/#use-mqtt-to-start-sense-tasks) secion.

As Butler listens to all messages in qliksense/#, it can easily be extended with handlers for additional topics.
