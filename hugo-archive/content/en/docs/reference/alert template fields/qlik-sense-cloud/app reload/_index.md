---
title: "Alert template fields for failed app reloads"
linkTitle: "Failed app reloads"
weight: 10
description: >
  List of template fields available in Butler's failed app reload alert messages. 
---

## Template fields

Butler uses the [Handlebars](https://handlebarsjs.com/) library for templating work.

Handlebars offers a lot of useful features (nested template fields, evaluation context, template comments) and it's recommended that you browse through at least the [language features](https://handlebarsjs.com/guide/#installation) section of their getting started guide to get a feeling for what's possible.

If a template field is used for an alert type where that field is not supported, the field will simply be blank. No errors will occur, but it can still be tricky to debug if you're not aware of this.

The following template fields are available in alert messages.

| Failed app reload | Field name | Description |
|:-----------:|-----------|---------|
| ✅ | tenantId | ID of the tenant where the reload took place. |
| ✅ | tenantComment | Comment for the tenant, as entered in Qlik Cloud. |
| ✅ | tenantUrl | URL to the tenant. |
| ✅ | userId | ID of the user who triggered the reload. |
| ✅ | userName | Name of the user who triggered the reload. |
| ✅ | appId | ID of Sense app. |
| ✅ | appName | Name of app. |
| ✅ | appDescription | Description of app. |
| ✅ | appUrl | URL to the app. |
| ✅ | appHasSectionAccess | Does the app have section access? (true/false) |
| ✅ | appIsPublished | Is the app published? (true/false) |
| ✅ | appPublishTime | Date/time when app was published. |
| ✅ | appThumbnail | URL to the app thumbnail. |
| ✅ | appOwnerName | Name of app owner. |
| ✅ | appOwnerUserId | App owner user's user id. |
| ✅ | appOwnerPicture | URL to the app owner's profile picture. |
| ✅ | appOwnerEmail | App owner email. |
| ✅ | reloadTrigger | What triggered the reload? Manually, scheduled etc. |
| ✅ | source | Source of the reload. Usually `com.qlik/engine` |
| ✅ | eventType | Type of QS Cloud event. For example `com.qlik.v1.app.reload.finished` |
| ✅ | eventTypeVersion | Version of the event type. |
| ✅ | endedWithMemoryConstraint | Did the reload end due to a memory constraint? (true/false) |
| ✅ | isDirectQueryMode | Is the app in Direct Query mode? (true/false) |
| ✅ | isPartialReload | Was the reload a partial reload? (true/false) |
| ✅ | isSessionApp | Is the app a session app? (true/false) |
| ✅ | isSkipStore | Should storing (to disk) the reloaded app be skipped? (true/false) |
| ✅ | reloadId | ID of the reload. |
| ✅ | rowLimit | Row limit for the reload. |
| ✅ | statements[] | Array of statements from the engine. |
| ✅ | status | Status of the reload. For example `error`. |
| ✅ | usageDuration | Duration of the reload. |
| ✅ | peakMemoryBytes | Peak memory usage during the reload. |
| ✅ | sizeMemoryBytes | Memory usage during the reload. |
| ✅ | appFileSize | Size of app file (on disk). |
| ✅ | errorCode | Error code for the reload. For example `"EngineReloadScriptError"`. |
| ✅ | errorMessage | Error message for the reload. For example `"error in app script or datasource"`. |
| ✅ | logMessage | Log message from the Sense log files.<br>Example:<br> `"ReloadID: 670e1df04cf4e529c035c902\r\nStarted loading data\r\n(A detailed script progress log can be downloaded when the reload is finished)\r\nCharacters << AUTOGENERATE(26) 26 Lines fetched\r\nASCII << AUTOGENERATE(255) 191 Lines fetched\r\nTransactions << AUTOGENERATE(1000) 2,027 Lines fetched\r\n\r\nData has not been loaded. Please correct the error and try loading again.\r\nThe following error occurred:\r\nUnknown statement: ThisFailsForSure...\r\n \r\nThe engine error code: EDC_ERROR:11002\r\nThe error occurred here:\r\nThisFailsForSure...\r\n \r\n"`|
| ✅ | executionDuration.hours | executionDuration is a JSON object.<br>Duration of reload (hours part) |
| ✅ | executionDuration.minutes | Duration of reload (minutes part) |
| ✅ | executionDuration.seconds | Duration of reload (seconds part) |
| ✅ | executionStartTime.startTimeUTC | JSON object.<br>UTC timestamp for reload start |
| ✅ | executionStartTime.startTimeLocal1 | Reload start timestamp, format 1 |
| ✅ | executionStartTime.startTimeLocal2 | Reload start timestamp, format 2 |
| ✅ | executionStartTime.startTimeLocal3 | Reload start timestamp, format 3 |
| ✅ | executionStartTime.startTimeLocal4 | Reload start timestamp, format 4 |
| ✅ | executionStartTime.startTimeLocal5 | Reload start timestamp, format 5 |
| ✅ | executionStopTime.stopTimeUTC | JSON object.<br>UTC timestamp for reload end |
| ✅ | executionStopTime.stopTimeLocal1 | Reload end timestamp, format 1 |
| ✅ | executionStopTime.stopTimeLocal2 | Reload end timestamp, format 2 |
| ✅ | executionStopTime.stopTimeLocal3 | Reload end timestamp, format 3 |
| ✅ | executionStopTime.stopTimeLocal4 | Reload end timestamp, format 4 |
| ✅ | executionStopTime.stopTimeLocal5 | Reload end timestamp, format 5 |
| ✅ | executionStatusText | Final reload task status message, for example `FAILED`. |
| ✅ | scriptLogSize | Size of the reload's script log (characters) |
| ✅ | scriptLogSizeRows | Size of the reload's script log (rows) |
| ✅ | scriptLogSizeCharacters | Size of the reload's script log (characters) |
| ✅ | scriptLogHeadCount | Number of lines extracted from the start of the script log |
| ✅ | scriptLogTailCount | The first y lines from the reload's script log |
| ✅ | scriptLogHead | The first x lines from the reload's script log |
| ✅ | scriptLogTail | Number of lines extracted from the end of the script log |
| ✅ | qliksSenseQMC | Links to QMC, as defined in main config file |
| ✅ | qliksSenseHub | Links to Hub, as defined in main config file |
| ✅ | genericUrls | Links to other systems, as defined in main config file |
