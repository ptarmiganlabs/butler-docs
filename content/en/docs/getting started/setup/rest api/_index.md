---
title: "Configuring Butler's REST API"
linkTitle: "REST API"
weight: 30
alias: 
 - /docs/getting-started/setup/api-endpoints/
description: >
  Butler's REST API can be enabled/disabled in itself.  
  If the API is enabled, individual API endpoints can then be enabled/disabled as needed.

  By only enabling the endpoints needed for your Qlik Sense environment, memory usage is minimised and security maximised.
---

## What's this?

Butler offers a set of REST API endpoints. While these endpoints are tested for stability and correct functionality as part of each release, it's always good practice to only enable the endpoints really needed.

Thus, individual endpoints of Butler's API can be turned on or off in the main config file.

## Configuring the REST API

```yaml
Butler:
  ...
  ...
  restServerConfig:
    enable: false                                     # Should Butler's REST API be started? Must be true if *any* API endpoints are to be used.
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>   # Use 0.0.0.0 to listen on all network interfaces (e.g. when running in Docker!).
    serverPort: 8080                                  # Port where Butler's REST is available. Any free port on the server where Butler is running can bse used.
    backgroundServerPort: 8081
```

### Ports used by Butler

Butler exposes its REST API on a TCP port defined in the `Butler.restServerConfig.serverPort` setting in the config file.

Similarly, the host name Butler listens at is defined by the `Butler.restServerConfig.serverHost` setting. This would typically be the IP number, host name or fully qualified domain name of the computer where Butler is running.

Note that Butler uses two ports for its REST API: One external facing port and one used internally. Both must be dedicated to Butler on the computer where Butler is running.

Using two ports (one external facing and one internal) is not ideal, but it was an easy yet stable way of solving some technical challenges around Butler's use of the `X-HTTP-Method-Override` [HTTP header](/docs/getting-started/setup/data-connections/). 
Just make sure that the two settings `Butler.restServerConfig.serverPort` and `Butler.restServerConfig.backgroundServerPort` aren't the same and aren't already in use, and all should be fine.

{{< imgproc butler-ports-1.png Resize "x180" >}} Ports used by Butler {{< /imgproc >}}

## Rate limiting the REST API

Butler's REST API can be rate limited to prevent abuse.

Rate limiting is configured by the `--api-rate-limit` command line parameter when starting Butler.

The parameter takes a single integer value, which is the number of API calls allowed per minute.  
Set to 0 to disable rate limiting.

## Enabling individual API endpoints

Each enabled endpoint will result in Butler using more memory and CPU. Thus only enable the endpoints that are needed.

## Endpoint specific settings

In some cases some extra configuration is needed to make an API endpoint function properly.  
This information is configured in the `Butler.restServerEndpointsConfig` section in the config file.

## Settings in config file

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
      postNewRelicMetric: false
      postNewRelicEvent: false
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
        destinationAccount:
          - First NR account
          - Second NR account
        # As of this writing the valid options are
        # https://insights-collector.eu01.nr-data.net/metric/v1
        # https://insights-collector.newrelic.com/metric/v1
        url: https://insights-collector.eu01.nr-data.net/metric/v1
        header:                   # Custom http headers
          - name: X-My-Header
            value: Header value
        attribute: 
          static:                   # Static attributes/dimensions to attach to the metrics data sent to New Relic.
            - name: env
              value: prod
      postNewRelicEvent:            # Setings used by post event to New Relic API endpoint
        destinationAccount:
          - First NR account
          - Second NR account
        # Note that the URL path should *not* be included in the url setting below!
        # As of this writing the valid options are
        # https://insights-collector.eu01.nr-data.net
        # https://insights-collector.newrelic.com 
        url: https://insights-collector.eu01.nr-data.net/
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
