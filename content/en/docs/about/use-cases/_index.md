+++ 
title = "Use cases" 
description = "How can Butler be used?" 
weight = 30
+++

<!-- //TODO -->

### More flexible scheduling of app reloads in QSEoW

### Passing parameters between reload tasks

### Storing state across several apps

#### Time-to-live (TTL) for key-value pairs

### Start reloads from load script or from upstream data sources

**Trigger Sense reload tasks from a reload script**. This makes it possible to start different Sense tasks based on what data has been read from a database, for example.

**Trigger Sense reloads from external systems**. When new data is available in a source database, immediately trigger reloads of the Sense apps that use that data.

### Make new data reach end users as quickly as possible

### Using MQTT to notify downstream systems that Sense is done processing data

**Send and receive MQTT publish-subscribe messages**. MQTT (and the pubsub concept in general) is a great way for systems to communicate reliably with each other.

### Instant notifications when reload tasks fail

**Information about failing tasks** can be sent to a Slack channel. This gives sysadmins real-time insight into what's happening with respect to task execution.

### Create directories, move or delete files

### Extract metadata for apps

**Extract metadata about Sense apps**. Exporting an app as JSON can be very useful for backup purposes, or to take regular snapshots of all apps in Sense cluster.

### Post messages to Slack

**Slack messages can include full formatting** (web links, text formatting etc), as well as "poking" users.  
  I.e. notifying specific Slack users that they have a new message. Can for example be used to notify user(s) that an app has reloaded with new data, or that some error condition has occured.
