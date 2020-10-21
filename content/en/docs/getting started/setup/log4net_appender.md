---
title: "Log notifications"
linkTitle: "Log notifications"
weight: 20
description: >
  Instructions for hooking into Qlik Sense's logging framework.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Log4net extenders

Butler includes a set of xml files that when deployed to the Sense server will create real-time UDP messages for certain log events (tasks failing, user sessions starting/ending etc).  
This is a great way to get real-time notifications when almost any event occurs in a Qlik Sense environment.  

The XML files can be tricky to get right, but a couple of them are included in the Butler repository to get you started. These are described below.

### Task failure events
  
* XML file found in `log4net_task-failed/LocalLogConfig.xml`. This file includes settings to both send an email and a UDP message to Butler when a scheduled reload task fails. Butler then forwards this message as a MQTT message, or to Slack or MS Teams.
* XML file should be deployed to the server where reloads are done, in the C:\ProgramData\Qlik\Sense\Scheduler directory.
* Note that this concepts only works for *scheduled* reload tasks, i.e. reloads started as a result of a *reload task* being started by Qlik's scheduling service. Reloads started from the script editor will not result in these events if they fail.

### User audit events

* XML file found in `log4net_user-audit-event/LocalLogConfig.xml`.
* XML file should be deployed on the server where the proxy is running, in the `C:\ProgramData\Qlik\Sense\Proxy` directory.
* If there multiple proxies on different servers, it might make sense deploying the xml file on all of them, to capture all user audit events.

### References

* [Qlik's documenation](https://help.qlik.com/en-US/sense-admin/September2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Server-Logging-Using-Appenders.htm) on this topic is somewhat brief, but it does provide a starting point if you want to dive deeper into this topic.  

* The main [log4net documentation](https://logging.apache.org/log4net/) (log4net is the logging framework used by Qlik Sense Enterprise) can also be useful.

* Christof Schwarz has a [good post](https://www.linkedin.com/pulse/qlik-sense-task-email-notifications-so-easy-christof-schwarz/?trackingId=X8MEGEmppfSvdukFRbnLwQ%3D%3D) on sending notification emails when scheduled reloads fail, with links to [Levi Turners examples](https://github.com/levi-turner/getting_notified_from_qliksense). These links describe exactly the same concept used in Butler, but with different words - which sometimes helps understanding things. One difference is that Butler (optionally) forwards these event also to Slack, Teeams and MQTT (in addition to email).
