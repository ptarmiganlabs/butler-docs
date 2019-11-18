---
title: "Log notifications"
linkTitle: "Log notifications"
weight: 4
description: >
  Instructions for hooking into Qlik Sense's logging framework.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->


## Log4net extenders 

Butler includes a set of xml files that when deployed to the Sense server will create real-time UDP messages for certain log events (tasks failing, user sessions starting/ending etc).  
This is a great way to get real-time notifications when almost any event occurs in a Qlik Sense environment.  

The XML files can be tricky to get right, but a couple of them are included in the Butler repository to get you started. These are also described below.

[Qlik's documenation](https://help.qlik.com/en-US/sense-admin/November2019/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Server-Logging-Using-Appenders.htm) on this topic is somewhat brief, but it does provide a starting point if you want to dive deeper into this topic.  
The main [log4net documentation](https://logging.apache.org/log4net/) (log4net is the logging framework used by Qlik Sense Enterprise) can also be useful.

### Task failure events
  
* XML file found in `log4net_task-failed/LocalLogConfig.xml`. This file includes settings to both send an email and a UDP message to Butler when a task fails. Butler then forwards this message as a MQTT message. 
* XML file should be deployed to the server where reloads are done, in the C:\ProgramData\Qlik\Sense\Scheduler directory.

### User audit events

* XML file found in `log4net_user-audit-event/LocalLogConfig.xml`.
* XML file should be deployed on the server where the proxy is running, in the `C:\ProgramData\Qlik\Sense\Proxy` directory.
* If there multiple proxies on different servers, it might make sense deploying the xml file on all of them, to capture all user audit events.
