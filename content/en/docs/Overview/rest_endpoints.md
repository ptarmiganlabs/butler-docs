---
title: "REST endpoint"
linkTitle: "REST endpoints"
weight: 1
description: >
  Butler offers a REST API through which various tasks (starting Sense reloads etc) can be achieved.
---

<!-- {{% pageinfo %}}
{{% /pageinfo %}} -->

# Available endpoints

The following REST endpoints are available:

Endpoint | Description
-------- | -----------
`/v2/activeUserCount` | # of users with open Sense sessions
`/v2/activeUsers` | Usernames of users with open Sense sessions
`/v2/butlerPing` | Checks if Butler is running
`/v2/createDir` | Create directories (anywhere in the file system) on the server where Butler is running
`/v2/createDirQVD` | Create directories (relative to a hard coded path) on the server where Butler is running
<strike>`/v2/getDiskSpace`<strike> | <strike>Check available disk space</strike><br>Removed in v2.1 due to difficulties getting consistent behaviour across Windows, Linux and Mac OS
`/v2/mqttPublishMessage` | Publish message to MQTT topic
`/v2/senseAppDump` | Retrieves metadata (load script etc) about a Sense app
`/v2/senseListApps` | List name and GUID of all Sense apps in the system
`/v2/senseStartTask` | Start a Sense task. Can for example be used by upstream data providers to trigger reloads of Sense apps
`/v2/slackPostMessage` | Post to Slack from Sense load scripts

Full documentation is available [here](/docs/reference/rest).

