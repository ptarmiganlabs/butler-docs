---
title: 'Session and other user activity events'
linkTitle: 'Session events'
weight: 40
description: >
    Somewhat of a nieche use case, but still interesting:  
    
    By having Sense forward events to Butler when a user (for example) starts a session, Butler can then forward this event to other tools and systems that need to take action when users start or stop using Sense.  
---

The features described on this page use the same concept as email notifications on reload failures, i.e. UDP messages sent from Sense to Butler when certain log events occur.

A slightly silly - but fun - use of these events is to blink a light when when users open apps, log into Sense etc.

Here is a [blog post](https://ptarmiganlabs.com/blog/2017/05/01/let-there-be-blinky-light/) describing this, with a video showing what it looks like.

Green light, someone opens a Sense app. Red light, someone closes a Sense app.

{{< youtube id="T_IxQYdoqJA" modestbranding=true color="red">}}

## Session start/stop, connection open/close

{{% alert title="Remember" color="primary" %}}
The text below assumes the log appenders have been correctly set up for user activity notifications.

Make extra sure the log appender XML file contains the correct IP/port info specified in Butler's UDP server config settings. 
{{% /alert %}}

Butler supports the following user activity events:

- **Session start**: When a user logs into Sense and do not have Sense open in any other window or tab in the browser.
- **Session end**: When a user has not been active for a while, and the session timeout is reached.
- **Connection open**: When a user open a new app, or do a browser refresh of a Sense app
- **Connection close**: When a user closes a browser window or tab, in which a Sense app was open

The response time is usually quite good, typically Butler gets the notifiction from Sense within a second of the actual event taking place.

The information sent to Butler is

- Server name where the log message originated
- What command is associated with the message (session start/stop, connection open/close)
- What Sense user directory the associated user belongs to
- The username of the associated user.

Butler will then use this information and take either of several possible actions depending on which event was received:

### Session start

The following actions are taken

1. Posts the event data to Slack, using the Butler.slackConfig.loginNotificationChannel configuration setting.

2. Publish a message to MQTT, in the topic defined in the Butler.mqttConfig.sessionStartTopic configuration setting.

### Session stop

The following actions are taken

1. Posts the event data to Slack, using the Butler.slackConfig.loginNotificationChannel configuration setting.

2. Publish a message to MQTT, in the topic defined in the Butler.mqttConfig.sessionStopTopic configuration setting.

### Connection open

The following actions are taken

1. Posts the event data to Slack, using the Butler.slackConfig.loginNotificationChannel configuration setting.

2. Publish a message to MQTT, in the topic defined in the Butler.mqttConfig.connectionOpenTopic configuration setting.

### Connection close

The following actions are taken

1. Posts the event data to Slack, using the Butler.slackConfig.loginNotificationChannel configuration setting.

2. Publish a message to MQTT, in the topic defined in the Butler.mqttConfig.connectionCloseTopic configuration setting.

Examples of what the Slack messages will look like can be found on the [UDP client page](/docs/concepts/udp).

## References

- [Qlik's documenation](https://help.qlik.com/en-US/sense-admin/September2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Server-Logging-Using-Appenders.htm) around log appenders and how to hook into the Sense logs is somewhat brief, but does provide a starting point if you want to dive deeper into this topic.

- The main [log4net documentation](https://logging.apache.org/log4net/) (log4net is the logging framework used by Qlik Sense Enterprise) can also be useful.
