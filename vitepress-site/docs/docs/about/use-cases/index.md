# Use cases

How can Butler be used?

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

::: tip
This feature is available for both **Qlik Sense client-managed** and **Qlik Sense Cloud**.
:::

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

::: tip
This feature is available for both **Qlik Sense client-managed** and **Qlik Sense Cloud**.
:::

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

Butler includes a REST API that can be used to easily trigger Sense reload tasks or app reloads.

Triggering can be done based on task IDs, app IDs or via tags/custom properties.

## Passing parameters between reload tasks

Butler includes a Qlik Sense [REST connector](https://help.qlik.com/en-US/sense/February2023/Subsystems/Hub/Content/Sense_Hub/DataSource/create-new-connection-REST.htm) file.

That connector is in several of the [example apps](/docs/examples/) and makes it easy to call Butler's REST API.  
The example is in the _3_Monitoring_apps.qvf_ file [here](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

A typical use case is when reload tasks need to communicate with each other, passing information between tasks. More info [here](/docs/concepts/key-value/).

## Storing state across several apps

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

- Handling of time zones. While doable, it's not as elegant as it could/should be.
- Chaining tasks using events is possible, but only for success/failed events. More granular events (reload started etc) are not available.
- Using 3rd party scheduling tools (cron on Linux, AutoSys, Control-M etc) is often preferred in enterprise environments. QSEoW doesn't offer API endpoints to start arbitrary tasks in a clean way.

Butler include a scheduler based on the [Cron](https://en.wikipedia.org/wiki/Cron) concept (available in all Linix and Unix systems). Using this standard it becomes very easy to create new reload schedules, for example "run this task every 3rd Wednesday at 2:25 pm".

Butler's /docs/concepts/scheduler/ endpoint can be disabled if not needed.

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

Loading data into Sense means that there will be QVD files and other files that need to be managed.

Butler provide REST endpoints that make it easy to create directories, copy/move/delete files.

QVD creation: Butler includes an endpoint for creating directories with the standardised QVD folder structure, i.e. first each letter of the alphabet, and then for each of those letters all two-letter combinations. That folder structure is then used to store QVD files based on the first two letters of each QVD file. The end result is a directory structure where there's never too many QVD files in a single directory - which is good for performance reasons.

## Extract metadata for apps

Qlik Sense apps contain lots of metadata that can be useful for governance, lineage, troubleshooting and other purposes.

Butler makes it easy to extract app metadata (i.e. definitions of all sheets, charts, listboxes etc) and save it in a structured format (JSON) on disk.

## Easily post messages to Slack

Posting messages to Slack (or MS Teams or email) is not exactly rocket science, but it's still convenient to have a clean REST API that can be called from Sense load scripts or other systems to send messages to Slack.

More info [here](/docs/reference/rest-api/#post-to-slack).

## Monitor Windows services

Butler can optionally monitor the status of Windows services and send alert messages when services are stopped or in other non-running state.

## Monitor and release Qlik Sense user licenses

Qlik Sense user access licenses cost money.  
In some cases quite a lot of money.

It therefore makes sense to actively monitor which users have consumed user licenses and how old those licenses are.

Butler can optionally monitor user licenses and automatically release (=make available to other users) user licenses that haven't been used for a configurable number of days.

The logic is: If a user license hasn't been used for 30 days (configurable), it's probably ok to release that license and make it available to other users.

Works only with Qlik Sense Enterprise on Windows.  
More info [here](/docs/concepts/qlik-sense-access-licenses/).