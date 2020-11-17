---
title: "Reload alerts via Microsoft Teams"
linkTitle: "MS Teams"
weight: 30
description: >
  Description of how reload alerts can be sent as Microsoft Teams messages.
---

{{% alert title="Optional" color="primary" %}}
These settings are optional.  
If alerts via Teams are not of interest, just turn off this feature and leave the default values in the config as they are.

Do note though that Butler expects the configuration properties below to exist in the config file, but will *ignore their values* if the related features are disabled.
{{% /alert %}}

## What's this?

Butler can send two kinds of alert messages via Teams:

- When a scheduled, running reload task fails.
- When a scheduled, running reload task is somehow stopped.

## How it works

{{% alert title="Remember" color="warning" %}}
Don't forget to create the log appender .xml files on the Sense server(s).  
[This page](../) describes how.

Those xml files are the foundation on top of which all Butler alerts are built - without them the alerts described on this page won't work.
{{% /alert %}}

The concept is the same as for [alert emails](../alert-emails/).

Butler's Teams alerts don't currently support the templates available for alert emails.

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
  teamsConfig:
    enable: false
    taskFailureWebhookURL: <fill in your web hook URL from MS Teams>
  ...
  ...
  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started? true/false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998
  ...
  ...
```
