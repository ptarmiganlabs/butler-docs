---
title: Telemetry
linkTitle: Telemetry
weight: 70
description: >
  What's telemetry and why is it important?
---

{{% pageinfo %}}
Sharing telemetry data from Butler is optional.  
You can use all Butler features without sharing telemetry data.

That said, if you find the Butler tool useful you are **strongly encouraged** to leave Butler's telemetry feature turned on.  
Having access to this data greatly helps the Butler developers when they design new features, fix bugs etc.

The Butler developers care about you - sharing telemetry data is your way of showing you care about them.

Sharing is caring!

{{% /pageinfo %}}

## What's telemetry

From [Wikipedia](https://en.wikipedia.org/wiki/Telemetry):

_Telemetry is the in situ collection of measurements or other data at remote points and their automatic transmission to receiving equipment (telecommunication) for monitoring._

In the context of software tools (including Butler) telemetry is often used to describe the process of sending information about the tool itself to some monitoring system.

## Why telemetry in Butler

This is a very, very good question.

For many years there was no telemetry at all in Butler.

Development of new features were driven mainly by what features were needed at the time.  
Or the fact that Qlik released some new feature in Sense and Butler was a way to test that new feature from the perspective of the Sense APIs.

That's all good but today Butler is a rather significant tool with features spanning quite different areas (alerting, task scheduling, key-value store and more).

This multitude of features is also one of the core reasons for adding telemetry to Butler:

{{% pageinfo color="info" %}}

- Which Butler APIs and features are actually used out there?
- Which operating systems, Node.js versions and hardware platforms is Butler running on?
  {{% /pageinfo %}}

Without this information the Butler developers will keep working in the dark, not really knowing where to focus their efforts.

On the other hand - **with** access to telemetry data a lot of possibilities open up for the Butler developers:

- If telemetry shows that no one uses a particular feature, maybe that feature should be scheduled for deprecation?
- The opposite of the previous: If lots of users use a specific Butler feature, then that feature is a candidate for future focus and development.
- Telemetry will show if lots of users run Butler on old Node.js versions. Knowing this its possible to set a migration schedule for what Node.js versions are supported - avoiding hard errors when some old Node.js version is no longer supported by Butler.
- Same thing for understanding what operating systems Butler runs (and should be supported) on.

### Configuring Butler's telemetry

Instructions [here](/docs/getting-started/setup/telemetry/).

## The details

{{% alert title="What's shared" color="primary" %}}
The telemetry data includes the following:

1. **Information about what API endpoints are enabled in the Butler config file.**  
   _Why: This tells the Butler developers which features are used and which aren't. This is critical information when it comes to planning where to focus future development efforts._
2. **Information about what features are enabled and which are disabled.**  
   _Why: Same as above. Knowing which features are used (and are thus important) allows the Butler developers to better plan future work._
3. **Information about Butler's execution environment** (operating system, hardware architecture, Node.js version etc).  
    _Why: Ideally the Butler developers want to use as modern versions of Node.js as possible. But if telemetry shows that lots os Butler instances use old Node.js versions or run on some (yet) untested/unverified Linux version - then maybe those older Node.js/Linux versions must be supported for yet some time._
   {{% /alert %}}

{{% alert title="What's not shared" color="warning" %}}
The telemetry data will never include:

1. Data that can identify your Sense environment or the server on which Butler runs. This includes IP/MAC addresses or other network information, server names, Docker container metadata or similar.
2. Any actual data sent via Butler APIs.
3. Qlik Sense or other certificates in any shape or form.
   {{% /alert %}}

### Where is telemetry data sent

The telemetry data is sent to an Azure server and then stored in a database operated by [Ptarmigan Labs](https://ptarmiganlabs.com) (which is the company sponsoring the Butler project).

### Deleting telemetry data

Even though no-one (not even Ptarmigan Labs who runs the telemetry database!) has any way of ever connecting the data sent by _your_ Butler instance to _you_ (it's all anonymized, remember?), there can be cases where telemetry data must be deleted.

The [legal page](/docs/legal-stuff/#telemetry-data) has more information about this.

### Field level description of telemetry data

A telemetry message from Butler contains the information below.

```json
{
  "ts": "2021-04-23T23:11:51.431Z",
  "data": {
    service: "butler",
    serviceVersion: "7.2.1",
    system: {
      id: "3de76798c85894844ac20100cf2142c9a58cc90d7e9dd31a22c94b68048c3ee5",
      arch: "x64",
      platform: "darwin",
      release: "12.3.1",
      distro: "macOS",
      codename: "macOS Monterey",
      virtual: false,
      hypervisor: undefined,
      nodeVersion: "v16.4.0",
    },
    enabledFeatures: {
      api: {
        apiListEnbledEndpoints: true,
        base62ToBase16: true,
        base16ToBase62: true,
        butlerping: true,
        createDir: true,
        createDirQVD: true,
        fileDelete: true,
        fileMove: true,
        fileCopy: true,
        keyValueStore: true,
        mqttPublishMessage: true,
        scheduler: {
          createNewSchedule: true,
          getSchedule: true,
          getScheduleStatusAll: true,
          updateSchedule: true,
          deleteSchedule: true,
          startSchedule: true,
          stopSchedule: true,
        },
        senseAppReload: true,
        senseAppDump: true,
        senseListApps: true,
        senseStartTask: true,
        slackPostMessage: true,
      },
      feature: {
        heartbeat: false,
        dockerHealthCheck: true,
        uptimeMonitor: true,
        uptimeMonitor_storeInInfluxdb: true,
        uptimeMonitor_storeInNewRelic: true,
        teamsNotification: true,
        teamsNotification_reloadTaskFailure: true,
        teamsNotification_reloadTaskAborted: true,
        slackNotification: true,
        slackNotification_reloadTaskFailure: true,
        slackNotification_reloadTaskAborted: true,
        emailNotification: true,
        emailNotification_reloadTaskFailure: true,
        emailNotification_reloadTaskAborted: true,
        webhookNotification: false,
        webhookNotification_reloadTaskFailure: false,
        webhookNotification_reloadTaskAborted: false,
        signl4Notification_reloadTaskFailure: true,
        signl4Notification_reloadTaskAborted: true,
        newRelicNotification_reloadTaskFailure: true,
        newRelicNotification_reloadTaskAborted: true,
        scheduler: true,
        mqtt: true,
        userActivityLogging: false,
      },
    },
  }
}
```

#### Creating an anonymous ID field

The `id` field deserves a bit more explanation.  

It's purpose is to uniquely identify the Butler instance - nothing else.  
If Butler is stopped and started agagin the same ID should be generated.

Some sensitive information is used to create the ID, but as the ID is anonymized before sent as part of the telemetry data, *no sensitive information leaves your servers*.  

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
   Then again - this is cryptografy and things change.  
   But if you trust the certificates securing Sense itself, then the ID anonymization in Butler should be ok too.
3. The result is a string that uniquely identifies the Butler instance at hand, without giving away any sensitive data about the system where Butler is running.

See below for an example of what the `id` field looks like.  
The `id` field is shown during Butler startup.

## Telemetry FAQ

1. **_What data is included in the telemetry messages?_**  
   See above for details.  
   In general the telemetry includes information about which Butler API endpoints and features are enabled vs disabled.  
   A unique, anonymized ID is included too, it's unique to each Butler instance and is used soley to distinguish between different Butler instances.  
   Finally some information about Butler's execution environment is included. Things like operating system, Node.js version used etc.

2. **_Can my Sense environment be identified via telemetry data?_**  
   Short answer: No.  
   Longer answer: No information about your Sense environment is sent as part of telemetry. No IP addresses or server names, no IDs of Sense apps/tasks/etc, no information about what actual data passed through Butler's APIs, or any other data that can be linked to your Sense environment is included in the telemetry data.
