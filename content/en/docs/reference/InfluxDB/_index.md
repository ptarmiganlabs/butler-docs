---
title: "Information stored in InfluxDB"
linkTitle: "InfluxDB"
weight: 55
description: >
    Butler stores a lot of information in InfluxDB. This page describes the different measurements and tags that Butler send to InfluxDB.
---


## Failed reload tasks

Measurement: `reload_task_failed`

### Tags

| Tag name | Description |
|----------|-------------|
| host | Server on which the reload took place. |
| user | Full user info (directory + ID) for user doing the reload. Typically `sa_scheduler` for tasks started via scheduler. For manually started (from QMC) tasks the actual user starting the task is used. |
| task_id | ID of reload task that failed. |
| task_name | Name of reload task that failed. |
| app_id | ID of Sense app whose reload failed. |
| app_name | Name of Sense app whose reload failed. |
| log_level | Log level of the Sense log file entry causing the alert |
| task_executingNodeName | Name of node where the reload task was executed. |
| task_executionStatusNum | Reload task's execution result code (numeric). |
| task_executionStatusText | Reload task's execution result (text). |
| appTag_<app tag name 1 from Qlik Sense> | App tag defined in the QMC for the Qlik Sense app. |
| appTag_<app tag name 2 from Qlik Sense> | App tag defined in the QMC for the Qlik Sense app. |
| taskTag_<reload task tag name 1 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task. |
| taskTag_<reload task tag name 2 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task. |
| static-tag-1 | Static tag specified in the Butler configuration file. |
| static-tag-2 | Static tag specified in the Butler configuration file. |

### Fields

| Field name | Description |
|------------|-------------|
| log_timestamp | Timestamp of the Sense log file entry that triggered the event. |
| execution_id | Execution ID of the reload task. |
| log_message | Raw message from the Sense log file entry that triggered the alert. |
| task_executionStartTime_json | Start time of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionStopTime_json | Stop time of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionDuration_json | Duration of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionDuration_sec | Duration of the reload task in seconds. |
| task_executionDuration_min | Duration of the reload task in minutes. |
| task_executionDuration_h | Duration of the reload task in hours. |
| task_scriptLogSize | Size (number of characters) of the reload script log associated with the event. |
| task_scriptLogTailCount | Number of lines from the end of the reload script log that are included in the event. |
| reload_log | Last few lines of the reload script log associated with the event. |

## Successful reload tasks

Measurement: `reload_task_success`

### Tags

| Tag name | Description |
|----------|-------------|
| host | Server on which the reload took place. |
| user | Full user info (directory + ID) for user doing the reload. Typically `sa_scheduler` for tasks started via scheduler. For manually started (from QMC) tasks the actual user starting the task is used. |
| task_id | ID of reload task. |
| task_name | Name of reload task. |
| app_id | ID of Sense app that was reloaded. |
| app_name | Name of Sense app that was reloaded. |
| log_level | Log level of the Sense log file entry causing the event |
| task_executingNodeName | Name of node where the reload task was executed. |
| task_executionStatusNum | Reload task's execution result code (numeric). |
| task_executionStatusText | Reload task's execution result (text). |
| appTag_<app tag name 1 from Qlik Sense> | App tag defined in the QMC for the Qlik Sense app. |
| appTag_<app tag name 2 from Qlik Sense> | App tag defined in the QMC for the Qlik Sense app. |
| taskTag_<reload task tag name 1 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task. |
| taskTag_<reload task tag name 2 from Qlik Sense> | Task tag defined in the QMC for the Qlik Sense reload task. |
| static-tag-1 | Static tag specified in the Butler configuration file. |
| static-tag-2 | Static tag specified in the Butler configuration file. |

### Fields

| Field name | Description |
|------------|-------------|
| log_timestamp | Timestamp of the Sense log file entry that triggered the event. |
| execution_id | Execution ID of the reload task. |
| log_message | Raw message from the Sense log file entry that triggered the event. |
| task_executionStartTime_json | Start time of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionStopTime_json | Stop time of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionDuration_json | Duration of the reload task. Stringified JSON with seconds, minutes, hours. |
| task_executionDuration_sec | Duration of the reload task in seconds. |
| task_executionDuration_min | Duration of the reload task in minutes. |
| task_executionDuration_h | Duration of the reload task in hours. |

## Windows service info

Measurement: `win_service_state`

### Tags

| Tag name | Description |
|----------|-------------|
| butler_instance | Name of the Butler instance, from config file.|
| host | Server on which the reload took place. |
| service_name | Name of the Windows service. |
| display_name | Display name of the Windows service. |
| friendly_name | Friendly name of the Windows service (as defined in the Butler config file). |

### Fields

| Field name | Description |
|------------|-------------|
| state_num | State of the Windows service (numeric). |
| state_text | State of the Windows service (text). |
| startup_mode_num | Startup mode of the Windows service (numeric). |
| startup_mode_text | Startup mode of the Windows service (text). |

## Qlik Sense license info

The license information returned by the Qlik Sense API is not very well documented by Qlik.  
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

### License types "professional" and "analyzer"

| Field name | Description |
|------------|-------------|
| allocated | Number of allocated professional licenses. |
| available | Number of available professional licenses. |
| excess | Number of excess professional licenses. *Unclear what this means.* |
| quarantined | Number of quarantined professional licenses. |
| total | Total number of professional licenses included in the installed Qlik Sense license. |
| used | Number of professional licenses in use right now. |

### License type "analyzer_capacity"

| Field name | Description |
|------------|-------------|
| allocated_minutes | Total number of analyzer capacity minutes available in the installed Qlik Sense license. |
| unavailable_minutes | Number of analyzer capacity minutes that are currently unavailable. *Unclear what this means.*  |
| used_minutes | Number of analyzer capacity minutes used so far this month. |

### License type "token_login"

| Field name | Description |
|------------|-------------|
| allocated_tokens | *Unclear what this means.* |
| token_cost | *Unclear what this means.* |
| unavailable_tokens | *Unclear what this means.* |
| used_tokens | *Unclear what this means.* |

### License type "token_user"

| Field name | Description |
|------------|-------------|
| allocated_tokens | *Unclear what this means.* |
| quarantined_tokens | *Unclear what this means.* |
| token_cost | *Unclear what this means.* |
| used_tokens | *Unclear what this means.* |

### License type "tokens_available"

This license type contains aggregated token information.

| Field name | Description |
|------------|-------------|
| available_tokens | Number of tokens available. *Unclear what this means.* |
| total_tokens | Total number of tokens included in the installed Qlik Sense license. *Unclear what this means.* |

## Butler uptime info

Measurement: `butler_memory_usage`

### Tags

| Tag name | Description |
|----------|-------------|
| butler_instance | Name of the Butler instance, from config file.|
| version | Version of Butler. |

### Fields

| Field name | Description |
|------------|-------------|
| heap_used | Amount of heap memory used by Butler. |
| heap_total | Total amount of heap memory available to Butler. |
| external | Amount of external memory used by Butler. |
| process_memory | Amount of memory used by the Butler process. |
