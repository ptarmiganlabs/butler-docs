---
title: "Real-time metrics"
linkTitle: "Real-time metrics"
weight: 200
description: >
  Details about the real-time metrics (active user count etc) provided by Butler.
---


{{% alert title="Note" color="warning" %}}
Looking for info on number of active Sense users, what apps are loaded into the Sense engine or what warnings and errors are logged by Sense?

If yes, you are probably looking for [Butler SOS](https://butler-sos.ptarmiganlabs.com), another open source project in the [Butler family of tools](https://github.com/ptarmiganlabs).

The metrics offered by Butler (this tool) are rather basic and has some inherit design issue that have been adressed in Butler SOS.  

That said, there certainly are cases where Butler's metrics will work fine.  
Take a look at both tools and then decide which suits your needs best. The most common scenario is actually to use both tools: Butler for it's REST API and MQTT integration, and Butler SOS for enterprise grade operational monitoring of Qlik Sense Enterprise.
{{% /alert %}}

## Real time data on active user sessions  

Butler listens to session start/end messages from Sense's log4net logging framework, and keeps records of both how many and which users currently have active sessions.  
Ideal would be if the Sense APIs would provide a list of currently active users, that us however currently not available. 
For that reason Butler's tactic is to listen to log events to determine when users start and end sessions.   
  
There is however a downside to this approach.  

When Butler is first started, it will not know what sessions are currently active. Instead, it will collect that inforamation as time passes.  
This means that the active user count, as well as what specific users are active, might be incorrect when Butler is first started.  
The data will then become more and more exact as users end their sessions, and later restart them (Butler will then capture the session restart, and update its data structures accordingly).

If there are demands for enterprise grade monitoring of a Qlik Sense environment, the [Butler SOS](https://github.com/ptarmiganlabs/butler-sos) tool focuses exclusively on this and might be worth looking into.

## Active users data as MQTT messages

Butler publishes a set of MQTT messages relating to active sessions.  
Whenever a session starts or ends, two MQT messages will be sent:  

* The new number for number of active user sessions is posted to the MQTT topic defined by the config entry Butler.mqttConfig.activeUserCountTopic
* A string array with usernames of all users with active sessions is posted to MQTT topic defined by Butler.mqttConfig.activeUsersTopic


Making this data available as MQTT messages, it can then be used in real-time dashboards or for alerting purposes.  
For example, using [Node-RED's dashboard module](https://github.com/node-red/node-red-dashboard), it is trivial to create a real-time updating dashboard like this one (showing data for the last few days):

![alt text](active_user_sessions.png "Active user sessions")  
