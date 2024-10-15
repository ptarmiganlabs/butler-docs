---
title: "Alerts via Slack and Microsoft Teams"
linkTitle: "Alerts via Slack/Teams"
weight: 40
description: >
  Sending alerts to IM services like Slack and Microsoft Teams can be a great way to quickly notify people about urgent issues.
---

## Teams, Slack and email notifications

Microsoft Teams, Slack and email are all notification ***destinations***.

Alert messages/notifications come in two variants: "basic" and "formatted".

### Formatted messages

These messages take full advantage of the formatting available in each notification destination.

Slack has its own way for creating messages with rich layout and formatting - as does Teams and email.

Formatted messages are created using template files.  
Each notification destination has its own set of template files. It's therefore possible to take advantage of each destination's specific features when it comes to formatting the messages sent by Butler.

Message templates can include "template fields". These are placeholders that are replaced with actual event values before the message is sent.

The GitHub repository includes fully functional template files for all destinations.

### Basic messages

Basic message formats are available for all notification destinations.

This message type is useful if you only want a short, basic notification that a task failed or was aborted. The basic formats are pre-defined and are thus easy to set up.

## Microsoft Teams notifications

Basic and formatted reload task failure notifications can look like this in Teams:

![Basic failed reload notification in Microsoft Teams](/img/failed-reload-teams-basic_1.png "Basic failed reload notification in Microsoft Teams")  

![Formatted failed reload notification in Microsoft Teams](/img/failed-reload-teams-formatted_1.png "Formatted failed reload notification in Microsoft Teams")  

The configuration needed for setting this up is described [here](/docs/getting-started/setup/reload-alerts/alert-teams/). 

## Slack notifications

Basic and formatted reload task failure notifications can look like this in Teams:

![Basic failed reload notification in Microsoft Teams](/img/failed-reload-slack-basic_1.png "Basic failed reload notification in Microsoft Teams")  

![Formatted failed reload notification in Microsoft Teams](/img/failed-reload-slack-formatted_1.png "Formatted failed reload notification in Microsoft Teams")  

The configuration needed for setting this up is described [here](/docs/getting-started/setup/reload-alerts/alert-slack/).

## Seeing is believing

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

{{< youtube id="PxYGtCmpu4o" modestbranding=true color="red">}}
