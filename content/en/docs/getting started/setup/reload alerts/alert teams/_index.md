---
title: "Reload alerts via Microsoft Teams"
linkTitle: "MS Teams"
weight: 50
description: >
  Description of how reload alerts can be sent as Microsoft Teams messages.
---

## What's this?

Butler can send two kinds of alert messages via Teams:

- When a scheduled or started from the QMC reload task fails.
- When a scheduled or started from the QMC reload task is somehow stopped.

See the [Concepts section](/docs/concepts/alerts-slack-teams/) for additional details.

A complete reference to the config file format is found [here](/docs/reference/config-file/).

## Basic vs formatted Teams alerts

Teams alerts come in two forms:

- Customizable formatting using a template concept. A standard template that will fit most use cases is included with Butler. With this option the last part of the script log can be included in the message, allowing you to tell from the Teams message what caused the reload to fail.
- A fixed, more basic format that is built into Butler. No template file needed.

Which option to go for depends on whether you want just a notification that something went wrong, or if you want as much detail as possible in the Teams message.

### Sample message with custom formatting

A "reload task failed" Teams message using the custom formatting option could look like this:

![alt text](/img/failed-reload-teams-formatted_1.png "Reload failed alert email")  

Here's how to set it up:

1. Create an incoming webhook in Teams, take note of its URL (you will need it in step 2 below).
2. Edit the Teams section of the config file i.e. the settings in `Butler.teamsNotification.reloadTaskFailure` and/or `Butler.teamsNotification.reloadTaskAborted` sections of the confi file.

   The `messageType` property should be set to `formatted`.  
   The `basicMsgTemplate` property is not used with formatted messages and can thus be left empty,
3. Edit the template file(s) as needed, these are specified by `Butler.teamsNotification.reloadTaskFailure.templateFile` and `Butler.teamsNotification.reloadTaskAborted.templateFile`. They are using the Handlebars templating engine, to which Butler provides template fields with actual values.

   The available template fields are described [here](/docs/reference/alert-template-fields/).

   Sample template files are available in the GitHub repository's [src/config/teams_templates](https://github.com/ptarmiganlabs/butler/tree/master/src/config/teams_templates) directory.
4. Restart Butler if it's already running.

### Sample message with basic formatting

A "reload task failed" Teams message with basic formatting could look like this:

![alt text](/img/failed-reload-teams-basic_1.png "Reload failed alert email")  

To set it up:

1. Create an incoming webhook in Teams if you don't already have one, take note of its URL (you will need it in step 2 below).
2. Edit the Teams section of the config file i.e. the settings in `Butler.teamsNotification.reloadTaskFailure` and/or `Butler.teamsNotification.reloadTaskAborted` sections of the confi file.

   The `messageType` property should be set to `basic`.  
   The `basicMsgTemplate` property is the message that will be sent via Teams. [Template fields](/docs/reference/alert-template-fields/) can be used.
3. Restart Butler if it's already running.

## Customizing Teams messages

When using the formatted Teams alerts you have full freedom to create the alert *you* need.  
Behind the scenes Teams messages (or "message cards" in MS Teams lingo) are constructed using JSON. Each Teams message consists of one or more parts defined in that JSON object.

The [Teams documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using) contains a wealth of information.

When it comes to Butler, it uses the [Handlebars](https://handlebarsjs.com/) templating engine to render a template file into a MS Teams JSON object that is then sent to the Teams webhook API.

A few things to keep in mind when creating custom Teams messages:

- The handlebars syntax itself must be correct. If incorrect no Teams JSON object will be created. And no Teams message sent.
- The handlebars template must result in a JSON object that adheres to Teams's specifications for JSON payloads.  
  If the JSON syntax is somehow invaid the Teams API will return errors and no messages sent. JSON can be pretty sensitive to details, there should for example not be any trailing commas in properly formatted JSON objects.

Some useful links to Teams' documentation:

[Sending messages to connectors and webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using): Covers how to use Teams webhooks to sent richly formatted messages to Teams.  
[Message card playground](https://messagecardplayground.azurewebsites.net): Experiment with different card layouts etc in an online sandbox environment.  

## How it works

{{% alert title="Remember" color="warning" %}}
Don't forget to create the log appender .xml files on the Sense server(s).  
[This page](../) describes how.

Those xml files are the foundation on top of which all Butler alerts are built - without them the alerts described on this page won't work.
{{% /alert %}}

The concept is the same as for [all alert types](/docs/getting-started/setup/reload-alerts/#how-it-works).

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for notifications and messages sent to MS Teams
  teamsNotification:
    enable: false
    reloadTaskFailure:
      enable: false
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted     # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload failed: "{{taskName}}"'      # Only needed if message type = basic
      rateLimit: 300             # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/teams/template/directory/failed-reload.handlebars
    reloadTaskAborted:
      enable: false
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted     # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload aborted: "{{taskName}}"'       # Only needed if message type = basic
      rateLimit: 300             # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/teams/template/directory/aborted-reload.handlebars
  ...
  ...
  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started? true/false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998
  ...
  ...
```
