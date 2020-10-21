---
title: 'Log event handlers'
linkTitle: 'Log event handlers'
weight: 50
description: >
    Details about the Qlik Sense log events Butler implements special features for.  
    By hooking into Sense log events, it's possible to set up failed reload notifications, trigger actions when users log on/off and more.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Creating log4net appenders

Qlik Sense Enterprise uses the [Apache log4net logging framework](https://logging.apache.org/log4net/). It is used to write all the log files found in the C:\ProgramData\Qlik\Sense\Log directory tree.  
log4net is extensible in that you can attach your own event handlers and in this way get notifications when events of interest occur.

Qlik provides basic [documentation](https://help.qlik.com/en-US/sense-admin/November2019/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Server-Logging-Using-Appenders.htm) for this, unfortunately a lot of trial and error is usually needed when crating new XML files that will be hooked into the framework.

A couple of custom appenders (in the form of XML files) are included with Butler, these are described below.

## Session start/stop, connection open/close

In the `log4net_user-audit-event` folder in the Butler repository there is an XML file that will send a UDP message on port 9997 to Butler when any of the following events occur:

-   **Session start**: When a user logs into Sense and do not have Sense open in any other window or tab in the browser.
-   **Session end**: When a user has not been active for a while, and the session timeout is reached.
-   **Connection open**: When a user open a new app, or do a browser refresh of a Sense app
-   **Connection close**: When a user closes a browser window or tab, in which a Sense app was open

Usually the UDP message is sent very quickly, typically within a second of the app being opened or close, for example.  
The message contains this information:

    %hostname;%property{Command};%property{UserDirectory};%property{UserId}

I.e. the information sent to Butler is

-   Server name where the log message originated
-   What command is associated with the message (session start/stop, connection open/close)
-   What Sense user directory the associated user belongs to
-   The username of the associated user.

The UDP server built into Butler will then extract the data and take several actions, exactly which depending on what event was received.

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

## Task reload errors

In the `log4net_task-failed` folder in the Butler repository there is an XML file that will send a UDP message on port 9998 to Butler when any of the following events occur:

-   **Task failing**: When a Sense task, started by the Sense scheduler, for some reason fails, the XML file make a couple of UDP messages (with slightly different contents) to be sent to Butler. Manually started reloads (from the script editor) that fail will not generate these events.

The message contains this information:

    %hostname;%property{TaskName};%property{AppName};%property{UserId}

I.e. the information sent to Butler is

-   Server name where the log message originated
-   Name of the task
-   Name of the app that the task is associated with
-   Username of the user running the task.

The UDP server built into Butler will then extract the data and take several actions, exactly which depending on what event was received.

### Failing task

The following actions are taken

1. Posts the event data to Slack, using the Butler.slackConfig.taskFailureTopic configuration setting.

2. Publish a message to MQTT, in the topic defined in the Butler.mqttConfig.taskFailureTopic configuration setting.

Examples on how the Slack messages will look can be found on the [UDP client page](/docs/concepts/udp).

### Further reading

The [log notifications setup page](/docs/getting-started/setup/log4net_appender) has a bit more information on this topic, as well as links to external resources.
