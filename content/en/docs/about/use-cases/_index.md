+++ 
title = "Use cases" 
description = "How can Butler be used?"
weight = 30
+++

### More flexible scheduling of app reloads in QSEoW

Using the scheduler built into Qlik Sense you can't for example create schedules that are limited to a parts of a day.  
This is a pretty common scenario though - you want to reload an app hourly from say 3 am to 3 pm.

You *can* set this up in Sense, but it involves creating *a lot* of triggers for the reload task, which becomes a nightmare to maintain.

[Butler's task scheduler](/docs/concepts/scheduler) is built on Cron, which has been used in Linux for decades. Battle proven and very flexible.

### Passing parameters between reload tasks

This has always been hard both in QlikView and Sense.

[Butler's key-value store](/docs/concepts/key-value/) makes it much easier to pass values from one app reload to the next.

### Storing state across several apps

The key-value store can also be used to keep state in general across several apps or parts of a Qlik Sense environment. Maybe a Development cluster needs to share some information with the Test and Production clusters? Easily solved using Butler's key-value store.

#### Time-to-live (TTL) for key-value pairs

Key-value pairs can optionally be set up with a time-to-live (ttl) parameter. If ttl is set, the KV pair will auto-delete when the ttl expires.

### Start reloads from load script or from upstream data sources

**Trigger Sense reload tasks from a reload script**. This makes it possible to start different Sense tasks based on what data has been read from a database, what time of day it is etc.

**Trigger Sense reloads from external systems**. When new data is available in a source database, that database trigger a reload in Sense, and the data is loaded from database to Sense. This way delays caused by Sense polling for data are minimized and data arrives at end users as quickly as possible.

### Make new data reach end users as quickly as possible

See above. Have the upstream data source initiate Sense app reloads, either via Butler's REST API or via MQTT messages sent to Butler.

### Using MQTT to notify downstream systems that Sense is done processing data

**Send and receive MQTT publish-subscribe messages**. MQTT (and the pubsub concept in general) is a great way for systems to communicate reliably with each other.

### Instant notifications when reload tasks fail

**Information about failing tasks** can be sent to a Slack channel. This gives sysadmins real-time insight into what's happening with respect to task execution.

### Create directories, copy/move/delete files

In "standard mode" apps reloading in Qlik Sense Enterprise on Windows can't access the file system of the Sense servers. This is a good thing because it adds a lot of security.

From time to time you need to delete temp QVDs though, or copy or move data files from one directory to another.

Butler has REST API endpoints for these use cases, but as they are locked down to only work on specific directiories they don't result in the same security issues as seen in for example QlikView or Sense running in legacy mode.

### Extract metadata for apps

**Extract metadata about Sense apps**. Exporting an app as JSON can be very useful for backup purposes, or to take regular snapshots of all apps in Sense cluster.

### Post messages to Slack

**Slack messages can include full formatting** (web links, text formatting etc), as well as "poking" users.  
  I.e. notifying specific Slack users that they have a new message. Can for example be used to notify user(s) that an app has reloaded with new data, or that some error condition has occured.
