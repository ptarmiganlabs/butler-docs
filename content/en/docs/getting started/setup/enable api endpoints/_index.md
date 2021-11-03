---
title: "Enabling endpoints in Butler's REST API"
linkTitle: "API endpoints"
weight: 30
description: >
  API endpoints can be individually enabled/disabled. 

  By only enabling the endpoints needed for your Qlik Sense environment, memory usage is minimised and security maximised.
---

{{% alert title="Mandatory" color="warning" %}}
These settings are mandatory.  
They must exist in the config file and be correctly set for Butler to work.
{{% /alert %}}

## What's this?

Butler offers a set of REST API endpoints. While these have been tested, it's always good practice to only expose the APIs really needed.

Thus, individual endpoints of Butler's API can be turned on or off in the main config file.

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
  # Enable/disable individual REST API endpoints. Set config item below to true to enable that endpoint.
  restServerEndpointsEnable:
    apiListEnbledEndpoints: false
    base62ToBase16: false
    base16ToBase62: false
    butlerping: false
    createDir: false
    createDirQVD: false
    fileDelete: false
    fileMove: false
    fileCopy: false
    keyValueStore: false
    mqttPublishMessage: false
    scheduler:
      createNewSchedule: false
      getSchedule: false
      getScheduleStatusAll: false
      updateSchedule: false
      deleteSchedule: false
      startSchedule: false
      stopSchedule: false
    senseAppReload: false
    senseAppDump: false
    senseListApps: false
    senseStartTask: false
    slackPostMessage: false 
  ...
  ...
```
