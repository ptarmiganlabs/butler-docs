---
title: "Session and other user activity events"
linkTitle: "Session events"
weight: 140
draft: true
description: >
  Somewhat of a niche use case, but still interesting:  

  By having Sense forward events to Butler when a user (for example) starts a session, Butler can then forward this event to other tools and systems that need to take action when users start or stop using Sense.
---

The features described on this page use the same concept as email notifications on reload failures, i.e. UDP messages sent from Sense to Butler when certain log events occur.

A slightly silly - but fun - use of these events is to blink a light when when users open apps, log into Sense etc.

Here is a [blog post](https://ptarmiganlabs.com/blog/2017/05/01/let-there-be-blinky-light/) describing this, with a video showing what it looks like.

Green light, someone opens a Sense app. Red light, someone closes a Sense app.

{{< youtube id="T_IxQYdoqJA" modestbranding=true color="red">}}

## Session start/stop, connection open/close

{{% alert title="Remember" color="primary" %}}
The text below assumes the [log appenders have been set up](/docs/getting-started/setup/user-events/) for user activity notifications.

Make extra sure the log appender XML file contains the correct IP/port info specified in Butler's UDP server config settings.
{{% /alert %}}

The user events log appender that's included with Butler ([GitHub link](https://github.com/ptarmiganlabs/butler/blob/master/docs/log4net_user-audit-event/LocalLogConfig.xml)) captures the following events:

- **Session start**: When a user logs into Sense and does not have an already active Sense session open in some other browser tab or window.
- **Session end**: When a user has not been active for a while and the session timeout is reached, or when the user logs out.
- **Connection open**: When a user opens a new app or does a browser refresh of a Sense app.
- **Connection close**: When a user does a browser refresh of a Sense app or closes a browser window or tab in which a Sense app was open.

The response time is usually quite good, typically Butler gets the notification from Sense within a few seconds of the actual event taking place.

The information sent to Butler is

- Server name where the log message originated.
- What command is associated with the message (session start/stop, connection open/close).
- What Sense user directory the associated user belongs to.
- The username of the associated user.

Butler will then use this information and take either of several possible actions depending on which event was received and settings in Butler's config file.

### Sample Slack and Teams messages

Messages sent to Slack and Teams can look like this:

![User activity events in Slack](/img/user-events-slack-1.png "User activity events in Slack")

![User activity events in Teams](/img/user-events-teams-1.png "User activity events in Teams")

## Enabling Slack, Teams and MQTT messages

The message destinations can be individually enabled or disabled.

- To enable Slack messages, `Butler.slackNotification.enable` and `Butler.slackNotification.userSessionEvents.enable` should both be `true`.
- To enable Teams messages, `Butler.teamsNotification.enable` and `Butler.teamsNotification.userSessionEvents.enable` should both be `true`.
- To enable MQTT messages, `Butler.mqttConfig.enable` should be `true`.

For Slack and Teams, all messages received from the log appender will be forwarded to the respective destination (assuming the destination is enabled). This means you can modify the appender XML files so that Butler received more/fewer/other messages.

The MQTT message is a bit different as it looks at the "command" field in the UDP message and then publish a MQTT message on topic that depends on which command was received:

- "Session start" events will be published to the topic defined in the `Butler.mqttConfig.sessionStartTopic` config setting.
- "Session stop" events will be published to the topic defined in the `Butler.mqttConfig.sessionStopTopic` config setting.
- "Connection open" events will be published to the topic defined in the `Butler.mqttConfig.connectionOpenTopic` config setting.
- "Connection close" events will be published to the topic defined in the `Butler.mqttConfig.connectionCloseTopic` config setting.

## References

- [Qlik's documentation](https://help.qlik.com/en-US/sense-admin/September2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Server-Logging-Using-Appenders.htm) around log appenders and how to hook into the Sense logs is somewhat brief, but does provide a starting point if you want to dive deeper into this topic.

- The main [log4net documentation](https://logging.apache.org/log4net/) (log4net is the logging framework used by Qlik Sense Enterprise) can also be useful.
