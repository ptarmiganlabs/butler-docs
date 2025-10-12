---
title: "Signl4"
linkTitle: "Signl4"
weight: 20
description: >
  Signl4 describes themselves as 
  `<br>``<br>`"Mobile Alerting and Incident Response. Automated Alerting. Anywhere Response"
  `<br>``<br>`
  It's an easy to get started with, SaaS based solution for incident management.`<br>`
  It has good APIs and integrations as well as a generous free trial tier, which makes it great for Qlik Sense admins who wants to try a proper incident management tool.
  `<br>``<br>`
  [www.signl4.com](https://www.signl4.com)
---

## What's this?

Reload failure/abort events can be forwarded to Signl4, where they become incidents that are tracked, (maybe) escalated and eventually (hopefully!) closed.

Example [here](/docs/concepts/incident-management/signl4).

## How it works

Signl4 exposes webhooks through which incidents can be created. The `Butler.incidentTool.signl4.url` is used to specify this webhook.

To use Butler with Signl4 you must first create a Signl4 team. Then note the secret key for that team:

<ResponsiveImage
  src="/img/signl4-team-config-1.png"
  alt="Signl4 team config "
  caption="Signl4 team config"
/>

More info about the webhooks can be found in [Signl4's developer docs](https://connect.signl4.com/webhook/docs/index.html).

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Incident management tools integration
  # Used to trigger incidents in these tools when task reloads fail or are aborted
  incidentTool:
    signl4:
      enable: false               # Enable/disable Signl4 integration as a whole
      url: https://connect.signl4.com/webhook/abcde12345
      reloadTaskFailure:
        enable: false             # Enable/disable reload failed handling in Signl4
        rateLimit: 15             # Min seconds between emails for a given taskID. Defaults to 5 minutes
        serviceName: Qlik Sense   # Signl4 "service name" to use
        severity: 1               # Signl4 severity level for failed reloads
      reloadTaskAborted:
        enable: false             # Enable/disable reload aborted handling in Signl4
        rateLimit: 15             # Min seconds between emails for a given taskID. Defaults to 5 minutes
        serviceName: Qlik Sense   # Signl4 "service name" to use
        severity: 10              # Signl4 severity level for aborted reloads
  ...
  ...
```
