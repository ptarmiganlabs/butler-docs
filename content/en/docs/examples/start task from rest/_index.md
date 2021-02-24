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

### Helper functions available in .qvs file

If you what to start reload tasks from the Sense load script that is easy.

Just include the [butler_subs.qvs](https://github.com/ptarmiganlabs/butler/blob/master/docs/sense_script/butler_subs.qvs) file from the GitHub release package and you get (among many other things) a helper function that's called `StartTask`. It takes a single `taskId` parameter,  which means that starting a reload task from an app's load script is as simple as

    Call StartTask(<TaskId>)

The general Butler 5.0 demo app `Butler 5.0 - demo app (many APIs!).qvf` ([link](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps)) contains such a demo (and many others).

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

## Seeing is believing

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

{{< youtube id="5m6FPRqhN14" modestbranding=true color="red">}}
