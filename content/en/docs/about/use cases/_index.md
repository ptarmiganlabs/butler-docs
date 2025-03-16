+++ 
title = "Use cases" 
description = "How can Butler be used?"
weight = 10
+++

- [Instant notifications when reload tasks fail or are stopped](#instant-notifications-when-reload-tasks-fail-or-are-stopped)
- [Forward failed reload events to incident management systems (New Relic, Signl4)](#forward-failed-reload-events-to-incident-management-systems-new-relic-signl4)
- [Send alerts when reload tasks succeed](#send-alerts-when-reload-tasks-succeed)
- [Use InfluxDB/Grafana or New Relic to track Butler memory usage](#use-influxdbgrafana-or-new-relic-to-track-butler-memory-usage)
- [Save a copy of the complete reload log for all failed reload tasks](#save-a-copy-of-the-complete-reload-log-for-all-failed-reload-tasks)
- [Start reload tasks from load script or from upstream systems](#start-reload-tasks-from-load-script-or-from-upstream-systems)
- [Start any reload task from within any Qlik Sense or web app](#start-any-reload-task-from-within-any-qlik-sense-or-web-app)
- [Start reload tasks via REST API based on task tags or custom properties](#start-reload-tasks-via-rest-api-based-on-task-tags-or-custom-properties)
- [Trigger full/partial app reloads from load script or upstream systems](#trigger-fullpartial-app-reloads-from-load-script-or-upstream-systems)
- [Flexible scheduling of app reloads in Qlik Sense Enterprise on Windows](#flexible-scheduling-of-app-reloads-in-qlik-sense-enterprise-on-windows)
- [Passing parameters between reload tasks](#passing-parameters-between-reload-tasks)
- [Storing state across several apps](#storing-state-across-several-apps)
  - [Time-to-live (TTL) for key-value pairs](#time-to-live-ttl-for-key-value-pairs)
- [Make new data reach end users as quickly as possible](#make-new-data-reach-end-users-as-quickly-as-possible)
- [Using MQTT to notify downstream systems that Sense is done processing data](#using-mqtt-to-notify-downstream-systems-that-sense-is-done-processing-data)
- [Create directories, copy/move/delete files](#create-directories-copymovedelete-files)
- [Extract metadata for apps](#extract-metadata-for-apps)
- [Easily post messages to Slack](#easily-post-messages-to-slack)
- [Monitor Windows services](#monitor-windows-services)
- [Monitor and release Qlik Sense user licenses](#monitor-and-release-qlik-sense-user-licenses)

## Instant notifications when reload tasks fail or are stopped

**Information about failing tasks** can be sent as emails, to Microsoft Teams, Slack, as MQTT messages or outgoing webhooks.

{{% notice tip %}}
This feature is available for both **Qlik Sense client-managed** and **Qlik Sense Cloud**.
{{% /notice %}}

Email, Slack and MS Teams notifications all use a templating concept where HTML/Markdown template files describe what the alert message should look like. Before the alert is sent the template is populated with actual data from the failed reload task (client-managed Sense) or app reload (Sense Cloud).

For email alerts both subject and body of the email can be templated.

For both Slack and Teams there are options to use more flexible/configurable alert formats and more basic pre-configured alerts.

The result is a very powerful tool for both QSEoW sysadmins and those responsible for Qlik Cloud tenants, who both want to be notified when reloads fail.

More info [here](/docs/getting-started/setup/reload-alerts/).

## Forward failed reload events to incident management systems (New Relic, Signl4)

Butler offers advanced failed reload alerts via Slack, Teams, email and outgoing webhooks.  
Configurable templates means you can customize emails/Teams/Slack messages.

Sometimes you want a bit more structure though.  
This is especially true when Sense is used in the enterprise.

Butler integrates with both [Signl4](https://www.signl4.com) and [New Relic](https://newrelic.com).  
Both offer incident management features on both the web and via mobile clients.

Information about failed/aborted reloads can be sent to one or more New Relic accounts.  
Tags for the reload task and associated app is sent to New Relic as metadata for the event/log entry that's created there.

## Send alerts when reload tasks succeed

Knowing about failed reloads is important, but sometimes it's just as important to know when a reload has succeeded.

Get emails when those important reloads have completed successfully.  
Nicely formatted with all the details you need.

Controlling which tasks should send success alerts is done using custom properties or via Butler's config file.

More info [here](/docs/concepts/successful-reloads/).

## Use InfluxDB/Grafana or New Relic to track Butler memory usage

Butler can be configured to log its own memory usage to [InfluxDB](https://www.influxdata.com/products/), from where it can be visualized using [Grafana](https://grafana.com).

If you prefer using [New Relic One](https://newrelic.com) that's possible too - sending Butler memory metrics to New Relic is super simple: Just add your New Relic credentials in the YAML config file or as command line options when starting Butler and you're set.

## Save a copy of the complete reload log for all failed reload tasks

{{% notice tip %}}
This feature is available for both **Qlik Sense client-managed** and **Qlik Sense Cloud**.
{{% /notice %}}

Let's say a scheduled reload task fails.

This can happen due to lots of reasons, from uncontrollable events that are impossible to predict to bugs in the script of a Sense app.

No matter what the cause is, as a Sense administrator you probably want to investigate the script reload logs.

Butler can send notifications (Slack, Teams, email, webhooks, ...) when reloads fail.  
These notifications can include the last 20-30-40 lines of the script log and this usually gives a good idea of what caused the reload to fail.

But what if you want to look at the _complete_ reload log of that failed app reload?

So far you would have to dig into the log directory on the Sense server (for client-managed Sense) and find that specific reload log file among potentially thousands of other log files. Not very effective.
For Sense Cloud you would have to download the log file from the Sense Cloud hub. Doable, but could be easier.

Butler can store a copy of the complete reload log of failed reload tasks/app reloads in directories that you specify.  
The log files are stored in separate directories, one for each date. Sense Cloud logs are stored in a separate directory tree from client-managed Sense logs.

This makes it easy to find the log file you are interested in.

## Start reload tasks from load script or from upstream systems

Trigger Sense reload tasks from a reload script: This makes it possible to start different Sense tasks based on what data has been read from a database, what time of day it is etc.  
Starting a task from the reload script is as easy as `Call StartTask('fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c')`.

Trigger Sense reloads from external systems: When new data is available in a source database, that database can trigger a reload in Sense, and the data is loaded from the database into Sense. This way delays caused by Sense polling for data are minimized and data arrives at end users as quickly as possible.

Starting reload tasks using REST API is described [here](/docs/examples/start-task/start-task-from-rest/).  
Using MQTT messages to achieve this is described [here](/docs/examples/start-task/start-task-from-mqtt/).

## Start any reload task from within any Qlik Sense or web app

Some HTML and Javascript magic is also needed, but given Butler's start-task API it's pretty easy to set up a button in a Sense app (or any web app!) to start any Sense reload task.

This can for example be used to allow end users to start an Extract-Transform when they (the user) need refreshed data.

More info [here](/docs/examples/start-task/start-task-from-rest/).

## Start reload tasks via REST API based on task tags or custom properties

Using tags and/or custom properties to identify what tasks should be started can be easier than having to know the tasks IDs.
This both makes it easier for 3rd party systems to start Qlik Sense tasks and easier for Sense admins to manage which tasks should be startable by 3rd party systems.

More info in [Concepts](/docs/concepts/start-sense-tasks/) and [Examples](/docs/examples/start-task/) sections.

## Trigger full/partial app reloads from load script or upstream systems

Sometimes you just want to reload an app without also having to create a reload task.  
When it comes to partial app reloads it's not even possible to do these from a Sense reload task.

Butler's API makes provides a solution: Just pass in an app ID to reload together with task IDs of the tasks that should be started when the app is done reloading (different tasks can be started depending on app reload success or failure).

The partial reload feature is of special interest as it can be used to trigger faster incremental execution of of Extract-Transform reload chains. Great for keeping data in Sense apps updated during the course of a day!

More info [here](/docs/examples/sense-demo-apps/partial-loads/).

## Flexible scheduling of app reloads in Qlik Sense Enterprise on Windows

Using the scheduler built into Qlik Sense you can't for example create schedules that are limited to a parts of a day.  
This is a pretty common scenario though - you want to reload an app hourly from say 3 am to 3 pm.

You _can_ set this up in Sense, but it involves creating _a lot_ of triggers for the reload task, which becomes a nightmare to maintain.

[Butler's task scheduler](/docs/concepts/scheduler) is built on Cron, which has been used in Linux for decades. Battle proven and very flexible.

## Passing parameters between reload tasks

This has always been hard both in QlikView and Sense.

[Butler's key-value store](/docs/concepts/key-value/) makes it much easier to pass values from one app to the next in a reload chain.

## Storing state across several apps

The [key-value store](/docs/concepts/key-value/) can also be used to keep state in general across several apps or parts of a Qlik Sense environment.

Maybe a Development cluster needs to share information in real time with the Test and Production clusters?  
Easily solved using Butler's key-value store.

A demo showing parameter passing between apps is found [here](/docs/examples/reload-chaining/).

### Time-to-live (TTL) for key-value pairs

Key-value pairs can optionally be set up with a time-to-live (ttl) parameter. If ttl is set, the KV pair will auto-delete when the ttl expires.

The key-value store is described [here](/docs/concepts/key-value/).

## Make new data reach end users as quickly as possible

See above. Have the upstream data source initiate Sense app reloads, either via Butler's REST API or via MQTT messages sent to Butler.

## Using MQTT to notify downstream systems that Sense is done processing data

Use Butler's API endpoints for MQTT handling to send and receive MQTT publish-subscribe messages.  
MQTT (and the pubsub concept in general) is a great way for systems to communicate reliably with each other.

A demo app is available, showing how MQTT messages can be sent from Sense load scripts. More info [here](/docs/examples/sense-demo-apps/publish-to-mqtt/).

## Create directories, copy/move/delete files

In "standard mode" apps reloading in Qlik Sense Enterprise on Windows can't access the file system of the Sense servers. This is a good thing because it adds a lot of security.

From time to time you need to delete temp QVDs though, or copy or move data files from one directory to another.

Butler has REST API endpoints for these use cases, but as those endpoints are locked down to only work on specific, configurable directories they don't result in the same security issues as seen in for example QlikView or Sense running in legacy mode.

More info [here](/docs/examples/file-copy-move-delete/).

## Extract metadata for apps

Exporting apps as JSON can be very useful for backup purposes. Doing regular snapshots of all apps in a Sense cluster is a fast and space-effective way of keeping point-in-time backups.

The [REST API documentation](/docs/reference/rest-api-1/?operationsSorter=alpha) has full docs for the `/v4/app/{appId}/dump` endpoint.

## Easily post messages to Slack

Slack messages can include full formatting (web links, text formatting etc), as well as "poking" users.  
I.e. notifying specific Slack users that they have a new message.

Can for example be used to notify user(s) that an app has reloaded with new data, or that some error condition has occurred.

More info [here](/docs/examples/sense-demo-apps/post-to-slack/).

## Monitor Windows services

If Butler is running on Windows (server or even desktop) it can monitor one or more Windows services.  
This feature is **not** available when running Butler on Linux, macOS or in Docker.

Monitoring here means tracking the services' state and sending messages to email, InfluxDB, New Relic, MQTT, Webhooks, Slack or Teams when services stop or start.

It can for example be used to get alerts if a Qlik Sense service for some reason stops.  
The concept is not limited to Qlik Sense services though - any Windows service can be monitored.

## Monitor and release Qlik Sense user licenses

Butler can monitor the usage of Qlik Sense user licenses and store the data in InfluxDB, from where the license data can be visualized in Grafana.
This makes it easy to track (and alert if needed) on the number of used licenses, how many are available and when it's time to get more licenses.

Butler can also automatically release Professional and Analyzer user licenses that have been inactive for a certain period of time.
This is useful in environments where some users use Sense sporadically, for example only during certain times of the year.
In such cases it's a waste of resources to keep the license assigned to the user when it's not being used.

More info [here](/docs/concepts/qlik-sense-licenses/).
