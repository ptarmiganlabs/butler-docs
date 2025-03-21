---
title: "Information stored in InfluxDB"
linkTitle: "InfluxDB"
weight: 55
alias:
  - /docs/examples/influxdb-metrics
description: >
  Butler stores a lot of information in InfluxDB. This page describes the different measurements and tags that Butler send to InfluxDB.
---

## Failed reload tasks

Measurement: `reload_task_failed`

### Tags

| Tag name                                          | Description                                                                                                                                                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host                                              | Server on which the reload took place.                                                                                                                                                                |
| user                                              | Full user info (directory + ID) for user doing the reload. Typically `sa_scheduler` for tasks started via scheduler. For manually started (from QMC) tasks the actual user starting the task is used. |
| task_id                                           | ID of reload task that failed.                                                                                                                                                                        |
| task_name                                         | Name of reload task that failed.                                                                                                                                                                      |
| app_id                                            | ID of Sense app whose reload failed.                                                                                                                                                                  |
| app_name                                          | Name of Sense app whose reload failed.                                                                                                                                                                |
| log_level                                         | Log level of the Sense log file entry causing the alert                                                                                                                                               |
| task_executingNodeName                            | Name of node where the reload task was executed.                                                                                                                                                      |
| task_executionStatusNum                           | Reload task's execution result code (numeric).                                                                                                                                                        |
| task_executionStatusText                          | Reload task's execution result (text).                                                                                                                                                                |
| appTag\_<app tag name 1 from Qlik Sense>          | App tag defined in the QMC for the Qlik Sense app.                                                                                                                                                    |
| appTag\_<app tag name 2 from Qlik Sense>          | App tag defined in the QMC for the Qlik Sense app.                                                                                                                                                    |
| taskTag\_<reload task tag name 1 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task.                                                                                                                                           |
| taskTag\_<reload task tag name 2 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task.                                                                                                                                           |
| static-tag-1                                      | Static tag specified in the Butler configuration file.                                                                                                                                                |
| static-tag-2                                      | Static tag specified in the Butler configuration file.                                                                                                                                                |

### Fields

| Field name                   | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| log_timestamp                | Timestamp of the Sense log file entry that triggered the event.                       |
| execution_id                 |  Execution ID of the reload task.                                                     |
| log_message                  | Raw message from the Sense log file entry that triggered the alert.                   |
| task_executionStartTime_json | Start time of the reload task. Stringified JSON with seconds, minutes, hours.         |
| task_executionStopTime_json  | Stop time of the reload task. Stringified JSON with seconds, minutes, hours.          |
| task_executionDuration_json  | Duration of the reload task. Stringified JSON with seconds, minutes, hours.           |
| task_executionDuration_sec   | Duration of the reload task in seconds.                                               |
| task_executionDuration_min   | Duration of the reload task in minutes.                                               |
| task_executionDuration_h     | Duration of the reload task in hours.                                                 |
| task_scriptLogSize           | Size (number of characters) of the reload script log associated with the event.       |
| task_scriptLogTailCount      | Number of lines from the end of the reload script log that are included in the event. |
| reload_log                   | Last few lines of the reload script log associated with the event.                    |

## Successful reload tasks

Measurement: `reload_task_success`

### Tags

| Tag name                                          | Description                                                                                                                                                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host                                              | Server on which the reload took place.                                                                                                                                                                |
| user                                              | Full user info (directory + ID) for user doing the reload. Typically `sa_scheduler` for tasks started via scheduler. For manually started (from QMC) tasks the actual user starting the task is used. |
| task_id                                           | ID of reload task.                                                                                                                                                                                    |
| task_name                                         | Name of reload task.                                                                                                                                                                                  |
| app_id                                            | ID of Sense app that was reloaded.                                                                                                                                                                    |
| app_name                                          | Name of Sense app that was reloaded.                                                                                                                                                                  |
| log_level                                         | Log level of the Sense log file entry causing the event                                                                                                                                               |
| task_executingNodeName                            | Name of node where the reload task was executed.                                                                                                                                                      |
| task_executionStatusNum                           | Reload task's execution result code (numeric).                                                                                                                                                        |
| task_executionStatusText                          | Reload task's execution result (text).                                                                                                                                                                |
| appTag\_<app tag name 1 from Qlik Sense>          | App tag defined in the QMC for the Qlik Sense app.                                                                                                                                                    |
| appTag\_<app tag name 2 from Qlik Sense>          | App tag defined in the QMC for the Qlik Sense app.                                                                                                                                                    |
| taskTag\_<reload task tag name 1 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task.                                                                                                                                           |
| taskTag\_<reload task tag name 2 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task.                                                                                                                                           |
| static-tag-1                                      | Static tag specified in the Butler configuration file.                                                                                                                                                |
| static-tag-2                                      | Static tag specified in the Butler configuration file.                                                                                                                                                |

### Fields

| Field name                   | Description                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| log_timestamp                | Timestamp of the Sense log file entry that triggered the event.               |
| execution_id                 |  Execution ID of the reload task.                                             |
| log_message                  | Raw message from the Sense log file entry that triggered the event.           |
| task_executionStartTime_json | Start time of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionStopTime_json  | Stop time of the reload task. Stringified JSON with seconds, minutes, hours.  |
| task_executionDuration_json  | Duration of the reload task. Stringified JSON with seconds, minutes, hours.   |
| task_executionDuration_sec   | Duration of the reload task in seconds.                                       |
| task_executionDuration_min   | Duration of the reload task in minutes.                                       |
| task_executionDuration_h     | Duration of the reload task in hours.                                         |

## Windows service info

Measurement: `win_service_state`

### Tags

| Tag name        | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| butler_instance | Name of the Butler instance, from config file.                               |
| host            | Server on which the reload took place.                                       |
| service_name    | Name of the Windows service.                                                 |
| display_name    | Display name of the Windows service.                                         |
| friendly_name   | Friendly name of the Windows service (as defined in the Butler config file). |

### Fields

| Field name        | Description                                    |
| ----------------- | ---------------------------------------------- |
| state_num         | State of the Windows service (numeric).        |
| state_text        | State of the Windows service (text).           |
| startup_mode_num  | Startup mode of the Windows service (numeric). |
| startup_mode_text | Startup mode of the Windows service (text).    |

## Qlik Sense server version info

Measurement: `qlik_sense_version`

### Tags

| Tag name        | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| butler_instance | Name of the Butler instance, from `Butler.influxDb.instanceTag` in config file. |

In addition to above, all tags defined in `Butler.qlikSenseVersion.versionMonitor.destination.influxDb.tag.static` in the config file are added to each datapoint that is sent to InfluxDB.

### Fields

| Field name                 | Description                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| content_hash               | Content hash, as returned from the Sense version API.                                                     |
| sense_id                   | Sense ID, as returned from the Sense version API. This is usually on the form `qliksenseserver:<version>` |
| product_name               | Sense product name, for example `Qlik Sense`                                                              |
| deployment_type            | Sense deployment type, for example `QlikSenseServer`                                                      |
| version                    | Sense version, for example `14.173.4`                                                                     |
| release_label              | Sense release label, for example `February 2024 Patch 1`                                                  |
| deprecated_product_version | Sense old/deprecated product version, for example `4.0.x`                                                 |
| copyright_year_range       | Sense copyright year range, for example `1993-2024`                                                       |

## Qlik Sense server license info

Measurement: `qlik_sense_server_license`

### Tags

| Tag name        | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| butler_instance | Name of the Butler instance, from `Butler.influxDb.instanceTag` in config file. |

In addition to above, all tags defined in `Butler.qlikSenseLicense.serverLicenseMonitor.destination.influxDb.tag.static` in the config file are added to each datapoint that is sent to InfluxDB.

### Fields

| Field name        | Description                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| license_expired   | Whether the Sense license has expired. true/false.                                                                 |
| expiry_date       | Expiry date of the Sense server license, `YYYY-MM-DD` format.                                                      |
| days_until_expiry | Number of days until the Sense server license expires. If expiration date has passed this number will be negative. |

## Qlik Sense end user access license info

The access license information returned by the Qlik Sense API is not very well documented by Qlik.  
As a result it is not always clear what the different fields mean.  
This is highlighted for each affected field below.

Measurement: `sense_license_info`

Each datapoint has a tag called `license_type` that can have the following values:

- `professional`
- `analyzer`
- `analyzer_capacity`
- `token_login`
- `token_user`
- `tokens_available`

The tags are the same for all license types, but the fields differ as follows.

### Tags

| Tag name        | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| butler_instance | Name of the Butler instance, from `Butler.influxDb.instanceTag` in config file. |

In addition to above, all tags defined in `Butler.qlikSenseLicense.licenseMonitor.destination.influxDb.tag.static` in the config file are added to each datapoint that is sent to InfluxDB.

### License types "professional" and "analyzer"

| Field name  | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| allocated   | Number of allocated professional licenses.                                          |
| available   | Number of available professional licenses.                                          |
| excess      | Number of excess professional licenses. _Unclear what this means._                  |
| quarantined | Number of quarantined professional licenses.                                        |
| total       | Total number of professional licenses included in the installed Qlik Sense license. |
| used        | Number of professional licenses in use right now.                                   |

### License type "analyzer_capacity"

| Field name          | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| allocated_minutes   | Total number of analyzer capacity minutes available in the installed Qlik Sense license.       |
| unavailable_minutes | Number of analyzer capacity minutes that are currently unavailable. _Unclear what this means._ |
| used_minutes        | Number of analyzer capacity minutes used so far this month.                                    |

### License type "token_login"

| Field name         | Description                |
| ------------------ | -------------------------- |
| allocated_tokens   | _Unclear what this means._ |
| token_cost         | _Unclear what this means._ |
| unavailable_tokens | _Unclear what this means._ |
| used_tokens        | _Unclear what this means._ |

### License type "token_user"

| Field name         | Description                |
| ------------------ | -------------------------- |
| allocated_tokens   | _Unclear what this means._ |
| quarantined_tokens | _Unclear what this means._ |
| token_cost         | _Unclear what this means._ |
| used_tokens        | _Unclear what this means._ |

### License type "tokens_available"

This license type contains aggregated token information.

| Field name       | Description                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| available_tokens | Number of tokens available. _Unclear what this means._                                          |
| total_tokens     | Total number of tokens included in the installed Qlik Sense license. _Unclear what this means._ |

## Butler uptime info

Measurement: `butler_memory_usage`

### Tags

| Tag name        | Description                                    |
| --------------- | ---------------------------------------------- |
| butler_instance | Name of the Butler instance, from config file. |
| version         | Version of Butler.                             |

### Fields

| Field name     | Description                                      |
| -------------- | ------------------------------------------------ |
| heap_used      | Amount of heap memory used by Butler.            |
| heap_total     | Total amount of heap memory available to Butler. |
| external       | Amount of external memory used by Butler.        |
| process_memory | Amount of memory used by the Butler process.     |
