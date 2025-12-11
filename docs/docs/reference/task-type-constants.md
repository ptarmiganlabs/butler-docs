# Qlik Sense Task Type Constants

Reference for Qlik Sense task type numeric constants used in Butler.

## Overview

Qlik Sense Enterprise on Windows uses numeric constants to identify different task types. Butler uses these same constants internally when processing task events from the Qlik Sense scheduler.

Understanding these constants is helpful when:

- Debugging task-related issues
- Analyzing InfluxDB metrics
- Reviewing Butler logs
- Understanding the UDP message format from Log4Net appenders

## Task Type Values

| Type Code | Task Type            | Description                                                                           |
| :-------: | -------------------- | ------------------------------------------------------------------------------------- |
|     0     | **Reload**           | Reload tasks that refresh app data. The most common task type in Qlik Sense.          |
|     1     | **External Program** | Tasks that execute external programs or scripts on the Qlik Sense server.             |
|     2     | **User Sync**        | User directory synchronization tasks that sync users from LDAP, AD, or other sources. |
|     3     | **Distribute**       | App distribution tasks that publish apps to other servers or streams.                 |
|     4     | **Preload**          | App preload tasks that cache apps in memory for faster user access.                   |

## Butler Support by Task Type

The following table shows which Butler features support each task type:

| Task Type         | Email Alerts | InfluxDB Metrics | Slack/Teams | MQTT | New Relic | Webhooks |
| ----------------- | :----------: | :--------------: | :---------: | :--: | :-------: | :------: |
| Reload (0)        |      ✅      |        ✅        |     ✅      |  ✅  |    ✅     |    ✅    |
| External Prog (1) |              |        ✅        |             |      |           |          |
| User Sync (2)     |              |        ✅        |             |      |           |          |
| Distribute (3)    |      ✅      |        ✅        |             |      |           |          |
| Preload (4)       |      ✅      |        ✅        |             |      |           |          |

::: info Feature availability
The table above reflects capabilities as of Butler 15.0.0. Reload tasks have the most complete support, while other task types have email and InfluxDB support as their primary notification channels.
:::

## Technical Details

### UDP Message Format

When Qlik Sense's Log4Net appender sends a UDP message to Butler, the task type is determined by analyzing the log message content and the task metadata retrieved from the Qlik Sense Repository Service (QRS) API.

Butler automatically detects the task type and routes the event to the appropriate handler.

### InfluxDB Measurements

Each task type uses separate InfluxDB measurements:

| Task Type        | Success Measurement             | Failure Measurement            |
| ---------------- | ------------------------------- | ------------------------------ |
| Reload           | `reload_task_success`           | `reload_task_failed`           |
| External Program | `external_program_task_success` | `external_program_task_failed` |
| User Sync        | `user_sync_task_success`        | `user_sync_task_failed`        |
| Distribute       | `distribute_task_success`       | `distribute_task_failed`       |
| Preload          | `preload_task_success`          | `preload_task_failed`          |

See the [InfluxDB reference](/docs/reference/influxdb/) for complete details on tags and fields for each measurement.

## Related Resources

- [Setting up task alerts](/docs/getting-started/setup/task-alerts/) - Configure alerts for all task types
- [InfluxDB reference](/docs/reference/influxdb/) - Complete InfluxDB measurement documentation
- [Config file reference](/docs/reference/config-file/) - Configuration options for each task type
