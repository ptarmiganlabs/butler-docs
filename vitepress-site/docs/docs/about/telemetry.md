# Telemetry

What's telemetry and why is it important?

::: info
Sharing telemetry data from Butler is optional.  
You can use all Butler features without sharing telemetry data.

That said, if you find the Butler tool useful you are **strongly encouraged** to leave Butler's telemetry feature turned on.  
Having access to this data greatly helps the Butler developers when they design new features, fix bugs etc.

The Butler developers care about you - sharing telemetry data is your way of showing you care about them.

Sharing is caring!
:::

## What's telemetry

From [Wikipedia](https://en.wikipedia.org/wiki/Telemetry):

_Telemetry is the in situ collection of measurements or other data at remote points and their automatic transmission to receiving equipment (telecommunication) for monitoring._

In the context of software tools (including Butler) telemetry is often used to describe the process of sending information about the tool itself to some monitoring system.

## Why telemetry in Butler

That is a very good question.

For many years there was no telemetry at all in Butler.

Development of new features were driven mainly by what features were needed at the time.  
Or the fact that Qlik released some new feature in Sense and Butler was a way to test that new feature from the perspective of the Sense APIs.

That's all good but today Butler is a rather significant tool with features spanning quite different areas (alerting, task scheduling, key-value store and more).

This multitude of features is also one of the core reasons for adding telemetry to Butler:

::: tip Key Questions
- Which Butler APIs and features are actually used out there?
- Which operating systems, Node.js versions and hardware platforms is Butler running on?
:::

Without this information the Butler developers will keep working in the dark, not really knowing where to focus their efforts.

On the other hand - **with** access to telemetry data a lot of possibilities open up for the Butler developers:

- If telemetry shows that no one uses a particular feature, maybe that feature should be scheduled for deprecation?
- The opposite of the previous: If lots of users use a specific Butler feature, then that feature is a candidate for future focus and development.
- Telemetry will show if lots of users run Butler on old Node.js versions. Knowing this its possible to set a migration schedule for what Node.js versions are supported - avoiding hard errors when some old Node.js version is no longer supported by Butler.
- Same thing for understanding what operating systems Butler runs (and should be supported) on.

### Configuring Butler's telemetry

Instructions [here](/docs/getting-started/setup/telemetry/).

## The details

::: details What's shared
The telemetry data includes the following:

1. **Information about what API endpoints are enabled in the Butler config file.**  
   _Why: This tells the Butler developers which features are used and which aren't. This is critical information when it comes to planning where to focus future development efforts._
2. **Information about what features are enabled and which are disabled.**  
   _Why: Same as above. Knowing which features are used (and are thus important) allows the Butler developers to better plan future work._
3. **Information about Butler's execution environment** (operating system, hardware architecture, Node.js version etc).  
    _Why: Ideally the Butler developers want to use as modern versions of Node.js as possible. But if telemetry shows that lots os Butler instances use old Node.js versions or run on some (yet) untested/unverified Linux version - then maybe those older Node.js/Linux versions must be supported for yet some time._
:::

::: warning What's not shared
The telemetry data will never include:

1. Data that can identify your Sense environment or the server on which Butler runs. This includes IP/MAC addresses or other network information, server names, Docker container metadata or similar.
2. Any actual data sent via Butler APIs.
3. Qlik Sense or other certificates or credentials in any shape or form.
:::

### Where is telemetry data sent

The telemetry data is sent to the [PostHog](https://posthog.com) service, using their database in the European Union.

### Deleting telemetry data

Even though no-one (not even the Butler developers or Ptarmigan Labs who manage the telemetry database!) has any way of ever connecting the data sent by _your_ Butler instance to _you_ (it's all anonymized, remember?), there can be cases where telemetry data must be deleted.

The [legal page](/docs/legal-stuff/#telemetry-data) has more information about this.

### Field level description of telemetry data

A telemetry message from Butler (with all features enabled!) contains the information below as of Butler 13.0.

```json
{
  "service": "butler",
  "serviceVersion": "12.4.2",
  "system_id": "d7864884fcd5534377febd1dad8a3db87ba0a3e63d365fa9a587775abcc781ac",
  "system_isRunningInDocker": false,
  "system_virtual": true,
  "system_arch": "x64",
  "system_nodeVersion": "v22.9.0",
  "system_platform": "linux",
  "system_distro": "Ubuntu",
  "system_codename": "jammy",
  "system_release": "22.04.4 LTS",
  "feature_apiKeyValueStore": true,
  "feature_teamsNotificationReloadTaskFailure": true,
  "feature_serviceMonitor": true,
  "feature_apiSchedulerGet": true,
  "feature_apiSchedulerUpdate": true,
  "feature_apiCreateDir": true,
  "feature_influxDbReloadTaskSuccess": true,
  "feature_newRelicNotificationReloadTaskFailure": true,
  "feature_uptimeMonitoStoreInNewRelic": false,
  "feature_udpServer": true,
  "feature_restServer": true,
  "feature_apiButlerPing": true,
  "feature_mqtt": true,
  "feature_apiFileCopy": true,
  "feature_apiSchedulerDelete": true,
  "feature_apiListEnabledEndpoints": true,
  "feature_dockerHealthCheck": true,
  "feature_apiSchedulerStart": true,
  "feature_signl4NotificationReloadTaskFailure": true,
  "feature_apiBase62ToBase16": true,
  "feature_apiSenseAppDump": true,
  "feature_slackNotificationReloadTaskAborted": true,
  "feature_emailNotificationReloadTaskFailure": true,
  "feature_webhookNotification": true,
  "feature_apiMqttPublishMessage": true,
  "feature_newRelicNotificationReloadTaskAborted": true,
  "feature_apiSenseStartTask": true,
  "feature_scriptLogQsCloudAppReloadFailure": true,
  "feature_apiCreateDirQvd": true,
  "feature_apiBase16ToBase62": true,
  "feature_apiSenseListApps": true,
  "feature_qliksensecloud": true,
  "feature_apiNewRelicPostEvent": true,
  "feature_apiFileDelete": true,
  "feature_scriptLogQseowReloadTaskFailure": true,
  "feature_webhookNotificationReloadTaskFailure": true,
  "feature_keyValueStore": true,
  "feature_influxDbReloadTaskFailure": true,
  "feature_uptimeMonitoStoreInInfluxdb": true,
  "feature_qliksensecloudReloadAppFailureSlackNotification": true,
  "feature_slackNotificationReloadTaskFailure": true,
  "feature_qliksensecloudReloadAppFailureEmailNotification": true,
  "feature_apiSchedulerGetStatusAll": true,
  "feature_teamsNotificationReloadTaskAborted": true,
  "feature_apiSlackPostMessage": true,
  "feature_emailNotificationReloadTaskAborted": true,
  "feature_webhookNotificationReloadTaskAborted": true,
  "feature_webhookNotificationServiceMonitor": true,
  "feature_apiFileMove": true,
  "feature_heartbeat": true,
  "feature_signl4NotificationReloadTaskAborted": true,
  "feature_scheduler": true,
  "feature_apiNewRelicPostMetric": true,
  "feature_apiSchedulerCreateNew": true,
  "feature_apiSchedulerStop": true,
  "feature_qliksensecloudReloadAppFailureTeamsNotification": true,
  "feature_uptimeMonitor": true,
  "feature_apiSenseAppReload": true,
  "telemetry_json": {
    "enabledFeatures": {
      "feature": {
        "apiEnabledEndpoints": {
          "apiListEnabledEndpoints": true,
          "base16ToBase62": true,
          "base62ToBase16": true,
          "butlerping": true,
          "createDir": true,
          "createDirQVD": true,
          "fileCopy": true,
          "fileDelete": true,
          "fileMove": true,
          "keyValueStore": true,
          "mqttPublishMessage": true,
          "newRelic": {
            "postNewRelicEvent": true,
            "postNewRelicMetric": true
          },
          "scheduler": {
            "createNewSchedule": true,
            "deleteSchedule": true,
            "getSchedule": true,
            "getScheduleStatusAll": true,
            "startSchedule": true,
            "stopSchedule": true,
            "updateSchedule": true
          },
          "senseAppDump": true,
          "senseAppReload": true,
          "senseListApps": true,
          "senseStartTask": true,
          "slackPostMessage": true
        },
        "dockerHealthCheck": true,
        "emailNotificationReloadTaskAborted": true,
        "emailNotificationReloadTaskFailure": true,
        "heartbeat": true,
        "influxDbReloadTaskFailure": true,
        "influxDbReloadTaskSuccess": true,
        "keyValueStore": true,
        "mqtt": true,
        "newRelicNotificationReloadTaskAborted": true,
        "newRelicNotificationReloadTaskFailure": true,
        "qlikSenseCloud": {
          "enabled": true,
          "reloadAppFailureEmailNotification": true,
          "reloadAppFailureSlackNotification": true,
          "reloadAppFailureTeamsNotification": true
        },
        "restServer": true,
        "scheduler": true,
        "scriptLogStoreOnDisk": {
          "qsCloud": {
            "appReloadFailure": true
          },
          "qseow": {
            "reloadTaskFailure": true
          }
        },
        "serviceMonitor": true,
        "signl4NotificationReloadTaskAborted": true,
        "signl4NotificationReloadTaskFailure": true,
        "slackNotificationReloadTaskAborted": true,
        "slackNotificationReloadTaskFailure": true,
        "teamsNotificationReloadTaskAborted": true,
        "teamsNotificationReloadTaskFailure": true,
        "udpServer": true,
        "uptimeMonitor": true,
        "uptimeMonitor_storeInInfluxdb": true,
        "uptimeMonitor_storeInNewRelic": false,
        "webhookNotificationReloadTaskAborted": true,
        "webhookNotificationReloadTaskFailure": true,
        "webhookNotificationServiceMonitor": true
      }
    },
    "system": {
      "arch": "x64",
      "codename": "jammy",
      "distro": "Ubuntu",
      "id": "d7864884fcd5534377febd1dad8a3db87ba0a3e63d365fa9a587775abcc781ac",
      "isRunningInDocker": false,
      "nodeVersion": "v22.9.0",
      "platform": "linux",
      "release": "22.04.4 LTS",
      "virtual": true
    }
  }
}
```

#### Creating an anonymous ID field

The `id` field deserves a bit more explanation.

It's purpose is to uniquely identify the Butler instance - nothing else.  
If Butler is stopped and started again the same ID will be used.

Some sensitive information is used to create the ID, but as the ID is anonymized using a one-way hash function before sent as part of the telemetry data, _no sensitive information leaves your servers_.

The ID field is created as follows:

1. Combine the following information to a single string
   1. MAC address of default network interface
   2. IPv4 address of default network interface
   3. IP or FQDN of Sense server where repository service is running
   4. System unique ID as reported by the OS. Not all OSs support this though, which is why field 1-3 above are also needed to get a unique ID.
2. Run the created string through a [one-way hashing/message digest function](https://en.wikipedia.org/wiki/Cryptographic_hash_function).
   Butler uses Node.js' own [Crypto](https://nodejs.org/docs/latest-v15.x/api/crypto.html) library to create a [SHA-256](https://en.wikipedia.org/wiki/SHA-2) hash, using the default network interface's MAC address as salt.  
   Security is increased due to the fact that the salt never leaves the server where Butler is running.

   The bottom line is that it's impossible to reverse the process and get your the IP, host name etc used in step 1 above.  
   Then again - this is cryptography and things change.  
   But if you trust the certificates securing Sense itself, then the ID anonymization used by Butler should be ok too.

3. The result is a string that uniquely identifies the Butler instance at hand, without giving away any sensitive data about the system where Butler is running.

See below for an example of what the `id` field looks like.  
The `id` field is shown during Butler startup as "Instance ID".

```
2023-12-08T13:15:21.936Z info: --------------------------------------
2023-12-08T13:15:21.937Z info: Starting Butler
2023-12-08T13:15:21.937Z info: Log level      : info
2023-12-08T13:15:21.937Z info: App version    : 9.1.1
2023-12-08T13:15:21.937Z info: Instance ID    : 3de76798c85894844ac20100cf2142c9a58cc90d7e9dd31a22c94b68048c3ee5
2023-12-08T13:15:21.937Z info:
2023-12-08T13:15:21.937Z info: Node version   : v18.5.0
2023-12-08T13:15:21.937Z info: Architecture   : x64
2023-12-08T13:15:21.937Z info: Platform       : darwin
2023-12-08T13:15:21.937Z info: Release        : 14.1
2023-12-08T13:15:21.938Z info: Distro         : macOS
2023-12-08T13:15:21.938Z info: Codename       : macOS Sonoma
2023-12-08T13:15:21.938Z info: Virtual        : false
2023-12-08T13:15:21.938Z info: Processors     : 1
2023-12-08T13:15:21.938Z info: Physical cores : 8
2023-12-08T13:15:21.938Z info: Cores          : 16
2023-12-08T13:15:21.938Z info: Docker arch.   : undefined
2023-12-08T13:15:21.938Z info: Total memory   : 68719476736
2023-12-08T13:15:21.938Z info:
2023-12-08T13:15:21.938Z info: Config file    : /Users/goran/tools/butler/production.yaml
2023-12-08T13:15:21.938Z info: API rate limit : 100
2023-12-08T13:15:21.938Z info: --------------------------------------
```

## Telemetry FAQ

1. **_What data is included in the telemetry messages?_**  
   See above for details.  
   In general the telemetry includes information about which Butler API endpoints and features are enabled vs disabled.  
   A unique, anonymized ID is included too, it's unique to each Butler instance and is used soley to distinguish between different Butler instances.  
   Finally some information about Butler's execution environment is included. Things like operating system, Node.js version used etc.

2. **_Can my Sense environment be identified via telemetry data?_**  
   Short answer: No.  
   Longer answer: No information about your Sense environment is sent as part of telemetry. No IP addresses or server names, no IDs of Sense apps/tasks/etc, no information about what actual data passed through Butler's APIs, or any other data that can be linked to your Sense environment is included in the telemetry data.