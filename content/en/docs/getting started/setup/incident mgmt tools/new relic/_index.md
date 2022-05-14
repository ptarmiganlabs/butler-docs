---
title: "New Relic"
linkTitle: "New Relic"
weight: 10
description: >
  New Relic is an enterprise grade observability solution in a SaaS package. 
  <br>They offer a uniform approach to dealing with metrics, logs and events - including a basic but working alert management feature.
  <br><br>
  The service is easy to get started with and has a generous free tier that works well for testing Butler alerts.
  <br>New Relic is a great choice as it handles both reload failure alerts for the Butler tool as well as operational metrics from [Butler SOS](https://butler-sos.ptarmiganlabs.com).
  <br><br>
  [newrelic.com](https://newrelic.com)
---

{{% alert title="Optional" color="primary" %}}
These settings are optional.

If you don't need the features offered by Butler's New Relic integration, just disable it and leave the default values in the config as they are.

Do note though that Butler expects the configuration properties below to exist in the config file, but will *ignore their values* if the related features are disabled.
{{% /alert %}}

## What's this?

Reload failure/abort events can be forwarded to New Relic, where they become incidents that are tracked, (maybe) escalated and eventually (hopefully!) closed.

<!-- TODO -->
Example [here](/docs/examples/newrelic/).

## How it works

New Relic exposes APIs through which log events can be sent to New Relic.  
These events are then evaluated using rules (that you create) within New Relic and when the right conditions are met New Relic alerts are created.

To use Butler with New Relic you must

- Create a New Relic account.  The free/trial account is quite generous and will easily get you started.
- Create an API key with *insert* permissions. Please see New Relic docs how to do this.
- Configure the Butler config file

More info about the New Relic event API that is used to send alerts can be found in [New Relic's API docs](https://docs.newrelic.com/docs/logs/log-api/introduction-log-api).

## Rate limiting

If a reload task is set to run very frequently but fails every time, this will result in a lot of events sent to New Relic. 
With associated alerts sent (if enabled in New Relic) via their alerting feature.

To handle this scenario Butler offers rate limiting for events sent to New Relic.

The `Butler.incidentTool.newRelic.reloadTaskFailure.rateLimit` setting controls how often (seconds) at most reload-failed events will be sent to New Relic.

A similar setting exists for aborted reloads.

## Data sent to New Relic

The following data is sent to New Relic as part of failed/aborted reload events:

- Any http headers defined in the Butler config file.
- Any static attributes/dimenions defined in the Butler config file.
- Butler version the event originated from. This is useful to have in New Relic as it makes it possible to easily show in a dashboard what Butler version is used and whether an update is possible/needed.
- Event related data
  - Event type. Either `qs_reloadTaskFailedEvent` or `qs_reloadTaskAbortedEvent`.
  - Timestamp when the event took place.
  - Host where the reload task was executing.
  - User directory and ID for user which was doing the reloade. This will be the Sense service account in most cases.
  - Reload task name.
  - Reload task ID.
  - App name.
  - App ID.
  - Timestamp for this event in Sense log files.
  - Log level for this event in Sense log files.
  - Sense execution ID for this event.
  - Description of the event, as found in the Sense log files.

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
  # Incident management tools integration
  # Used to trigger incidents in these tools when task reloads fail or are aborted
  incidentTool:
    newRelic:
      enable: true
      # There are different URLs depending on whther you have an EU or US region New Relic account.
      # The available URLs are listed here: https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/choose-your-data-center/
      #
      # Note that the URL path should *not* be included in the url setting below!
      # As of this writing the valid options are
      # https://insights-collector.eu01.nr-data.net
      # https://insights-collector.newrelic.com 
      url: https://insights-collector.eu01.nr-data.net
      reloadTaskFailure:
        enable: true
        rateLimit: 15             # Min seconds between events sent to New Relic for a given taskID. Defaults to 5 minutes.
        header:                   # Custom http headers
          - name: X-My-Header     # Example
            value: Header value   # Example
        attribute: 
          static:                 # Static attributes/dimensions to attach to events sent to New Relic.
            - name: service       # Example
              value: butler       # Example
            - name: environment   # Example
              value: prod         # Example
      reloadTaskAborted:
        enable: true
        rateLimit: 15             # Min seconds between events sent to New Relic for a given taskID. Defaults to 5 minutes.
        header:                   # Custom http headers
          - name: X-My-Header     # Example
            value: Header value   # Example
        attribute: 
          static:                 # Static attributes/dimensions to attach to events sent to New Relic.
            - name: service       # Example
              value: butler       # Example
            - name: environment   # Example
              value: prod         # Example

  ...
  ...
```
