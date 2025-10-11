---
title: "Task alerts via Slack"
linkTitle: "Slack"
weight: 40
description: >
  Description of how task alerts can be sent as Slack messages.
---

## What's this?

Butler can send alert messages via Slack for **reload tasks only**:

- When a reload task fails
- When a reload task is stopped/aborted

::: info Task type limitation
Slack notifications are **only available for reload tasks** (failed and aborted).  
This feature is not supported for:
- Distribute tasks
- Preload tasks
- External program tasks
- User sync tasks
- Successful reload tasks

For these task types, use [Email alerts](/docs/getting-started/setup/task-alerts/client-managed/alert-emails/) or [InfluxDB metrics](/docs/getting-started/setup/task-alerts/client-managed/alert-influxdb/) instead.
:::

See the [Concepts section](/docs/concepts/setting-up-teams-webhooks/) for additional details.

A complete reference to the config file format is found [here](/docs/reference/config-file/).

## Basic vs formatted Slack alerts

Slack alerts for reload tasks come in two forms:

- Customizable formatting using a template concept. A standard template that will fit most use cases is included with Butler. Using this option the first and last parts of the script log can be included in the message, allowing you to tell from the Slack message what caused the reload to fail.  
  You can also add buttons to the message that can be used to open any URL you want, or open the app that failed reloading.
- A fixed, more basic format that is built into Butler. No template file needed, but also less detailed.

Which option to go for depends on whether you want just a notification that something went wrong, or if you want as much detail as possible in the Slack message. In most cases the customizable formatting is the best option.

### Sample message with custom formatting

::: tip
The concept described below is the same for failed and aborted reload tasks.  
Each of these have their own settings in the config file.
:::

A "reload task failed" Slack message using the custom formatting option could look like this:

![Reload failed alert email](/img/failed-reload-slack-formatted_1.png "Reload failed alert email")

Here's how to set this up:

1. Create an incoming webhook in Slack, take note of its URL (you will need it in step 2 below).
2. Edit the Slack section of the config file, i.e. the settings in `Butler.slackNotification.reloadTaskFailure`.

   The `messageType` property should be set to `formatted`.  
   The `basicMsgTemplate` property is not used with formatted messages and can thus be left empty,

3. Edit the template file if/as needed, the file is specified in `Butler.slackNotification.reloadTaskFailure.templateFile`. It uses the Handlebars templating engine, to which Butler provides template fields with actual values.

   The available template fields are described [here](/docs/reference/alert-template-fields/).

   Sample template files are included in the release Zip file, and are also available in the GitHub repository's [src/config/slack_templates](https://github.com/ptarmiganlabs/butler/tree/master/src/config/slack_templates) directory.

4. Restart Butler if it's already running.

### Sample message with basic formatting

::: tip
The concept described below is the same for failed and aborted reload tasks.  
Each of these have their own settings in the config file.
:::

A "reload task failed" Slack message with basic formatting could look like this:

![Reload failed alert email](/img/failed-reload-slack-basic_1.png "Reload failed alert email")

To set it up:

1. Create an incoming webhook in Slack if you don't already have one, take note of its URL (you will need it in step 2 below).
2. Edit the Slack section of the config file, i.e. in `Butler.slackNotification.reloadTaskFailure`.

   The `messageType` property should be set to `basic`.  
   The `basicMsgTemplate` property is the message that will be sent via Slack. [Template fields](/docs/reference/alert-template-fields/) can be used.

3. Restart Butler if it's already running.

## Customizing Slack messages

When using the formatted Slack alerts you have full freedom to create the alert _you_ need.  
Behind the scenes Slack messages are constructed from blocks defined in a JSON object. Each block can then contain either plain text, Markdown, images, buttons etc.

The [Slack documentation](https://api.slack.com/messaging/composing/layouts) is the best place for learning how to customize messages.

When it comes to Butler, it uses the [Handlebars](https://handlebarsjs.com/) templating engine to render the template files into Slack JSON objects that are then sent to Slack via their APIs.

A few things to keep in mind when creating custom Slack messages:

- The handlebars syntax itself must be correct. If incorrect no Slack JSON object will be created. And no Slack messages sent.
- The handlebars template must result in a JSON object that adheres to Slack's API specifications.  
  If the JSON syntax is somehow invalid the Slack API will return errors and no messages sent. JSON can be pretty sensitive to details, there should for example not be any trailing commas in properly formatted JSON objects.

Some useful links to Slacks's documentation:

- [Creating rich message layouts](https://api.slack.com/messaging/composing/layouts): General info on how messages are structured and created..
- [Formatting text for app surfaces](https://api.slack.com/reference/surfaces/formatting): How to use markdown, formatting of links, escaping text etc..
- [Reference: Layout blocks](https://api.slack.com/reference/block-kit/blocks): The official docs for creating Slack messages.
- [Block Kit Builder](https://app.slack.com/block-kit-builder/): Great sandbox with readily available examples of different message layouts, syntax and more. Note: You must be logged into your Slack account to use this tool.

### Using custom links in templates

It is also possible to define custom links in the config file, and use them in Slack templates.  
This is described here: [Custom links in alerts](/docs/concepts/custom-links-in-alerts/).

## How it works

::: warning
Don't forget to create the log appender .xml files on the Sense server(s).

[This page](/docs/getting-started/setup/task-alerts/client-managed/#adding-a-log-appender) describes how.

Those xml files are the foundation on top of which all Butler alerts are built - without them the alerts described on this page won't work.
:::

The concept is the same for all alert types, see the [email alerts](/docs/getting-started/setup/task-alerts/#how-it-works) for details.

## Settings in config file

::: info
The configuration below is for **reload tasks only**. Slack notifications are not available for other task types (distribute, preload, external program, user sync).
:::

```yaml
---
Butler:
  ...
  ...
  # Settings for notifications and messages sent to Slack
  slackNotification:
    enable: false
    restMessage:
      webhookURL: <web hook URL from Slack>   # Webhook to use when sending basic Slack messages via Butler's REST API
    reloadTaskFailure:                # Reload task failed in QSEoW
      enable: false
      webhookURL: <web hook URL from Slack>
      channel: sense-task-failure     # Slack channel to which task failure notifications are sent
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload failed: "{{taskName}}"'      # Only needed if message type = basic
      rateLimit: 300                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/slack/template/directory/failed-reload-qseow.handlebars
      fromUser: Qlik Sense
      iconEmoji: ':ghost:'
    reloadTaskAborted:                # Reload task aborted in QSEoW
      enable: false
      webhookURL: <web hook URL from Slack>
      channel: sense-task-aborted     # Slack channel to which task stopped notifications are sent
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload aborted: "{{taskName}}"'       # Only needed if message type = basic
      rateLimit: 300                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/slack/template/directory/aborted-reload-qseow.handlebars
      fromUser: Qlik Sense
      iconEmoji: ':ghost:'

  ...
  ...
  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started? true/false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998
  ...
  ...
```
