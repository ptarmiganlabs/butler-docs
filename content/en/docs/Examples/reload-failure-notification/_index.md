---
title: "Slack, Teams and Email notifications when app reload tasks fail"
linkTitle: "Reload failure notifications"
weight: 2
date: 2020-12-31
description: >
  
---


## Use MQTT to start Sense tasks

Butler is configured to listen to a specific MQTT topic, qliksense/start_task, and use any message received in that topic as a Sense task ID, which is then started.  
  
For example:  

* A Sense app, used by end users, relies on data in a MS SQL Server database.
* The data in the datbase can be updated at any time.

In order to update the Sense app with data, the most common approach is to schedule reloads of the app at certain intervals, i.e. polling the database.  

But if the database instead posts a MQTT message on the qliksense/start_task topic when new data is available, the database will trigger the Sense app's reload.
  
This way the Sense app will be updated as quickly as possible after new data is availabe in the database.  

***I.e. the end user will have access to more up-to-date data, compared to the polling based solution.***
