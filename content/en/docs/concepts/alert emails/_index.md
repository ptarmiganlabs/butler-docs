---
title: "Alert emails"
linkTitle: "Alert emails"
weight: 30
description: >
  Overview of the various kinds of alert emails Butler can send.
---
<!-- TODO -->

## Scheduled vs manual app reloads

It might not be obvious at first, but there are several kinds of reloads in Qlik Sense Enterprise:

1. **Reloads started from QMC.** These are usually created and managed in the QMC. Quite often they are also combined into reload chains. The common thing about these reloads is that they - under the hood - are managed by Sense's scheduling service.
2. **Manual reloads started from script edit.** When developing apps in the standard Sense client/script editor you usually reload the apps from there. This does trigger an app reload, but not via the Sense scheduling service.

The reload failure notifications described here work by looking at log entries written by the scheduling service. When that service writes information to the logs about a failed reload, your logging appender will detect it and send an email, and/or send a UDP message to Butler - who will forward the message to Teams and/or Slack.

## Alert emails

Butler can send two kinds of alert emails:

- When a scheduled reload task fails.
- When a running reload task is stopped.

Alert emails can be formatted using HTML, use CSS styling, emojis etc. There's no reason an alert email can't look good.

Alert emails viewed on a mobile phone give direct insight into what has happened:

|  |  |
|-|-|
| {{< imgproc reload-fail-alert-email-mobile-1.png Fit "600x600" >}}Failed reload alert email on mobile home screen.{{< /imgproc >}} | {{< imgproc reload-fail-alert-email-mobile-2.png Fit "600x600" >}}Failed reload alert email viewed on mobile.{{< /imgproc >}} |

In a regular email client a reload failed email could look like below.

***Note the end of the script*** - the last few lines of the reload log are often very useful when it comes to understanding what caused the reload failure.

![alt text](failed_reload_email_1.png "Reload failed alert email")  

### Basic alert emails also possible

Qlik Sense Enterprise on Windows uses the log4net logging framework to create log files. Log4net is quite flexible and can - among other things - send emails when events such as reload failures occur. There is however little flexibility when it comes to layout and contents of those emails. They are text only (no formatting, tables, different fonts, colors etc) and the email subjects cannot contain any dynamic fields (for example the name of the failed reload task).

The goal of Butler's alert emails is to address these limitations and offer a flexible foundation not only for emails, but for all kinds of alerts.

If you want to explore what's possible using just the features offered by log4net, Christof Schwarz has a [good post](https://www.linkedin.com/pulse/qlik-sense-task-email-notifications-so-easy-christof-schwarz/?trackingId=X8MEGEmppfSvdukFRbnLwQ%3D%3D) on sending basic notification emails when scheduled reloads fail, with links to [Levi Turners great examples](https://github.com/levi-turner/getting_notified_from_qliksense).

## How it works

Butler uses a templating engine called [Handlebars](https://handlebarsjs.com/guide/). It is used when sending all kinds of alert emails supported by Butler.

Slack, MS Teams and MQTT messages are currently not using the templating engine - this is however likely to change in coming Butler versions. Feel free to [add (or +1) a request on GitHub](https://github.com/ptarmiganlabs/butler/issues) if this is of interest to you!

![alt text](/img/butler_log4net_appenders_1.png "Butler high level system overview")  

### Template fields

The Handlebars templating engine looks for *template fields* in the template files you create.

A complete list of template fields - including descriptions - is available in the [Reference](/docs/reference/alert-template-fields) section.

### Not all failed reloads will cause alert emails

While not obvious at first, there are different kinds of reloads taking place in a Qlik Sense Enterprise environment:

- Reloads started by the Sense Scheduler service. These reloads always have a *task* associated with them.

- Reloads started from Sense's standard script editor. These reloads are *not* started by the Sense scheduler, but rather directly in the Sense engine. Progress for such reloads will therefore go to the *engine logs*.

The log appenders that drive Butler's alerts rely on the Scheduler logs - not the engine logs.  
This is an intentional design decision.

It is certainly possible to add log appenders also for engine logs and that way get notified when *any* reload fail. The question is whether that's an interesting use case. In most cases sys admins aren't very interested if reloads that fail during app development - they only care about failures caused by apps in production - i.e. apps driven by the Sense Scheduler. Thus, Butler currently doesn't deal with reload failures reported from the Sense engine.

## References

- [Qlik's documenation](https://help.qlik.com/en-US/sense-admin/September2020/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Deploy_QSEoW/Server-Logging-Using-Appenders.htm) around log appenders and how to hook into the Sense logs is somewhat brief, but does provide a starting point if you want to dive deeper into this topic.

- The main [log4net documentation](https://logging.apache.org/log4net/) (log4net is the logging framework used by Qlik Sense Enterprise) can also be useful.

These links describe how emails can be sent from the log4net logging framework itself, directly to the recipient. Butler includes sameple XML files for this use case too, but Butler takes things further by using the data in the Sense logs to pull in more data around the failed or stopped reload.

In other words - Butler's alert emails are significantly more flexible and contain information (such as script logs) that are not availble using purely log4net.
