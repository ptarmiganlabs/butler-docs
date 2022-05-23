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

Butler offers a set of REST API endpoints. While these endpoints are tested for stability and correct functionality as part of each release, it's always good practice to only enable the endpoints really needed.

Thus, individual endpoints of Butler's API can be turned on or off in the main config file.

### API endpoint related settings

In some cases some extra configuration is needed to make an API endpoint function properly.  
This information is configured in the `Butler.restServerEndpointsConfig` section in the config file.

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
    newRelic:
      postNewRelicMetric: true
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

  restServerEndpointsConfig:
    newRelic:
      postNewRelicMetric:          # Setings used by post metric to New Relic API endpoint
        # Note that the URL path should *not* be included in the url setting below!
        # As of this writing the valid options are
        # https://insights-collector.eu01.nr-data.net
        # https://insights-collector.newrelic.com 
        url: https://insights-collector.eu01.nr-data.net
        header:                   # Custom http headers
          - name: X-My-Header
            value: Header value
        attribute: 
          static:                   # Static attributes/dimensions to attach to the metrics data sent to New Relic.
            - name: env
              value: prod
  ...
  ...
```
