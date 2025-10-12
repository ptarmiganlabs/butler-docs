# Use cases

Butler can be used to solve various challenges in Qlik Sense environments, here are some examples:

- [Use cases](#use-cases)
  - [Instant notifications when reload tasks fail or are stopped](#instant-notifications-when-reload-tasks-fail-or-are-stopped)
  - [Forward failed reload events to incident management systems (New Relic, Signl4)](#forward-failed-reload-events-to-incident-management-systems-new-relic-signl4)
  - [Send alerts when reload tasks succeed](#send-alerts-when-reload-tasks-succeed)
  - [Use InfluxDB/Grafana or New Relic to track Butler memory usage](#use-influxdbgrafana-or-new-relic-to-track-butler-memory-usage)
  - [Save a copy of the complete reload log for all failed reload tasks](#save-a-copy-of-the-complete-reload-log-for-all-failed-reload-tasks)
  - [Start reload tasks from load script or from upstream systems](#start-reload-tasks-from-load-script-or-from-upstream-systems)
  - [Passing parameters between reload tasks](#passing-parameters-between-reload-tasks)
  - [Sharing state between several apps](#sharing-state-between-several-apps)
    - [Time-to-live (TTL) for key-value pairs](#time-to-live-ttl-for-key-value-pairs)
  - [Flexible scheduling of app reloads in Qlik Sense Enterprise on Windows](#flexible-scheduling-of-app-reloads-in-qlik-sense-enterprise-on-windows)
  - [Make new data reach end users as quickly as possible](#make-new-data-reach-end-users-as-quickly-as-possible)
  - [Using MQTT to notify downstream systems that Sense is done processing data](#using-mqtt-to-notify-downstream-systems-that-sense-is-done-processing-data)
  - [Create directories, copy/move/delete files](#create-directories-copymovedelete-files)
  - [Extract metadata for apps](#extract-metadata-for-apps)
  - [Easily post messages to Slack](#easily-post-messages-to-slack)
  - [Monitor Windows services](#monitor-windows-services)
  - [Monitor and release Qlik Sense user licenses](#monitor-and-release-qlik-sense-user-licenses)

## Instant notifications when reload tasks fail or are stopped

**Information about failing tasks** can be sent as emails, to Microsoft Teams, Slack, as MQTT messages or outgoing webhooks.

::: tip
This feature is available for both **Qlik Sense client-managed** and **Qlik Sense Cloud**.
:::

Email, Slack and MS Teams notifications all use a templating concept where template files describe what the alert message should look like. This makes it possible to use rich formatting, including HTML and Markdown. A rich set of template variables help making the notifications dynamic and relevant.

Before the alert is sent the template is populated with actual data from the failed reload task (client-managed Sense) or app reload (Sense Cloud).

For email alerts both subject and body of the email can be templated.

For both Slack and Teams there are options to use more flexible/configurable alert formats and more basic pre-configured alerts.

The result is a very powerfulk tool for both QSEoW sysadmins and those responsible for Qlik Cloud tenants, who both want to be notified when reloads fail.

More info in the [Concepts section](/docs/concepts/reload-tasks/).

## Forward failed reload events to incident management systems (New Relic, Signl4)

Butler offers advanced failed reload alerts via Slack, Teams, email and outgoing webhooks.  
Configurable templates means you can customize emails/Teams/Slack messages.

Sometimes you want a bit more structure though.  
This is especially true when Sense is used in the enterprise.

Butler integrates with both [Signl4](https://www.signl4.com) and [New Relic](https://newrelic.com).  
Both offer incident management features on both the web and via mobile clients.

Information about failed/aborted reloads can be sent to one or more New Relic accounts.  
Tags for the reload task and associated app is sent to New Relic as metadata for the event/log entry that's created there.

More info in the [Concepts section](/docs/concepts/reload-tasks/). TODO

## Send alerts when reload tasks succeed

Knowing about failed reloads is important, but sometimes it's just as important to know when a reload has succeeded.

Get emails when those important reloads have completed successfully.  
Nicely formatted with all the details you need.

Controlling which tasks should send success alerts is done using custom properties or via Butler's config file.

More info in the [Concepts section](/docs/concepts/successful-reloads.html).

## Use InfluxDB/Grafana or New Relic to track Butler memory usage

Butler can be configured to log its own memory usage to [InfluxDB](https://www.influxdata.com/products/), from where it can be visualized using [Grafana](https://grafana.com).  
This is useful for understanding the resource consumption of Butler and ensuring it operates efficiently.

If you prefer using [New Relic](https://newrelic.com) that's possible too - sending Butler memory metrics to New Relic is super simple: Just add your New Relic credentials in the YAML config file or as command line options when starting Butler and you're set.

## Save a copy of the complete reload log for all failed reload tasks

::: tip
This feature is available for both **Qlik Sense client-managed** and **Qlik Sense Cloud**.
:::

Let's say a scheduled reload task fails.

This can happen due to lots of reasons, from uncontrollable events that are impossible to predict to bugs in the script of a Sense app.

No matter what the cause is, as a Sense administrator you probably want to investigate the script reload logs.

Butler can send notifications (Slack, Teams, email, webhooks, ...) when reloads fail.  
These notifications can include the last 20-30-40 (configurable!) lines of the script log and this usually gives a good idea of what caused the reload to fail.

But what if you want to look at the _complete_ reload log of that failed app reload?

So far you would have to dig into the log directory on the Sense server (for client-managed Sense) and find that specific reload log file among potentially thousands of other log files. Not very effective.
For Sense Cloud you would have to download the log file from the Sense Cloud hub. Doable, but could be easier.

Butler can store a copy of the complete reload log of failed reload tasks/app reloads in directories that you specify.  
The log files are stored in separate directories, one for each date. Sense Cloud logs are stored in a separate directory tree from client-managed Sense logs.

This makes it easy to find the log file you are interested in.

## Start reload tasks from load script or from upstream systems

Trigger Sense reload tasks from a reload script: This makes it possible to start different Sense tasks based on what data has been read from a database, what time of day it is etc.
Starting a task from the reload script is as easy as

`Call StartTask('fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c')`.

Trigger Sense reloads from external systems: When new data is available in a source database, that database can trigger a reload in Sense, and the data is loaded from the database into Sense. This way delays caused by Sense polling for data are minimized and data arrives at end users as quickly as possible.

Starting reload tasks using REST API is described [here](https://butler.ptarmiganlabs.com/docs/examples/start-task/start-task-from-rest/). TODO  
Using MQTT messages to achieve this is described [here](https://butler.ptarmiganlabs.com/docs/examples/start-task/start-task-from-mqtt/). TODO

## Passing parameters between reload tasks

This has always been hard both in QlikView and Sense.

Butler’s [key-value store](https://butler.ptarmiganlabs.com/docs/concepts/key-value/) TODO makes it much easier to pass values from one app to the next in a reload chain.

## Sharing state between several apps

The key-value store is a great solution if you have several Sense apps that need to have visibility to some shared state.

Set a value from one app, use it in another.

Use case example: You have an app A that determines what geographic region should be processed (EMEA, Americas, APAC etc).

App A saves this information to the key-value store.  
Apps B, C and D retrieve the geographic region from the key-value store and only reloads the data associated with that geographic region.

### Time-to-live (TTL) for key-value pairs

Each key-value pair (KV pair) is associated with a namespace. Each namespace in turn has an optional time-to-live (TTL) value.

This means that a KV pair can automatically be deleted after some time. Very useful to keep the KV store from growing too large when used in automated environments.

## Flexible scheduling of app reloads in Qlik Sense Enterprise on Windows

While QSEoW includes a competent reload scheduler, there are aspects of it that could be better:

- Handling of time zones. While doable, it's not as elegant as it could be.
- Chaining tasks using events is possible, but only for success/failed events. More granular events (reload started etc) are not available.
- Using 3rd party scheduling tools (cron on Linux, AutoSys, Control-M etc) is often preferred in enterprise environments. QSEoW doesn't offer API endpoints to start arbitrary tasks in a clean way.

Butler include a scheduler based on the [Cron](https://en.wikipedia.org/wiki/Cron) concept (available in all Linix and Unix systems). Using this standard it becomes very easy to create new reload schedules, for example "run this task every 3rd Wednesday at 2:25 pm".

The scheduler can be controlled via a separate config file on disk or Butler's [REST API](https://butler.ptarmiganlabs.com/docs/concepts/scheduler/). TODO

## Make new data reach end users as quickly as possible

This is usually about setting up reload chains, where one app refreshes its data from a database, followed by another app that gets its data from the first app and so on.

When the entire chain has completed the end users can be (automatically) notified that new data is available, for example via Slack or Teams.

Reload chains can be set up using standard Qlik Sense tasks, but that approach is often complex and fragile.
Butler makes this easier by being able to start any task based on task/app tags, custom properties on tasks/apps etc.

Or - if using the scheduler feature - the entire chain can be set up in a single YAML config file, as a single entity.

## Using MQTT to notify downstream systems that Sense is done processing data

[MQTT](https://mqtt.org) is a light weight, open messaging protocol, perfectly suited for the kind of system-to-system communication that's often needed around Qlik Sense.

Butler can act as MQTT client, sending messages to MQTT brokers when various events occur (reload task events, user login/logout events etc). Other systems can easily and reliably get such messages by subscribing to MQTT topics.

If your organisation already use MQTT (it's common in IoT scenarios) you can probably re-use that infrastructure for Sense integration.

## Create directories, copy/move/delete files

In “standard mode” apps reloading in Qlik Sense Enterprise on Windows can’t access the file system of the Sense servers. This is a good thing because it adds a lot of security.

From time to time you need to delete temp QVDs though, or copy or move data files from one directory to another.

Butler has REST API endpoints for these use cases, but as those endpoints are locked down to only work on specific, configurable directories they don’t result in the same security issues as seen in for example QlikView or Sense running in legacy mode.

More info [here](https://butler.ptarmiganlabs.com/docs/examples/file-copy-move-delete/). TODO

## Extract metadata for apps

Qlik Sense apps contain lots of metadata that can be useful for governance, lineage, troubleshooting and other purposes.

Doing regular snapshots of all apps in a Sense cluster is a fast and space-effective way of keeping point-in-time backups.

The [REST API documentation](https://butler.ptarmiganlabs.com/docs/reference/rest-api/?operationsSorter=alpha) TODO has full docs on this.

## Easily post messages to Slack

Posting messages to Slack is not exactly rocket science, but it's still convenient to have a clean REST API that can be called from Sense load scripts or other systems to send messages to Slack.

More info [here](/docs/reference/rest-api). TODO

## Monitor Windows services

Butler can monitor the status of Windows services and send alert messages when services are stopped or in other non-running state.

## Monitor and release Qlik Sense user licenses

Butler can monitor the usage of Qlik Sense user licenses and store the data in InfluxDB, from where the license data can be visualized in Grafana. This makes it easy to track (and alert if needed) on the number of used licenses, how many are available and when it’s time to get more licenses.

Butler can also automatically release Professional and Analyzer user licenses that have been inactive for a certain period of time. This is useful in environments where some users use Sense sporadically, for example only during certain times of the year. In such cases it's a waste of resources to keep the license assigned to the user when it's not being used.

Works with Qlik Sense Enterprise on Windows.  
More info [here](/docs/concepts/qlik-sense-licenses/access-licenses). TODO
