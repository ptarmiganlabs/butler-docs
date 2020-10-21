---
title: 'Scheduler'
linkTitle: 'Scheduler'
weight: 20
description: >
    The how and why of the Butler scheduler.
---

## What is a scheduler?

In the context of Qlik Sense, a scheduler is a tool that *triggers* Qlik Sense *tasks* at some specific time or interval.  
Qlik Sense Enterprise has its own, [built-in scheduler](https://help.qlik.com/en-US/sense-admin/September2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/schedulers-overview.htm) that can be accessed via the QMC.

The QMC interface to Sense's standard scheduler lets you create schedules for two kinds of tasks:

* App reload tasks
* User directory sync tasks

## What's wrong with Sense's own scheduler?

The built-in scheduler in Qlik Sense is ok in most aspects, but lack significantly in some.  
Specifically, it doesn't allow you to run a task certain hours of the day. This is a quite common scenario and thus Butler gets its own scheduler to solve the issue.

## The Butler scheduler

Butler's scheduler is based on [cron](https://en.wikipedia.org/wiki/Cron).  
Cron has been the standard scheduler for decades in most Linux systems, it's thus a proven concept.

Features of the Butler scheduler:

* 6 position cron pattern. The leftmost position represents seconds.
* No hard limit on number of schedules that can be created.
* A Qlik Sense task ID is associated with each schedule. When the schedule fires, the associated task is started.
* Schedules can be added either manually in the YAML schedules file (as defined in the main Butler config file) or using [Butler's API](/docs/reference/rest_api). A sample schedule file is included in the GitHub repository. Schedules added using the API will be stored in the schedule YAML file referenced in the main Butler config file.

The two supported schedule formats look like this:

        ┌───────────── seconds (0 - 59)
        │ ┌───────────── minute (0 - 59)
        │ │ ┌───────────── hour (0 - 23)
        │ │ │ ┌───────────── day of the month (1 - 31)
        │ │ │ │ ┌───────────── month (0 - 11)
        │ │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
        │ │ │ │ │ │
        * * * * * *

Valid cron patterns are:

        Asterisk. E.g. *
        Ranges. E.g. 1-3,5
        Steps. E.g. */2

There are quite a few online tools for creating cron patterns, for example [crontab.guru](https://crontab.guru/), [corntab](http://corntab.com/) and [crontab-generator](https://crontab-generator.org/).  

Using a tool like these can save some time when setting things up, but keep in mind that most online tools use minutes as the smallest unit. Some manual tweaking might thus be needed before using the generated pattern in Butler's scheduler.
