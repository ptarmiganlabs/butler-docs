---
title: "When things don't work as expected"
linkTitle: "When things don't work"
weight: 9000
description: >
  Tips and tricks for troubleshooting Butler.
---

Butler is a complex piece of software, and it is not uncommon to run into issues when [setting up and configuring](/docs/getting-started/setup/) Butler.  
In the vast majority of cases, the issues are caused by misconfiguration, and not by bugs in the tool itself.

This page contains some tips and tricks that can be useful when troubleshooting a Butler instance.

## General things to check

### Is Butler running?

The first thing to check is if Butler is running at all.

If Butler is running as a Windows service, check the Windows Services applet to see if the service is running.

If Butler is running as a Docker container, check the Docker container status with the `docker ps` command.

### Logs

Make sure logging to file is enabled in the Butler configuration file.  
Take note of the log file location.

Then check the log files for errors and warnings.

In theory errors and warnings can occur as part of normal operation, but that should be rate.  
If there are errors or warnings during startup, or if there are a lot of errors and warnings, then there is most likely a problem.

You can also try increasing the log level to `verbose` or even `debug` to get more information about what's happening, and where in Butler the problem is occurring.

Logging level is configured in the Butler configuration file or via the `--loglevel` command line parameter (which takes precedence over the configuration file).

## Incorrect config file

The Butler configuration file is a YAML file, and it is easy to make mistakes when editing it.

Butler validates the configuration file when it starts and if there are any syntax errors in the file, Butler will not start.  
It will also show what the error is.

Can look like below, starting Butler 13.0 with a 12.x config file on Windows Server 2019:

```text
.\butler.exe --configfile .\config\butler-config.yaml
...
...
2024-10-15T06:42:34.564Z info: CONFIG: Influxdb enabled: true
2024-10-15T06:42:34.565Z info: CONFIG: Influxdb host IP: 10.11.12.13
2024-10-15T06:42:34.568Z info: CONFIG: Influxdb host port: 8086
2024-10-15T06:42:34.569Z info: CONFIG: Influxdb db name: butler
2024-10-15T06:42:35.512Z error: VERIFY CONFIG FILE: /Butler/scriptLog/storeOnDisk : must have required property 'clientMan
2024-10-15T06:42:35.513Z error: VERIFY CONFIG FILE: /Butler/scriptLog/storeOnDisk : must have required property 'qsCloud'
2024-10-15T06:42:35.516Z error: VERIFY CONFIG FILE: /Butler/scriptLog/storeOnDisk : must NOT have additional properties
```

Here Butler is complaining about missing required properties in the `scriptLog` section of the configuration file.  
And indeed, that section has changed in version 13.0, and the configuration file needs to be updated.

## Feature specific issues

### Failed reload alerts not working

Butler offers quite comprehensive support for dealing with failed or aborted reloads tasks.  
As such there are a number of things that can go wrong and settings that can be misconfigured.

When configured correctly, Butler's logs can look like below.  
In this example Butler has received a reload task failure event from Qlik Sense, and is now sending out notifications to the following channels:

- Script log archive (all failed reload logs are archived to a folder on disk)
- InfluxDB (from where the reload failure can be visualized in a Grafana dashboard)
- Slack
- Teams
- Outgoing webhook
- Email

```text
2024-01-10T05:47:52.992Z info: SCRIPTLOG STORE: Writing failed task script log: C:\tools\butler\config\scriptlog\2024-01-10\2024-01-10_06-47-52_appId=8f1d1ecf-97a6-4eb5-8f47-f9156300b854_taskId=22b106a8-e7ed-4466-b700-014f060bef16.log
2024-01-10T05:47:52.994Z info: INFLUXDB RELOAD TASK FAILED: Sending reload task notification to InfluxDB
2024-01-10T05:47:53.008Z info: SLACK RELOAD TASK FAILED: Rate limiting check passed for failed task notification. Task name: "Reload of Test failing reloads 1 (emojis supported! 🤪)"
2024-01-10T05:47:53.017Z info: TEAMS RELOAD TASK FAILED: Rate limiting check passed for failed task notification. Task name: "Reload of Test failing reloads 1 (emojis supported! 🤪)"
2024-01-10T05:47:53.021Z info: WEBHOOK OUT RELOAD TASK FAILED: Rate limiting check passed for failed task notification. Task name: "Reload of Test failing reloads 1 (emojis supported! 🤪)"
2024-01-10T05:47:53.300Z info: EMAIL RELOAD TASK FAILED ALERT: Rate limiting check passed for failed task notification. Task name: "Reload of Test failing reloads 1 (emojis supported! 🤪)", Recipient: "joe@company.com"
```

{{% notice tip %}}
Rate limiting is defined in the Butler configuration file.  
If the rate limiting condition is met, this will be shown as "Rate limiting check passed for failed task notification" in the logs.
{{% /notice %}}

Things to check:

- Is Butler receiving the reload task events from Qlik Sense?
  - Is the failed/aborted reload UDP server in Butler enabled and working?
    - The UDP server is enabled via the `Butler.udpServerConfig.enabled` setting in the Butler configuration file.
    - The IP address/host and port where Butler is listening for UDP events is configured via the `Butler.udpServerConfig.serverHost` and `Butler.udpServerConfig.portTaskFailure` settings in the Butler configuration file.
    - If working correctly, the log will show a message like this:  
      `TASKFAILURE: UDP server listening on 10.11.12.13:9998`
    - If there is a problem with the UDP server, the log might show a message like this (in this case the IP address is not valid for the Butler host):  
      `TASKFAILURE: Error in UDP error handler: Error: getsockname EINVAL`
  - Check the Butler log files.  
    When Butler receives a reload task event from Qlik Sense, it will check if rate limiting conditions are met, and also log a message about that.
    If there are no such messages:
    - Butler has not received the event from Qlik Sense.
    - Check the XML appender files deployed to the Qlik Sense servers. Make sure they send UDP events to the host and port where Butler is listening.
    - Try pinging the host where Butler is running, from the Qlik Sense server (`ping <butler host>`). If the ping fails, there is probably a network issue.
    - Try doing a telnet to the UDP port where Butler is listening from the Qlik Sense server (`telnet <butler host> <butler port>`). If the telnet fails, there is for sure a network issue.
    - Make sure reload failure events are enabled in the Butler configuration file.
- Are reload failure events received from some Sense nodes, but not others?
  - Check the XML appenders on the nodes where the events are not received.
  - Check the network connectivity between the nodes and the Butler host.
  - The XML appender files can be identical on all nodes.
- Are some reload failure events forwarded to destinations, but not others?
  - Check the Butler log files.
  - Is rate limiting enabled? If so, check the rate limiting settings in the Butler configuration file.
  - If events arrive more frequently than the rate limiting settings allow, Butler will not forward all events.
    A failed rate limiting check will result in a log warning:  
    `Rate limiting failed. Not sending reload notification email for task ...`
- Are alerts forwarded to some destination, but not others?
  - Each destination can be enabled/disabled individually in the Butler configuration file.  
    Make sure the destination you are interested in is enabled.
