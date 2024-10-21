---
title: "Alert template fields for failed/aborted reload tasks"
linkTitle: "Reload tasks"
weight: 10
description: >
  List of template fields available in Butler's reload failed/aborted alert messages. 
---

## Template fields

Butler uses the [Handlebars](https://handlebarsjs.com/) library for templating work.

Handlebars offers a lot of useful features (nested template fields, evaluation context, template comments) and it's recommended that you browse through at least the [language features](https://handlebarsjs.com/guide/#installation) section of their getting started guide to get a feeling for what's possible.

{{< notice warning >}}
Only some alert destinations support template files, namely

- Email
- Teams
- Slack

Please see the [Concepts](/docs/concepts) and [Getting started](/docs/getting-started/setup/reload-alerts) sections for more information about which alert types support templates.
{{< /notice >}}

If a template field is used for an alert type where that field is not supported, the field will simply be blank. No errors will occur, but it can still be tricky to debug if you're not aware of this.

The following template fields are available in alert messages.

Note that some fields are sometimes (often, even) empty, for example the script log for stopped messages.  
This is simply how Sense works - the template fields just forward the information retrieved from the Sense APIs.

| Failed<br>reload | Stopped<br>reload |Successful<br>reload | Field name | Description |
|:-----------:|:-----------:|:-----------:|-----------|---------|
| ✅ | ✅ | ✅ | hostName | Server on which a reload or other event took place. |
| ✅ | ✅ | ✅ | user | **Reload failures:** User ID for use doing the reload. Typically `sa_scheduler`.<br>**Reload stopped:** User ID of user stopping the reload.|
| ✅ | ✅ | ✅ | taskId | ID of reload task. |
| ✅ | ✅ | ✅ | taskName | Name of reload task. |
| ✅ | ✅ | ✅ | appId | ID of Sense app. |
| ✅ | ✅ | ✅ | appName | Name of app. |
| ✅ | ✅ | ✅ | appDescription | Description of app. |
| ✅ | ✅ | ✅ | appFileSize | Size of app file (on disk). |
| ✅ | ✅ | ✅ | appLastSuccessfulReload | Date of last successful reload. |
| ✅ | ✅ | ✅ | appLastModifiedDate | Date/time of last modification of app. |
| ✅ | ✅ | ✅ | appLastModifiedByUserName | User who last modified the app. |
| ✅ | ✅ | ✅ | appPublishTime | Date/time when app was published. |
| ✅ | ✅ | ✅ | appPublished | Is the app published? (true/false) |
| ✅ | ✅ | ✅ | appStreamName | Name of stream where app is published. |
| ✅ | ✅ | ✅ | appCustomProperties | Custom properties that are present on the app. |
| ✅ | ✅ | ✅ | appTags | Tags that are present on the app. |
| ✅ | ✅ | ✅ | appUrl | URL to the app. |
| ✅ | ✅ | ✅ | taskCustomProperties | Custom properties that are present on the reload task. |
| ✅ | ✅ | ✅ | taskTags | Tags that are present on the reload task. |
| ✅ | ✅ | ✅ | taskIsPartialReload | Does the reload task perform a partial reload? (true/false) |
| ✅ | ✅ | ✅ | taskMaxRetries | Maximum number of retries for the reload task. |
| ✅ | ✅ | ✅ | taskModifiedByUsername | User who last modified the reload task. |
| ✅ | ✅ | ✅ | taskModifiedDate | Date when the reload task was last modified. |
| ✅ | ✅ | ✅ | taskSessionTimeout | Session timeout for the reload task, i.e how long the reload task will run before it is cancelled. |
| ✅ | ✅ | ✅ | taskNextExecution | Next scheduled execution of the reload task. |
| ✅ | ✅ | ✅ | appOwnerName | Name of app owner (if this is available in the metadata provided by the Sense server) |
| ✅ | ✅ | ✅ | appOwnerUserDirectory | App owner user's user directory (if this is available in the metadata provided by the Sense server) |
| ✅ | ✅ | ✅ | appOwnerUserId | App owner user's user id (if this is available in the metadata provided by the Sense server) |
| ✅ | ✅ | ✅ | appOwnerEmail | App owner email (if this is available in the metadata provided by the Sense server) |
| ✅ | ✅ | ✅ | logTimeStamp | Timestamp as recorded in the Sense logs |
| ✅ | ✅ | ✅ | logLevel | Log level of the Sense log file entry causing the alert |
| ✅ | ✅ | ✅ | logMessage | Log message from the Sense log files |
| ✅ | ✅ | ✅ | executingNodeName | Name of the server where the reload took place |
| ✅ | ✅ | ✅ | executionDuration.hours | executionDuration is a JSON object.<br>Duration of reload (hours part) |
| ✅ | ✅ | ✅ | executionDuration.minutes | Duration of reload (minutes part) |
| ✅ | ✅ | ✅ | executionDuration.seconds | Duration of reload (seconds part) |
| ✅ | ✅ | ✅ | executionStartTime.startTimeUTC | JSON object.<br>UTC timestamp for reload start |
| ✅ | ✅ | ✅ | executionStartTime.startTimeLocal1 | Reload start timestamp, format 1 |
| ✅ | ✅ | ✅ | executionStartTime.startTimeLocal2 | Reload start timestamp, format 2 |
| ✅ | ✅ | ✅ | executionStartTime.startTimeLocal3 | Reload start timestamp, format 3 |
| ✅ | ✅ | ✅ | executionStartTime.startTimeLocal4 | Reload start timestamp, format 4 |
| ✅ | ✅ | ✅ | executionStartTime.startTimeLocal5 | Reload start timestamp, format 5 |
| ✅ | ✅ | ✅ | executionStopTime.stopTimeUTC | JSON object.<br>UTC timestamp for reload end |
| ✅ | ✅ | ✅ | executionStopTime.stopTimeLocal1 | Reload end timestamp, format 1 |
| ✅ | ✅ | ✅ | executionStopTime.stopTimeLocal2 | Reload end timestamp, format 2 |
| ✅ | ✅ | ✅ | executionStopTime.stopTimeLocal3 | Reload end timestamp, format 3 |
| ✅ | ✅ | ✅ | executionStopTime.stopTimeLocal4 | Reload end timestamp, format 4 |
| ✅ | ✅ | ✅ | executionStopTime.stopTimeLocal5 | Reload end timestamp, format 5 |
| ✅ | ✅ | ✅ | executionStatusNum | Final reload task status code |
| ✅ | ✅ | ✅ | executionStatusText | Final reload task status message |
| ✅ | ✅ | ✅ | executionDetails[].timestampUTC | executionDetails is an array of status updates for the reload task, similar to the one found in the QMC's task view.<br>UTC timestamp of the task status |
| ✅ | ✅ | ✅ | executionDetails[].timestampLocal1 | Task status timestamp, format 1 |
| ✅ | ✅ | ✅ | executionDetails[].timestampLocal2 | Task status timestamp, format 2 |
| ✅ | ✅ | ✅ | executionDetails[].timestampLocal3 | Task status timestamp, format 3 |
| ✅ | ✅ | ✅ | executionDetails[].timestampLocal4 | Task status timestamp, format 4 |
| ✅ | ✅ | ✅ | executionDetails[].timestampLocal5 | Task status timestamp, format 5 |
| ✅ | ✅ | ✅ | executionDetails[].detailsType | Task status timestamp, format 1 |
| ✅ | ✅ | ✅ | executionDetails[].message | Task status message |
| ✅ | ✅ | ✅ | scriptLogSize | Size of the reload's script log (characters) |
| ✅ | ✅ | ✅ | scriptLogSizeRows | Size of the reload's script log (rows) |
| ✅ | ✅ | ✅ | scriptLogSizeCharacters | Size of the reload's script log (characters) |
| ✅ | ✅ | ✅ | scriptLogHeadCount | Number of lines extracted from the start of the script log |
| ✅ | ✅ | ✅ | scriptLogTailCount | The first y lines from the reload's script log |
| ✅ | ✅ | ✅ | scriptLogHead | The first x lines from the reload's script log |
| ✅ | ✅ | ✅ | scriptLogTail | Number of lines extracted from the end of the script log |
| ✅ | ✅ | ✅ | qliksSenseQMC | Links to QMC, as defined in main config file |
| ✅ | ✅ | ✅ | qliksSenseHub | Links to Hub, as defined in main config file |
| ✅ | ✅ | ✅ | genericUrls | Links to other systems, as defined in main config file |
