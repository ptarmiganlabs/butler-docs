---
title: "Reload alerts in InfluxDB"
linkTitle: "InfluxDB"
weight: 20
description: >
  Description of how information of how successful and failed reload tasks can be stored in InfluxDB.
---

## What's this?

Butler can store information about both successful and failed reload tasks in InfluxDB.

- If enabled, Butler will store information about _all_ failed reload tasks to InfluxDB.
- For successful reload tasks, there are two options:
  - Store information about _all_ successful reload tasks to InfluxDB.
  - Store information about _some_ successful reload tasks to InfluxDB.  
    Which tasks to store information about is controlled using a custom property on the reload task.

Once the information about the reload task is in InfluxDB it can be used in Grafana dashboards.

This way it is possible to get a good, continuous overview of the reload activity in your Qlik Sense environment.  
You can also use the information to create alerts in Grafana using it's comprehensive alerting capabilities, including alerting to Slack, Teams, email, etc.

Please note that InfluxDB must be enabled and correctly configured in the Butler config file for the below features to work.

## Monitor failed reload tasks

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

A complete definition of all information sent to InfluxDB is available in the [reference section](/docs/reference/influxdb/).

## Monitor successful reload tasks

Butler can monitor all reload tasks for successful completion, or only some of them.

### Monitor all successful reload tasks

If enabled using the `Butler.influxDb.reloadTaskSuccess.allReloadTasks.enable` setting, Butler will store information about all successful reload tasks in InfluxDB.

The information stored is almost the same as for failed reload tasks, except that the Sense script log file is not included.

### Monitor only some successful reload tasks

If enabled using the `Butler.influxDb.reloadTaskSuccess.byCustomProperty.enable` setting, Butler will store information about only some successful reload tasks in InfluxDB.

Which tasks to store information about is controlled using a custom property on the reload task.  
The name of the custom property is defined in the `Butler.influxDb.reloadTaskSuccess.byCustomProperty.customPropertyName` setting.  
The value of the custom property that will be used to indicate that the reload task should be monitored is defined in the `Butler.influxDb.reloadTaskSuccess.byCustomProperty.enabledValue` setting.

## Static vs dynamic tags

Butler offers two kinds of tags: Static and dynamic.

Static tags are defined in the config file and are the same for all messages stored in InfluxDB.  
An example of a static tag could be the name of the Qlik Sense server that Butler is running on, or whether the message related to a production or test Qlik Sense environment.

Dynamic attributes are determined at run-time when the message is stored in InfluxDB.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  influxDb:
    ...
    ...
    reloadTaskFailure:
      enable: true
      tailScriptLogLines: 20
      tag:
        static:                 # Static tags to attach to data stored in InfluxDB
          - name: butler_instance
            value: prod-1
        dynamic:
          useAppTags: true      # Should app tags be stored in InfluxDB as tags?
          useTaskTags: true     # Should task tags be stored in InfluxDB as tags?
    reloadTaskSuccess:
      enable: true
      allReloadTasks:
        enable: false
      byCustomProperty:
        enable: true
        customPropertyName: 'Butler_SuccessReloadTask_InfluxDB'
        enabledValue: 'Yes'
      tag:
        static:                 # Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useAppTags: true      # Should app tags be sent to InfluxDb as tags?
          useTaskTags: true     # Should task tags be sent to InfluxDb as tags?
  ...
  ...
```
