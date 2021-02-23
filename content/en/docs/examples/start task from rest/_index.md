---
title: "Start Sense tasks using REST API"
linkTitle: "REST starting Sense tasks"
weight: 55
description: >
  
---

## Use Butler's REST API to start Sense tasks

If the Butler config file is properly set up it's possible to start any Sense task by doing a PUT HTTP call to /v4/reloadtask/{taskId}/start endpoint.

A great use case is to have upstream systems that feed Qlik Sense with data trigger a Sense task when new data is available.  
That way Sense doesn't have to poll for new data, with less system resources used in both upstream system and in Sense.

***AND*** users get the new data as quickly as possible!

## Requirements for starting tasks via REST API

These config file settings must be set up before Butler can use the REST API to start tasks:

* Connection to Qlik Sense:
  * Butler.configQRS.*
* Configure REST server itself:
  * Butler.restServerConfig.enable: true
  * Butler.restServerConfig.serverHost: <IP or hostname where Butler's REST server is running>
  * Butler.restServerConfig.serverPort: <Port where Butler is exposing its REST server>
* Enable the start task API endpoint
  * Butler.restServerEndpointsEnable.senseStartTask: true

## Video showing starting tasks via both MQTT and REST API

{{< youtube id="" modestbranding=true color="red">}}
