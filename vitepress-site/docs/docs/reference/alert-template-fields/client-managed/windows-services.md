# Alert Template Fields for Windows Services Events

List of template fields available in Butler's Windows services alert messages.

## Email, Slack and Teams

Butler uses the [Handlebars](https://handlebarsjs.com/) library for templating work.  
This gives a lot of flexibility in how alert messages are formatted for the destination types that support template fields.

Handlebars offers a lot of useful features (nested template fields, evaluation context, template comments) and it's recommended that you browse through at least the [language features](https://handlebarsjs.com/guide/#installation) section of their getting started guide to get a feeling for what's possible.

::: warning
Not all alert destinations (MQTT, outgoing webhooks etc) support template fields.

Please see the [Getting started](/docs/getting-started/setup/reload-alerts) sections for more information on how to set up alerts for each destination.
:::

If a template field is used for an alert type where that field is not supported, the field will simply be blank. No errors will occur.

The following alert destinations support template fields:

- [Email](/docs/getting-started/setup/windows-service-monitor/email/)
- [Slack](/docs/getting-started/setup/windows-service-monitor/slack/)
- [Teams](/docs/getting-started/setup/windows-service-monitor/teams/)

The following template fields are available in alert messages.

Note that some fields are usually (always?) empty, for example the script log for stopped messages.  
This is simply how Sense works - the template fields just forward the information retrieved from the Sense APIs.

| Email | Slack | Teams | Field name            | Description                                                                                                                                                                                                       |
| ----- | ----- | ----- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅    | ✅    | ✅    | `host`                | The hostname of the server where the service is running                                                                                                                                                           |
| ✅    | ✅    | ✅    | `serviceStatus`       | The status of the service, e.g. `RUNNING` or `STOPPED`                                                                                                                                                            |
| ✅    | ✅    | ✅    | `servicePrevStatus`   | The previous status of the service, e.g. `RUNNING` or `STOPPED`                                                                                                                                                   |
| ✅    | ✅    | ✅    | `serviceName`         | The name of the service as defined in Windows                                                                                                                                                                     |
| ✅    | ✅    | ✅    | `serviceDisplayName`  | The display name of the service as defined in Windows. Can sometimes be a bit more human readable than the serviceName.                                                                                           |
| ✅    | ✅    | ✅    | `serviceFriendlyName` | The display name of the service as defined in the Butler config file. Used to give the service a good name when both serviceName and serviceDisplayName are unsuitable for use in for example Grafana dashboards. |
| ✅    | ✅    | ✅    | `serviceStartType`    | The startup mode of the service, e.g. `Automatic` or `Manual`                                                                                                                                                     |
| ✅    | ✅    | ✅    | `serviceExePath`      | The path to the executable of the service                                                                                                                                                                         |

## InfluxDB

Window service data will be stored in the InfluxDB database specified in the config file `Butler.influxdb.dbName` setting.

The latest status of each service will be stored in the `butler_windows_services` measurement _every time_ Butler checks the status of the service, i.e. not only when the service changes status.

### Fields/metrics

The following metrics will be stored in a measurement named `win_service_state`, for each Windows service:

| Field name        | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| state_num         | A numeric representation of the Windows service's current state. |
| state_text        | The Windows service's current state (textual representation).    |
| startup_mode_num  | A numeric representation of the Windows service's startup mode.  |
| startup_mode_text | The Windows service's startup mode (textual representation).     |

Mapping of `state_num` to `state_text`:

| state_num | state_text       |
| --------- | ---------------- |
| 1         | STOPPED          |
| 2         | START_PENDING    |
| 3         | STOP_PENDING     |
| 4         | RUNNING          |
| 5         | CONTINUE_PENDING |
| 6         | PAUSE_PENDING    |
| 7         | PAUSED           |

Mapping of `startup_mode_num` to `startup_mode_text`:

| startup_mode_num | startup_mode_text         |
| ---------------- | ------------------------- |
| 0                | Automatic                 |
| 1                | Automatic (delayed start) |
| 2                | Manual                    |
| 3                | Disabled                  |

### Tags

The following tags will be attached to all Windows service data stored in InfluxDB:

| Tag name              | Description                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| butler_instance       | The value in `Butler.influxDb.instanceTag`. Can be used to differentiate several Butler instances running in parallel.                                     |
| host                  | Host name where the Windows service is running. Comes from `Butler.serviceMonitor.monitor.&lt;host&gt;`.                                                   |
| service_name          | The name of the Windows service, as defined in Windows.                                                                                                    |
| service_display_name  | The display name of the Windows service, as defined in Windows.                                                                                            |
| service_friendly_name | The friendly name of the Windows service, as defined in the Butler config file `Butler.serviceMonitor.monitor.&lt;host&gt;.services.&lt;friendlyName&gt;`. |

## New Relic

Butler will create New Relic events and/or log entries when a monitored Windows service changes state, for example from `RUNNING` to `STOPPED`.

### Events

Events sent to New Relic will have these attributes attached:

| Attribute name            | Description                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| eventType                 | Always set to `qs_serviceStateEvent`                                                                                    |
| butler_serviceHost        | The host name where the Windows service is running. Comes from `Butler.serviceMonitor.monitor.&lt;host&gt;`.            |
| butler_serviceName        | The name of the Windows service, as defined in Windows.                                                                 |
| butler_serviceDisplayName | The display name of the Windows service, as defined in Windows.                                                         |
| butler_serviceStatus      | The status of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                         |
| ...                       | Any static and dynamic attributes defined in `Butler.incidentTool.newRelic.serviceMonitor.destination.event.attribute`. |
| ...                       | Any static attributes defined in `Butler.incidentTool.newRelic.serviceMonitor.sharedSettings.attribute.static`.         |

### Log entries

Log entries sent to New Relic will have these attributes attached:

| Attribute name            | Description                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| logType                   | Always set to `qs_serviceStateLog`                                                                                    |
| butler_serviceHost        | The host name where the Windows service is running. Comes from `Butler.serviceMonitor.monitor.&lt;host&gt;`.          |
| butler_serviceName        | The name of the Windows service, as defined in Windows.                                                               |
| butler_serviceDisplayName | The display name of the Windows service, as defined in Windows.                                                       |
| butler_serviceStatus      | The status of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                       |
| ...                       | Any static and dynamic attributes defined in `Butler.incidentTool.newRelic.serviceMonitor.destination.log.attribute`. |
| ...                       | Any static attributes defined in `Butler.incidentTool.newRelic.serviceMonitor.sharedSettings.attribute.static`.       |

The log message will be one of the following:

- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is RUNNING."
- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is STOPPED."
- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is in state START_PENDING."
- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is in state STOP_PENDING."
- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is in state CONTINUE_PENDING."
- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is in state PAUSE_PENDING."
- "Windows service &lt;serviceDisplayName&gt; on host &lt;serviceHost&gt; is in state PAUSED."

## MQTT

Similar to how InfluxDB works, Butler will send an MQTT message to the topic specified in `Butler.mqttConfig.serviceStatusTopic` every time it checks the status of a Windows service, i.e. not only when the service changes status.

Butler will ALSO send an MQTT message to the topics specified in `Butler.mqttConfig.serviceRunningTopic` and `Butler.mqttConfig.serviceStoppedTopic` when a Windows service is stopped or started.

Message payload for continuously sent messages is a JSON object with these properties:

| Property name       | Description                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host                | The host name where the Windows service is running. Comes from `Butler.serviceMonitor.monitor.&lt;host&gt;`.                                               |
| serviceName         | The name of the Windows service, as defined in Windows.                                                                                                    |
| serviceFriendlyName | The friendly name of the Windows service, as defined in the Butler config file `Butler.serviceMonitor.monitor.&lt;host&gt;.services.&lt;friendlyName&gt;`. |
| serviceStatus       | The status of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                                                            |
| serviceDetails      | The details of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                                                           |

Message payload for start/stop messages is a JSON object with these properties:

| Property name       | Description                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host                | The host name where the Windows service is running. Comes from `Butler.serviceMonitor.monitor.&lt;host&gt;`.                                               |
| serviceName         | The name of the Windows service, as defined in Windows.                                                                                                    |
| serviceFriendlyName | The friendly name of the Windows service, as defined in the Butler config file `Butler.serviceMonitor.monitor.&lt;host&gt;.services.&lt;friendlyName&gt;`. |
| serviceStatus       | The status of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                                                            |
| serviceDetails      | The details of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                                                           |
| prevState           | The previous state of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                                                    |
| currState           | The current state of the Windows service, e.g. `RUNNING` or `STOPPED`.                                                                                     |
| stateChanged        | `true` if the Windows service changed state, `false` if not.                                                                                               |

## Outbound webhooks

Outbound webhooks (=http calls) are sent when a Windows service changes state, for example from `RUNNING` to `STOPPED`.

The payload for PUT and POST http calls is sent in the message body as a JSON object with these properties:

| Property name      | Description                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| event              | Always set to `Windows service monitor`                                                                      |
| host               | The host name where the Windows service is running. Comes from `Butler.serviceMonitor.monitor.&lt;host&gt;`. |
| serviceStatus      | The status of the Windows service, e.g. `RUNNING` or `STOPPED`.                                              |
| serviceName        | The name of the Windows service, as defined in Windows.                                                      |
| serviceDisplayName | The display name of the Windows service, as defined in Windows.                                              |
| serviceStartType   | The startup mode of the service, e.g. `Automatic` or `Manual`                                                |
| prevState          | The previous state of the Windows service, e.g. `RUNNING` or `STOPPED`.                                      |
| currState          | The current state of the Windows service, e.g. `RUNNING` or `STOPPED`.                                       |
| stateChanged       | `true` if the Windows service changed state, `false` if not.                                                 |

The payload for GET http calls is sent as query parameters with the same properties as above, but with the property names being all lowercase letters.

A typical GET webhook URL would look like this:

```
https://mywebhookserver.com?event=Windows service monitor&host=MyHost&servicestatus=RUNNING&servicename=MyService&servicedisplayname=MyServiceDisplayName&servicestarttype=Automatic&prevstate=RUNNING&currstate=STOPPED&statechanged=true
```
