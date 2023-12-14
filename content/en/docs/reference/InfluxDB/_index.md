---
title: "Information stored in InfluxDB"
linkTitle: "InfluxDB"
weight: 55
description: >
    Butler stores a lot of information in InfluxDB. This page describes the different measurements and tags that Butler send to InfluxDB.
---


## Failed reload tasks

The following information is stored in the `reload_task_failed` measurement:

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

## Butler uptime info

