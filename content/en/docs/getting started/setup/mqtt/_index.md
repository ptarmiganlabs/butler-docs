---
title: "Setting up MQTT messaging"
linkTitle: "MQTT"
weight: 140
description: >
  Butler can use MQTT as a channel for pub-sub style M2M (machine to machine) messages. This page describes how to configure MQTT in Butler.
---

## What's this?

[MQTT](https://mqtt.org/) is a light weight messaging protocol based on a publish-subscribe metaphore. It is widely for example Internet of Things and telecom sectors.

MQTT has features such as guaranteed delivery of messages, which makes it very useful for communicating between Sense and both up- and downstream source/destination systems.

Butler can be configured to forward events from Sense (reload task failures, aborted reload tasks, user session start/stop etc) as MQTT messages.

Butler's [REST API](/docs/reference/rest-api/?operationsSorter=alpha) also has an endpoint that makes it possible to send MQTT messages from the Sense load script.

## Settings in config file

The settings are of two kinds:

1. Defining what MQTT broker/server to connect to
2. What MQTT topics should be used when forwarding Qlik Sense events to MQTT.

```yaml
---
Butler:
  ...
  ...
  mqttConfig:
    enable: false                                     # Should Qlik Sense events be forwarded as MQTT messages?
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
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
  ...
  ...
```
