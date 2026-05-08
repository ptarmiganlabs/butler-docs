---
title: "Task and service monitoring in InfluxDB"
linkTitle: "InfluxDB"
weight: 20
description: >
  Description of how information about all Qlik Sense task types and Windows services can be stored in InfluxDB.
---

::: info InfluxDB Version Support
Butler supports InfluxDB 1.x, 2.x and 3.x.

There are reports that InfluxDB's cloud product also works with Butler, but that has not been tested by the Butler team.
:::

## What's this?

Butler can store information about all Qlik Sense task types and Windows services in InfluxDB, enabling comprehensive monitoring and visualization through tools like Grafana.

## Architecture Overview

The following diagram shows how task events flow from Qlik Sense to InfluxDB:

```mermaid
flowchart LR
    subgraph QlikSense["Qlik Sense Server"]
        Scheduler["Scheduler Service"]
        LogAppender["Log4net Appender"]
    end

    subgraph Butler["Butler"]
        UDP["UDP Server"]
        Parser["Event Parser"]
        InfluxWriter["InfluxDB Writer"]
    end

    subgraph Storage["Data Storage"]
        InfluxDB[(InfluxDB)]
        Grafana["Grafana Dashboards"]
    end

    Scheduler -->|"Task Events"| LogAppender
    LogAppender -->|"UDP Messages"| UDP
    UDP --> Parser
    Parser --> InfluxWriter
    InfluxWriter -->|"Measurements"| InfluxDB
    InfluxDB --> Grafana
```

## InfluxDB Versions

Butler can send data to InfluxDB v1, v2, or v3. The version is set using the `Butler.influxDb.version` configuration option.

### How It Works

Butler uses a compatibility layer that handles the differences between InfluxDB versions internally. This allows existing event-producing code to work unchanged while supporting all three versions:

```mermaid
flowchart LR
    A[Butler event code<br/>writePoints legacy payload] --> B[Compatibility client]
    B -->|version 1| C[influx package]
    B -->|version 2| D["@influxdata/influxdb-client"]
    B -->|version 3| E["@influxdata/influxdb3-client"]
```

### Version-Specific Behavior

| Version | Behavior |
|---------|----------|
| **v1** | Butler automatically creates the database and default retention policy if they don't exist when Butler starts. |
| **v2** | The InfluxDB bucket must be created before starting Butler. Butler will not auto-create buckets. |
| **v3** | The InfluxDB database must be created before starting Butler. Butler will not auto-create databases. |

### Configuration

Use the `version` setting to specify which InfluxDB version to use, then configure the appropriate version-specific section:

```yaml
Butler:
  influxDb:
    enable: true                           # Master switch for InfluxDB integration. If false, no data will be sent to InfluxDB.
    hostIP: influxdb.mycompany.com         # IP or FQDN of Influxdb server
    hostPort: 8086                          # Port where Influxdb is listening. Default=8086
    version: 3                              # InfluxDB major version. Supported values are 1, 2 and 3.
    v1Config:                               # Settings for InfluxDB v1.x only
      auth:
        enable: false                      # Does InfluxDB require login?
        username: user_joe
        password: joesecret
      dbName: butler                       # Name of database in InfluxDB to which Butler's data is written
      # Default retention policy that should be created in InfluxDB when Butler creates a new database there.
      # Any data older than retention policy threshold will be purged from InfluxDB.
      retentionPolicy:
        name: 10d
        duration: 10d
    v2Config:                               # Settings for InfluxDB v2.x only
      org: my-org
      bucket: butler
      description: Butler metrics
      token: my-v2-token
      retentionDuration: 10d
    v3Config:                               # Settings for InfluxDB v3.x only
      database: butler
      description: Butler metrics
      token: my-v3-token
      retentionDuration: 10d
      writeTimeout: 10000
      queryTimeout: 60000
```

## Supported Task Types

Butler supports storing information about all Qlik Sense task types in InfluxDB:

| Task Type                  | Success | Failure | Notes                                      |
| -------------------------- | :-----: | :-----: | ------------------------------------------ |
| **Reload tasks**           |   ✅    |   ✅    | Full support including script log excerpts |
| **External program tasks** |   ✅    |   ✅    | Task execution details                     |
| **User sync tasks**        |   ✅    |   ✅    | User directory synchronization status      |
| **Distribute tasks**       |   ✅    |   ✅    | App distribution/publishing status         |
| **Preload tasks**          |   ✅    |   ✅    | App preloading status                      |

::: info Aborted tasks
Aborted tasks are **not stored** in InfluxDB. Only successful and failed task executions are tracked.
:::

**Windows service monitoring:**

- Service status information
- Service state changes (running/stopped)

Once the information is in InfluxDB it can be used in Grafana dashboards for:

- Real-time monitoring of task execution status
- Historical trend analysis
- Alerting via Grafana's alerting capabilities (Slack, Teams, email, etc.)
- Capacity planning and performance optimization

Please note that InfluxDB must be enabled and correctly configured in the Butler config file for the below features to work.

## Reload Tasks

### Monitor failed reload tasks

If enabled using the `Butler.influxDb.reloadTaskFailure.enable` setting, Butler will store information about all failed reload tasks in InfluxDB.

The information stored includes (among other things):

- The name and ID of the app that the failed reload task was reloading.
- The name and ID of the reload task.
- The name of the Qlik Sense node/server that the task was running on.
- User who started the reload task. This will be the service account when the task was started by a schedule or via a task chain/trigger.
- Execution ID of the reload. This is a unique ID that is generated by Qlik Sense for each reload task execution, it can be used to cross-reference the reload task with related entries in the Qlik Sense log files.
- Last `Butler.influxDb.reloadTaskFailure.tailScriptLogLines` lines of the Sense log file for the reload task.
- Static tags defined in the config file's `Butler.influxDb.reloadTaskFailure.tag.static` section.
- Dynamic app tags, i.e. Sense tags for the app being reloaded, if enabled in the config file `Butler.influxDb.reloadTaskFailure.tag.dynamic.useAppTags` section.
- Dynamic reload task tags, i.e. Sense tags for the reload task being executed, if enabled in the config file `Butler.influxDb.reloadTaskFailure.tag.dynamic.useTaskTags` section.

A complete definition of all information sent to InfluxDB is available in the [reference section](/docs/reference/influxdb).

### Monitor successful reload tasks

Butler can monitor all reload tasks for successful completion, or only some of them.

#### Monitor all successful reload tasks

If enabled using the `Butler.influxDb.reloadTaskSuccess.allReloadTasks.enable` setting, Butler will store information about all successful reload tasks in InfluxDB.

The information stored is almost the same as for failed reload tasks, except that the Sense script log file is not included.

#### Monitor only some successful reload tasks

If enabled using the `Butler.influxDb.reloadTaskSuccess.byCustomProperty.enable` setting, Butler will store information about only some successful reload tasks in InfluxDB.

Which tasks to store information about is controlled using a custom property on the reload task.  
The name of the custom property is defined in the `Butler.influxDb.reloadTaskSuccess.byCustomProperty.customPropertyName` setting.  
The value of the custom property that will be used to indicate that the reload task should be monitored is defined in the `Butler.influxDb.reloadTaskSuccess.byCustomProperty.enabledValue` setting.

## External Program Tasks

External program tasks execute scripts or programs outside of Qlik Sense. Butler can monitor both successful and failed executions.

### Monitor failed external program tasks

Enable with `Butler.influxDb.externalProgramTaskFailure.enable`. Butler will store:

- Task name and ID
- Host where the task executed
- User who ran the task
- Execution timestamp and duration
- Static and dynamic tags

### Monitor successful external program tasks

Enable with `Butler.influxDb.externalProgramTaskSuccess.enable`. The same information as failed tasks is stored.

## User Sync Tasks

User sync tasks synchronize user information from external directories (like Active Directory) into Qlik Sense.

### Monitor failed user sync tasks

Enable with `Butler.influxDb.userSyncTaskFailure.enable`. Butler will store:

- Task name and ID
- Host where the task executed
- Execution timestamp
- Static and dynamic tags

### Monitor successful user sync tasks

Enable with `Butler.influxDb.userSyncTaskSuccess.enable`. The same information as failed tasks is stored.

## Distribute Tasks

Distribute tasks handle app distribution and publishing in Qlik Sense.

### Monitor failed distribute tasks

Enable with `Butler.influxDb.distributeTaskFailure.enable`. Butler will store:

- Task name and ID
- Associated app name and ID (if available)
- Host where the task executed
- Execution timestamp
- Static and dynamic tags

### Monitor successful distribute tasks

Enable with `Butler.influxDb.distributeTaskSuccess.enable`. Additional information includes:

- Execution duration
- Execution status details
- Node where the task was executed

## Preload Tasks

Preload tasks pre-cache app data to improve user experience when opening apps.

### Monitor failed preload tasks

Enable with `Butler.influxDb.preloadTaskFailure.enable`. Butler will store:

- Task name and ID
- Associated app name and ID (if available)
- Host where the task executed
- Execution timestamp
- Static and dynamic tags

### Monitor successful preload tasks

Enable with `Butler.influxDb.preloadTaskSuccess.enable`. Additional information includes:

- Execution duration
- Execution status details
- Node where the task was executed

## Static vs dynamic tags

Butler offers two kinds of tags: Static and dynamic.

Static tags are defined in the config file and are the same for all messages stored in InfluxDB.  
An example of a static tag could be the name of the Qlik Sense server that Butler is running on, or whether the message related to a production or test Qlik Sense environment.

Dynamic attributes are determined at run-time when the message is stored in InfluxDB.

## Settings in config file

Below is a complete example showing all InfluxDB task monitoring settings:

```yaml
---
Butler:
  ...
  # InfluxDB settings
  influxDb:
    enable: true                           # Master switch for InfluxDB integration. If false, no data will be sent to InfluxDB.
    hostIP: influxdb.mycompany.com         # IP or FQDN of Influxdb server
    hostPort: 8086                          # Port where Influxdb is listening. Default=8086
    version: 3                              # InfluxDB major version. Supported values are 1, 2 and 3.
    # Note: v1 will auto-create the database and retention policy if they don't exist.
    # v2 and v3 require the bucket/database to be created beforehand - Butler will not auto-create them.
    v1Config:                               # Settings for InfluxDB v1.x only
      auth:
        enable: false                      # Does InfluxDB require login?
        username: user_joe
        password: joesecret
      dbName: butler                       # Name of database in InfluxDB to which Butler's data is written
      # Default retention policy that should be created in InfluxDB when Butler creates a new database there.
      # Any data older than retention policy threshold will be purged from InfluxDB.
      retentionPolicy:
        name: 10d
        duration: 10d
    v2Config:                               # Settings for InfluxDB v2.x only
      org: my-org
      bucket: butler
      description: Butler metrics
      token: my-v2-token
      retentionDuration: 10d
    v3Config:                               # Settings for InfluxDB v3.x only
      database: butler
      description: Butler metrics
      token: my-v3-token
      retentionDuration: 10d
      writeTimeout: 10000
      queryTimeout: 60000
    tag:
      static: # Static tags to attach to all data stored in InfluxDB
        # - name: butler_instance
        #   value: dev
    reloadTaskFailure:
      enable: true
      tailScriptLogLines: 20
      tag:
        static: # Static tags to attach to data stored in InfluxDB
          - name: butler_instance
            value: prod-1
        dynamic:
          useAppTags: true # Should app tags be stored in InfluxDB as tags?
          useTaskTags: true # Should task tags be stored in InfluxDB as tags?
    reloadTaskSuccess:
      enable: true
      allReloadTasks:
        enable: false
      byCustomProperty:
        enable: false
        customPropertyName: 'Butler_SuccessReloadTask_InfluxDB'
        enabledValue: 'Yes'
      headScriptLogLines: 15
      tailScriptLogLines: 25
      tag:
        static: # Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useAppTags: true # Should app tags be sent to InfluxDb as tags?
          useTaskTags: true # Should task tags be sent to InfluxDb as tags?
    userSyncTaskSuccess:
      enable: false
      tag:
        static: # Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be sent to InfluxDb as tags?
    userSyncTaskFailure:
      enable: false
      tag:
        static: # Static tags to attach to data stored in InfluxDB
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be stored in InfluxDB as tags?
    externalProgramTaskSuccess:
      enable: false
      tag:
        static: # Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be sent to InfluxDb as tags?
    externalProgramTaskFailure:
      enable: false
      tag:
        static: # Static tags to attach to data stored in InfluxDB
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be stored in InfluxDB as tags?
    distributeTaskSuccess:
      enable: false
      tag:
        static: # Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be sent to InfluxDb as tags?
    distributeTaskFailure:
      enable: false
      tag:
        static: # Static tags to attach to data stored in InfluxDB
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be stored in InfluxDB as tags?
    preloadTaskSuccess:
      enable: false
      tag:
        static: # Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be sent to InfluxDb as tags?
    preloadTaskFailure:
      enable: false
      tag:
        static: # Static tags to attach to data stored in InfluxDB
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useTaskTags: true # Should task tags be stored in InfluxDB as tags?
  ...
```

## InfluxDB Measurements Reference

For detailed information about all fields and tags stored in InfluxDB for each task type, see the [InfluxDB reference documentation](/docs/reference/influxdb).
