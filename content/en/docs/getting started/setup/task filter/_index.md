---
title: "Control which tasks can be started via Butler's API"
linkTitle: "Task filter"
weight: 305
description: >
  Qlik Sense tasks can be started using Butler's REST API.  

  Using the task filtering feature it's possible to control *which* tasks can be started.  


  This can be useful for sysadmins when only a limited set of tasks should be available to third party systems.
---

{{% alert title="Optional" color="primary" %}}
Task filtering is an optional Butler feature.

If task filtering is not of interest, the default values in the config file can be left as they are.  
By default this feature is turned off.
{{% /alert %}}

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
  # Controls which tasks can be started via Butler's REST API.
  # Enabling this feature gives Qlik Sense sysadmins a way to control which tasks can be started by third party systems and applications.
  # If this feature is disabled all tasks can be started via the API (assuming the start task API itself is enabled).
  # Note that the taskId, tag and customProperty sections below are additive. I.e. a task only has to appear in one of those sections to be on the "allowed" list.
  startTaskFilter:
    enable: false
    allowTask:
      taskId:
        # Zero or more approved/allowed task IDs
        # If Butler.startTaskFilter.enable is true, only task IDs listed below will be started by Butler 
        - e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e
        - 7552d9fc-d1bb-4975-9a38-18357de531ea
        - fb0f317d-da91-4b86-aafa-0174ae1e8c8f
      tag:
        # Zero or more tags used to indicate that a task is approved to be started by Butler.
        # Use the Qlik Sense QMC to set tags on tasks.
        # If Butler.startTaskFilter.enable is true, only tasks with the tags below will be started by Butler 
        - startTask1
        - startTask2
      customProperty:
        # Zero or more custom properties name/value pairs used to indicate that a task is approved to be started by Butler.
        # Use the Qlik Sense QMC to set custom properties on tasks.
        # If Butler.startTaskFilter.enable is true, only tasks with the custom property values below will be started by Butler 
        - name: taskGroup
          value: tasks1
        - name: taskGroup
          value: tasks2
  ...
  ...
```

Setting `anonTelemetry` to true enables telemetry, setting it to false disables telemetry.
