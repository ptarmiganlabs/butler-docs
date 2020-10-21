---
title: "Scheduler"
linkTitle: "Scheduler"
weight: 30
description: >
  Details about the Butler scheduler. 
---

## Scheduling overview

The scheduler is used to start Sense reloads at specific times, or at certain intervals.

The rationale for having a scheduler in Butler is mainly that Qlik Sense's built-in scheduler doesn't quite have the desired flexibiluty. The Sense scheduler on the other hand offer some features not included in the Butler scheduler, so they complelent each other nicely.

Put differently: Butler's scheduler is great for kicking off the first step if reload chains (or single app reloads), while the QMC scheduler is needed to link the individual parts of reload chains together.

| Feature | Qlik Sense scheduler | Butler scheduler |
| ------- | -------------------- | ---------------- |
| Tasks should run same time each day. | Yes | Yes |
| Tasks should run only some days of the month/wek (ex 1st day of the month or on Wednesdays and Fridays). | Yes | Yes |
| Tasks should run only between certain hours during the day (e.g. every 5 minutes during the first 30 minutes of each hour, between 08.00 and 18.00). | Yes, with lots of manual work | Yes |
| Tasks can be chained together, with one task starting when the previous has finished.  | Yes | - |
| Tasks definitions can be stored in Git and managed by a DevOps workflow. | Yes, with lots of work. | Yes, out of the box |

### Schedules

The Butler scheduler handles zero or more *schedules*, where a schedule is simply a set of information about which Sense reload task should be started when.

While Butler is running it keeps the schedules in memory, but they are also stored on disk in the file specified in the Butler's main config file. This means you can either manage the schedule file manually, or via the [Butler APIs](/docs/reference/rest_api).

The following information is kept about each schdule. Note that some fields are optional and only set when managing schedules via API calls.

| Field name | Descriptions | Example |
| --- | --- | --- |
| name | Descriptive name for the schedule. | Every 2 hours |
| cronSchedule | Cron string. 5 or 6 postitions allowed. If 5 positions used a `0` will be used for seconds. [crontab.guru](https://crontab.guru/) and similar sites are useful for creating the cron string. | 0 */2 * * * |
| timezone | Timezone in which the schedule will execute. List of available timezones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). | Europe/London |
| qlikSenseTaskId | Qlik Sense task that will be started. The task ID can be found in the task view in the QMC. | 0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b |
| startupState | Controls whether this task should be started or left stopped when Butler starts up. <br> If set to "start" or "started", the schedule will be started upon creation. Otherwise it will remain in stopped state. | started |
| tags | Array of tags, can be used to categorise schedules. Optional. | [ finace ETL, abc 123 ] |
| id | Schedule ID. Free text string, can be set to anything as long as it is unique. Schedules created via the REST API will have a GUID as id. | 2f7a6c38-46df-416d-83de-44bdea5cedaa |
| created | Timestamp the schedule was created. Optional when manually adding schedules to schedule file. | 2020-09-29T17:14:35.154Z |
| lastKnownState | The schedule's last known state. Optional when manually adding schedules to schedule file. | started |

### Sample schedule file

A schedule file could look like this:

```yaml
    butlerSchedule:
    - name: Every 30 sec
        cronSchedule: "*/30 * * * * *"
        timezone: Europe/Stockholm
        qlikSenseTaskId: 0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b
        startupState: started
        tags:
        - tag 2
        - abc 123 åäö
        id: c7ec214c-e9ca-40b2-acb4-54648f90dd73
        created: '2020-09-29T14:29:12.283Z'
        lastKnownState: started
    - name: Every 2 hours
        cronSchedule: "0 */2 * * *"
        timezone: Europe/London
        qlikSenseTaskId: 0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b
        startupState: started
        tags:
        - sales ETL
        id: 2f7a6c38-46df-416d-83de-44bdea5cedaa
        created: '2020-09-29T17:14:35.154Z'
        lastKnownState: started
    - name: 00 and 30 minutes past every hour from 06 to 18 on Mon-Fri
        cronSchedule: "0,30 6-18 * * 1-5"
        timezone: Europe/Paris
        qlikSenseTaskId: 0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b
        startupState: started
        tags:
        - finance ETL
        - weekdays
        id: Manually-added-schedule-1
```

A few things to note:

* Schedule 1
  * Uses 6 positions in the cron string. The leftmost position is seconds.
  * This schedule cannot be created in the QMC scheduler, as minutes is the smallest increment there.
    On the other hand, it's questionable if Sense jobs should run more often than once per minute... 
* Schedule 2
  * Uses 5 positions in the cron string. The leftmost position is minutes. The seconds position is implicitly set to 0, which means the schedule will fire at the top of each minute.
  * This schedule can be created in the QMC scheduler.
* Schedule 3
  * This schedule cannot be created in the QMC scheduler.

## Manual vs API created schedules

Schedules are stored in a YAML file on disk. This file is loaded each time Butler is started.

When a new schedule is created using the APIs, all schedule definitions and their current state is written to the schedule YAML file. Thus, if Butler is stopped or restarted, it will also restart all schedules in the same state they were in before the Butler stop/restart.

There are a couple of differences between manually created schedules (i.e. ones that are added directly to the YAML file) and schedules created via the APIs:

* The `created` field in a schedule is optional. It is set when a schedule is created using the APIs. You can set it when manually editing the schedule file, if so desired - but it's not required.
* The `lastKnownState` field is overwritten each time the schedules are saved to disk. This means that you can change this field manually for a schedule in the schedule file on disk, but if you then change the schedule's state (start or stop it), that will trigger a saving of the schedules to disk, and your previous (manual) change will be overwritten.
