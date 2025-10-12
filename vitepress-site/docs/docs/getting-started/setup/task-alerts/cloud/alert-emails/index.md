---
title: "Qlik Cloud reload alerts sent as emails"
linkTitle: "Email"
weight: 10
description: >
  Description of the various kinds of alert emails Butler can send when an app reload fails in Qlik Cloud.
---

## What's this?

Butler can send these alert emails:

- When an app reload fails during execution.

See the [Concepts section](/docs/concepts/alert-emails/) for additional details and sample alert emails.

## Basic vs formatted email alerts

If you want Butler to send email alerts you must provide an email template file.

For some other alert destinations (Slack and Teams) Butler offers a "basic" option. A fixed format alert is then sent by Butler.  
This is not the case for email alerts - there you must provide Butler with a template file.

## Rate limiting and de-duplication

Butler has rate limiting feature to ensure alert recipients are not spammed with too many alert emails.

The rate limit is configured (in seconds) in the main config file in the `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.rateLimit` setting in the config file.

Rate limiting is done based on app reload ID + email address.

Butler also has a de-duplication feature that ensure each email address that has qualified for an alert email only gets ONE email per alert, even if the email address (for example) appears as both an app owner and is specified via an app tag.

## Sending test emails to verify correct settings

See the same section for [client-managed Qlik Sense](http://localhost:1313/docs/getting-started/setup/task-alerts/client-managed/alert-emails/#sending-test-emails-to-verify-correct-settings).  
The commands are identical.

## Sending alert emails to app owners

Butler can optionally send alert emails to the owner of apps that fail reloading.

::: tip
App owner notification email can only be sent to app owners that have an email stored in their Qlik Cloud user profile.

If there is no email available for an app owner, he/she will simply not receive any alert emails.
:::

This feature is controlled by the config file properties `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.appOwnerAlert.enable`.

If set to `true` the app owner will be added to the send list of alert emails, in addition to the recipients specified in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.recipients`.

The sections of the config file dealing with app owner notification emails looks like this:

```yaml
appOwnerAlert:
  enable: false # Should app owner get notification email (assuming email address is available in Sense)?
  includeOwner:
    includeAll:
      true # true = Send notification to all app owners except those in exclude list
      # false = Send notification to app owners in the include list
    user:# Array of app owner email addresses that should get notifications
      # - email: anna@somecompany.com
      # - email: joe@somecompany.com
  excludeOwner:
    user:
      # - email: daniel@somecompany.com
```

It works like this:

- If `appOwnerAlert.enable` is set to `false` no app owner emails will be sent. If it's set to `true` the rules below apply.
- If `appOwnerAlert.includeOwner.includeAll` is set to `true` all app owners will get notification emails when apps the own fail/are aborted...
  - ... except those app owners listed in the `appOwnerAlert.excludeOwner.user` array.
  - That array thus provides a way to exclude some app owners (e.g. system accounts) to receive notification emails.
- If `appOwnerAlert.includeOwner.includeAll` is set to `false` it's still possible to add individual app owners to the `appOwnerAlert.includeOwner.user` array.  
  Those users will then receive notification emails for apps they own.

## Send alerts only for some apps

Some apps may be more important than others.  
I.e. some apps should result in alert emails when they fail reloading, but others not.

Butler controls which app reload failures cause email alerts by looking at a specific app tag.

- If the config file setting `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.alertEnableByTag.enable` is set to `false`, _all_ failed app reloads will result in alert emails.
- If that setting is `true` only some apps will cause alert emails when their reload fails:
  - If an app has the tag specified in `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.alertEnableByTag.tag`, an email alert will be sent for that app if it fails reloading.
  - If an app _does not_ have that tag set, no alert will be sent for that app.

Some configuration in Sense is needed to make this work:

1. Make changes to the config file. Specifically the settings mentioned above needs to be reviewed and (probably) updated.
2. In Qlik Cloud, tag the apps that should cause alert emails when they fail reloading.
   1. Use the same tag as specified in the config file.

Looks like this in Qlik Sense Cloud:

<ResponsiveImage
  src="/img/butler-qscloud-app-reload-failed-app-tag-1.png"
  alt="Tagging apps for reload failed alerts in Qlik Sense Cloud"
  maxWidth="400px"
  caption="Tagging apps for reload failed alerts in Qlik Sense Cloud"
/>

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
            ...
            ...
            # Settings needed to send email notifications when for example reload tasks fail.
            # Reload failure notifications assume a log appender is configured in Sense AND that the UDP server in Butler is running.
            emailNotification:
              reloadAppFailure:
                enable: false                # Enable/disable app reload failed notifications via email
                alertEnableByTag:
                  enable: false
                  tag: Butler - Send email if app reload fails
                appOwnerAlert:
                  enable: false              # Should app owner get notification email (assuming email address is available in Sense)?
                  includeOwner:
                    includeAll: true                            # true = Send notification to all app owners except those in exclude list
                                                                # false = Send notification to app owners in the include list
                    user:                    # Array of app owner email addresses that should get notifications
                      # - email: anna@somecompany.com
                      # - email: joe@somecompany.com
                  excludeOwner:
                    user:
                      # - email: daniel@somecompany.com
                rateLimit: 60              # Min seconds between emails for a given taskID. Defaults to 5 minutes.
                headScriptLogLines: 15
                tailScriptLogLines: 25
                priority: high              # high/normal/low
                subject: '❌ Qlik Sense reload failed: "{{taskName}}"'
                bodyFileDirectory: /path/to//email_templates
                htmlTemplateFile: failed-reload-qscloud
                fromAddress: Qlik Sense (no-reply) <qliksense-noreply@ptarmiganlabs.com>
                recipients:
                  # - emma@somecompany.com
                  # - patrick@somecompany.com
  ...
  ...
```

## Templates: Configuring email appearance

Alert emails use standard HTML formatting. Inline CSS can be used (if so desired) for fine tuning the visual look of the alert email.

Butler's process for sending alert emails is

1. Figure out which _email body template file_ should be used. This is determine by two set of fields in the main config file:
   1. For _reload failure emails_ these config file properties are used:
      `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.bodyFileDirectory` and `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.htmlTemplateFile`. A `.handlebars` extension is assumed.
2. Email subjects are specified in the config property `Butler.qlikSenseCloud.event.mqtt.tenant.alert.emailNotification.reloadAppFailure.subject`.
3. Process the body template, replacing template fields with actual values.
4. Process the email subject template, replacing template fields with actual values.
5. Send the email.

A couple of sample template files are found in the `src/config/email_templates` directory of the [GitHub repository](https://github.com/ptarmiganlabs/butler).

::: tip
You can use template fields in email subjects too!
:::

### Using custom links in templates

It is also possible to define custom links in the config file, and use them in email templates.  
This is described here: [Custom links in alerts](/docs/concepts/custom-links-in-alerts/).

## Template fields reference

A complete list of template fields - including descriptions - is available in the [Reference](/docs/reference/alert-template-fields) section.
