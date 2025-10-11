---
title: "Reload alerts via Slack"
linkTitle: "Slack"
weight: 40
description: >
  Description of how app reload failed alerts can be sent as Slack messages.
---

## What's this?

Butler can send two kinds of alert messages via Slack:

- When an app fails during reload.

See the [Concepts section](/docs/concepts/setting-up-teams-webhooks/) for additional details.

A complete reference to the config file format is found [here](/docs/reference/config-file/).

## Basic vs formatted Slack alerts

Slack alerts come in two forms:

- Customizable formatting using a template concept. A standard template that will fit most use cases is included with Butler. Using this option the first and last parts of the script log can be included in the message, making it possible to tell from the Slack message what caused the reload to fail.  
  You can also add buttons to the message that can be used to open any URL you want, or open the app that failed reloading.
- A fixed, more basic format that is built into Butler. No template file needed, but also less detailed.

Which option to go for depends on whether you want just a notification that something went wrong, or if you want as much detail as possible in the Slack message. In most cases the customizable formatting is the best option.

### Sample message with custom formatting

An "app reload failed" Slack message using the custom formatting option could look like this:

![Reload failed alert Slack message](/img/butler-cloud-failed-reload-slack-formatted_1.png "Reload failed alert Slack message")

Here's how to set this up:

1. Create an incoming webhook in Slack, take note of its URL (you will need it in step 2 below).
2. Edit the Slack section of the config file, i.e. the settings in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.slackNotification.reloadAppFailure`.

   The `messageType` property should be set to `formatted`.  
   The `basicMsgTemplate` property is not used with formatted messages and can thus be left empty,

3. Edit the template file if/as needed, the file is specified in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.slackNotification.reloadAppFailure.templateFile`. It uses the Handlebars templating engine, to which Butler provides template fields with actual values.

   The available template fields are described [here](/docs/reference/alert-template-fields/).

   Sample template files are included in the release Zip file, and are also available in the GitHub repository's [src/config/slack_templates](https://github.com/ptarmiganlabs/butler/tree/master/src/config/slack_templates) directory.

4. Restart Butler if it's already running.

### Sample message with basic formatting

A "reload task failed" Slack message with basic formatting could look like this:

![Reload failed alert Slack message](/img/failed-reload-slack-basic_1.png "Reload failed alert Slack message")

To set it up:

1. Create an incoming webhook in Slack if you don't already have one, take note of its URL (you will need it in step 2 below).
2. Edit the Slack section of the config file, i.e. in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.slackNotification.reloadAppFailure`.

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

The concept is the same for all alert types, see the [this page](/docs/getting-started/setup/reload-alerts/cloud/#how-it-works) for details.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  mqttConfig:
    enable: false                                     # Should Qlik Sense events be forwarded as MQTT messages?
    ...
    ...
    qlikSenseCloud:                                                   # MQTT settings for Qlik Sense Cloud integration
      event:
        mqttForward:                                                  # QS Cloud events forwarded to MQTT topics, which Butler will subscribe to
          enable: false
          broker:                                                     # Settings for MQTT broker to which QS Cloud events are forwarded
            host: mqttbroker.company.com
            port: <port>
            username: <username>
            password: <password>
          topic:
            subscriptionRoot: qscloud/#                     # Topic that Butler will subscribe to
            appReload: qscloud/app/reload
  ...
  ...
  qlikSenseCloud:                   # Settings for Qlik Sense Cloud integration
    enable: false
    event:
      mqtt:                         # Which QS Cloud tenant should Butler receive events from, in the form of MQTT messages?
        tenant:
          id: tenant.region.qlikcloud.com
          tenantUrl: https://tenant.region.qlikcloud.com
          authType: jwt             # Authentication type used to connect to the tenant. Valid options are "jwt"
          auth:
            jwt:
              token: <JWT token>    # JWT token used to authenticate Butler when connecting to the tenant
          # Qlik Sense Cloud related links used in notification messages
          qlikSenseUrls:
            qmc: <URL to QMC in Qlik Sense Cloud>
            hub: <URL to Hub in Qlik Sense Cloud>
          comment: This is a comment describing the tenant and its settings # Informational only
          alert:
            ...
            ...
            # Settings for notifications and messages sent to Slack
            slackNotification:
              reloadAppFailure:
                enable: false
                alertEnableByTag:
                  enable: false
                  tag: Butler - Send Slack alert if app reload fails
                basicContentOnly: false
                webhookURL: <URL to Slack webhook>
                channel: sense-task-failure     # Slack channel to which app reload failure notifications are sent
                messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
                basicMsgTemplate: 'Qlik Sense Cloud app reload failed: "{{appName}}"'      # Only needed if message type = basic
                rateLimit: 60                   # Min seconds between emails for a given appId/recipient combo. Defaults to 5 minutes.
                headScriptLogLines: 10
                tailScriptLogLines: 20
                templateFile: /path/to/slack_templates/failed-reload-qscloud.handlebars
                fromUser: Qlik Sense
                iconEmoji: ':ghost:'
  ...
  ...
```
