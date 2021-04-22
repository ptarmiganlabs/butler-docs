+++ 
title = "Use cases" 
description = "How can Butler be used?"
weight = 30
+++

## Instant notifications when reload tasks fail or are stopped

**Information about failing tasks** can be sent as emails, to Microsoft Teams, Slack, as MQTT messages or outgoing webhooks.

Email, Slack and MS Teams notifications all use a templating concept where HTML/Markdown template files describe what the alert message should look like. Before the alert is sent the template is populated with actual data from the failed reload task.

Both subject and body of email can use the template fields.

For both Slack and Teams there are options to use more flexible/configurable alert formats and more basic pre-configured alerts.

The result is a very poweful tool for QSEoW sysadmins, who get real-time insight into what's happening with respect to task execution.

More info [here](docs/getting-started/setup/reload-alerts/).

## Start reload tasks from load script or from upstream systems

Trigger Sense reload tasks from a reload script: This makes it possible to start different Sense tasks based on what data has been read from a database, what time of day it is etc.  
Starting a task from the reload script is as easy as `Call StartTask('fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c')`.

Trigger Sense reloads from external systems: When new data is available in a source database, that database can trigger a reload in Sense, and the data is loaded from the database into Sense. This way delays caused by Sense polling for data are minimized and data arrives at end users as quickly as possible.

Starting reload tasks using REST API is described [here](/docs/examples/start-task-from-rest/).  
Using MQTT messages to achieve this is described [here](/docs/examples/start-task-from-mqtt/).

## Start any reload task from within any Qlik Sense or web app

Some HTML and Javascript magic is also needed, but given Butler's start-task API it's pretty easy to set up a button in a Sense app (or any web app!) to start any Sense reload task.

This can for example be used to allow end users to start an Extract-Transform when they (the user) need refreshed data.

More info [here](/docs/examples/start-task-from-rest/).

## Trigger full/partial app reloads from load script or upstream systems

Sometimes you just want to reload an app without also having to create a reload task.  
When it comes to partial app reloads it's not even possible to do these from a Sense reload task.

Butler's API makes prvovides a solution: Just pass in an app ID to reload together with task IDs of the tasks that should be started when the app is done reloading (different tasks can be started depending on app reload success or failure).

The partial reload feature is of special interest as it can be used to trigger faster  incremental execution of of Extract-Transform reload chains. Great for keeping data in Sense apps updated during the course of a day!

More info [here](/docs/examples/sense-demo-apps/partial-loads/).

## Flexible scheduling of app reloads in Qlik Sense Enterprise on Windows

Using the scheduler built into Qlik Sense you can't for example create schedules that are limited to a parts of a day.  
This is a pretty common scenario though - you want to reload an app hourly from say 3 am to 3 pm.

You *can* set this up in Sense, but it involves creating *a lot* of triggers for the reload task, which becomes a nightmare to maintain.

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

Butler has REST API endpoints for these use cases, but as those endpoints are locked down to only work on specific, configurable directiories they don't result in the same security issues as seen in for example QlikView or Sense running in legacy mode.

More info [here](/docs/examples/file-copy-move-delete/).

## Extract metadata for apps

Exporting apps as JSON can be very useful for backup purposes. Doing regular snapshots of all apps in a Sense cluster is a fast and space-effective way of keeping point-in-time backups.

The [REST API documentation](http://localhost:1313/docs/reference/rest-api/) has full docs for the `/v4/app/{appId}/dump` endpoint.

## Post messages to Slack

Slack messages can include full formatting (web links, text formatting etc), as well as "poking" users.  
I.e. notifying specific Slack users that they have a new message.

Can for example be used to notify user(s) that an app has reloaded with new data, or that some error condition has occured.

More info [here](docs/examples/sense-demo-apps/post-to-slack/).
