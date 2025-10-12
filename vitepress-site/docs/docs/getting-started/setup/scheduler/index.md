---
title: "Configuring the Butler scheduler"
linkTitle: "Scheduler"
weight: 118
description: >
  Butler's scheduler complements the Qlik Sense built-in scheduler with more flexible triggers and a DevOps friendly API/file format for storing scheduling data.
---

## What's this?

Some scheduling scenarios are difficult to achieve with the standard Qlik Sense scheduler. Butler attempts to solve this by offering a cron-based scheduler that can start Sense tasks according to schedule.

## How it works

Butler's scheduler can be used both via the REST API and by directly editing the scheduler config file.

Both options have their merits and use cases, the latter one can for example be useful if the scheduling file is kept on a Git server and copied to the Butler environment by means of some continuous delivery (CD) tool. The API can be useful when other systems need to change when Sense reloads take place, or to change the schedules from within Sense load scripts.

All schedules are stored in a YAML file. The location and name of the file is controlled by the config file property `Butler.scheduler.configFile`.

The Butler GitHub repository has a sample schedule file in the config directory, next to the main YAML config file:

    config
    ├── email_templates
    │   ├── aborted-reload.handlebars
    │   └── failed-reload.handlebars
    ├── production_template.yaml
    └── schedule_template.yaml

It's important to understand when schedules are stored to and loaded from disk:

- The schedule file is read from disk when Butler starts.
- When schedules are added, changed or deleted using the APIs, the set of schedules currently in Butler's memory will be written to the schedule YAML file on disk.

## Schedule file format

The schedule file contains an array of zero or more schedule entries.

- The cron pattern in the `cronSchedule` property can be either 6 positions (left-most character is seconds) or 5 positions (left-most character is minutes).
- `qlikSenseTaskId` is the id of the task to be started. The Task view in the QMC is useful for getting these IDs.
- The `name` property is for reference only. There may in theory be multiple schedule entries with the same (probably not a good idea though).
- The `id` property must be unique. If a schedule is created using the API, the schedule id will be a GUID - but any unique string can be used.
- `startupState` determines whether the schedule will be started or remain stopped when Butler starts.
- `lastKnownState` is the the schedule's last known state (running/stopped) known to Butler at the time when the schedule file was written to disk.
- `tags` are purely are way to categorize schedules. Not used by Butler in any way, nor are they related to Qlik Sense tags in any way.

A 6 position schedule that starts a task every 30 seconds can look like this:

```yaml
butlerSchedule:
  - name: Every 30 sec
    cronSchedule: "*/30 * * * * *"
    timezone: Europe/Stockholm
    qlikSenseTaskId: 0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b
    startupState: started
    tags:
      - Sales
      - abc 123 åäö
      - Transform
    id: task-1
    lastKnownState: started
```

A schedule that starts a task at the top of every 2nd hour looks like this:

```yaml
butlerSchedule:
  - name: Every 2 hours
    cronSchedule: 0 */2 * * *
    timezone: Europe/London
    qlikSenseTaskId: 0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b
    startupState: started
    tags:
      - Finance
      - Extract
    id: task-2
    lastKnownState: started
```

A full description of the scheduler and its file format is available in the [Reference docs](/docs/reference/scheduler) section.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Scheduler for Qlik Sense tasks
  scheduler:
    enable: false                                     # Should Butler's reload task scheduler be started?
    configfile: config/schedule.yaml                  # Path to file containing task start schedules
  ...
  ...
```
