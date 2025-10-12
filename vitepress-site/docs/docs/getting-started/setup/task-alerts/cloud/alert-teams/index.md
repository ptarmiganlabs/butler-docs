---
title: "Reload alerts via Microsoft Teams"
linkTitle: "MS Teams"
weight: 50
description: >
  Description of how reload alerts can be sent as Microsoft Teams messages.
---

## What's this?

Butler can send two kinds of alert messages via Teams:

- When an app fails during reload.

See the [Concepts section](/docs/concepts/teams-messaging) for additional details.

A complete reference to the config file format is found [here](/docs/reference/config-file).

## Basic vs formatted Teams alerts

Teams alerts come in two forms:

- Customizable formatting using a template concept. A standard template that will fit most use cases is included with Butler. With this option the first and last parts of the script log can be included in the message, allowing you to tell from the Teams message what caused the reload to fail.  
  You can also add buttons to the message that can be used to open any URL you want, or open the app that failed reloading.
- A fixed, more basic format that is built into Butler. No template file needed, but also less detailed.

Which option to go for depends on whether you want just a notification that something went wrong, or if you want as much detail as possible in the Teams message. In most cases the customizable formatting is the best option.

### Sample message with custom formatting

An "app reload failed" Teams message using the custom formatting option could look like this:

<ResponsiveImage
  src="/img/butler-cloud-failed-reload-teams-formatted_1.png"
  alt="Reload failed alert Teams message"
  caption="Reload failed alert Teams message"
/>

Here's how to set it up:

1. Create a workflow in Teams, take note of its URL (you will need it in step 2 below). More information on how to create a Teams workflow in the [Concepts section](/docs/concepts/teams-messaging).
2. Edit the Teams section of the config file, i.e. the settings in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.teamsNotification.reloadAppFailure`.

   The `messageType` property should be set to `formatted`.  
   The `basicMsgTemplate` property is not used with formatted messages and can thus be left empty,

3. Edit the template file if/as needed, the file is specified in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.teamsNotification.reloadAppFailure.templateFile`.It uses the Handlebars templating engine, to which Butler provides template fields with actual values.

   The available template fields are described [here](/docs/reference/alert-template-fields/).

   Sample template files are included in the release Zip file, and are also available in the GitHub repository's [src/config/teams_templates](https://github.com/ptarmiganlabs/butler/tree/master/src/config/teams_templates) directory.

4. Restart Butler if it's already running.

### Sample message with basic formatting

A "reload task failed" Teams message with basic formatting could look like this:

<ResponsiveImage
  src="/img/failed-reload-teams-basic_1.png"
  alt="Reload failed alert Teams message"
  caption="Reload failed alert Teams message"
/>

To set it up:

1. Create a workflow in Teams if you don't already have one, take note of its URL (you will need it in step 2 below).
2. Edit the Teams section of the config file i.e. `Butler.qlikSenseCloud.event.mqtt.tenant.alert.teamsNotification.reloadAppFailure`.

   The `messageType` property should be set to `basic`.  
   The `basicMsgTemplate` property is the message that will be sent via Teams. [Template fields](/docs/reference/alert-template-fields/) can be used.

3. Restart Butler if it's already running.

## Customizing Teams messages

When using the formatted Teams alerts you have full freedom to create the alert _you_ need.  
Behind the scenes Teams messages are constructed as "Adaptive Cards", which is standardized JSON format that Teams understands.

More information on Adaptive Cards can be found [here](https://learn.microsoft.com/en-us/power-automate/overview-adaptive-cards), [here](https://adaptivecards.io) and [here](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/design-effective-cards?tabs=design).

When it comes to Butler, it uses the [Handlebars](https://handlebarsjs.com/) templating engine to render a template file into an adaptive card JSON object that is then sent to the workflow webhook.

A few things to keep in mind when creating custom Teams messages:

- The handlebars syntax itself must be correct. If incorrect no Teams JSON object will be created. And no Teams message sent.
- The handlebars template must result in a JSON object that adheres to Teams's specifications for JSON payloads.  
  If the JSON syntax is somehow invalid the Teams API will return errors and no messages sent. JSON can be pretty sensitive to details, there should for example not be any trailing commas in properly formatted JSON objects.

### Using custom links in templates

It is also possible to define custom links in the config file, and use them in Teams templates.  
This is described here: [Custom links in alerts](/docs/concepts/custom-links).

## How it works

The concept is the same for all alert types, see the [this page](/docs/getting-started/setup/task-alerts/cloud/#how-it-works) for details.

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
            # Settings for notifications and messages sent to MS Teams
            teamsNotification:
              reloadAppFailure:
                enable: false
                alertEnableByTag:
                  enable: false
                  tag: Butler - Send Teams alert if app reload fails
                basicContentOnly: false
                webhookURL: <URL to MS Teams webhook>
                messageType: formatted     # formatted / basic
                basicMsgTemplate: 'Qlik Sense Cloud app reload failed: "{{appName}}"'      # Only needed if message type = basic
                rateLimit: 15              # Min seconds between emails for a given appId. Defaults to 5 minutes.
                headScriptLogLines: 15
                tailScriptLogLines: 15
                templateFile: /path/to/teams_templates/failed-reload-qscloud-workflow.handlebars
  ...
  ...
```
