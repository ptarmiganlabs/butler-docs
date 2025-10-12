---
title: "Alert emails"
linkTitle: "Alert emails"
weight: 30
description: >
  Overview of the various kinds of alert emails Butler can send when app reloads fail in Qlik Sense Cloud.
---

## Scheduled vs manual app reloads

Qlik Sense Cloud has a few different ways to reload apps:

1. **Scheduled reloads:** Apps can be set to reload at specific times, for example every night at 3am.
2. **Manually started reload:** Right clicking an app in the Qlik Cloud web UI, then select "Reload now". This is a manual reload and is not managed by the Sense scheduling service.
3. **Manual reloads started from the script editor:** When developing apps in the Sense client/script editor you usually reload the apps from there. This triggers an app reload too, but in a slightly different way than previous example. Instead the reload is done directly in the engine service. Butler is not notified in this case, so no alert emails are sent for these reloads.

{{< notice note >}}
The reload failure notifications described here work in all cases except the "manual reloads started from the script editor".  
There is currently no way around that, it's just how Qlik Cloud works.
{{< /notice >}}

## Alert emails

Butler can send the following alert emails:

- When an app reload fails.

Alert emails can be formatted using HTML, use CSS styling, emojis etc.  
There's no reason an alert email can't look good!

Here is an example of how a failed reload alert email could look like:

![Reload failed alert email](/img/butler-qscloud-app-reload-failed-email-2.png "Reload failed alert email")

## Alert emails to app owners

All apps in Qlik Sense Cloud has an app owner, typically the user who created the app.

If there is an email address associated with the app owner, Butler can send an alert email to the app owner when a reload task fails or is aborted.  
This feature can be turned on/off in the Butler config file.  
It is also possible to only send alert emails to some app owners but not others, [this page](/docs/getting-started/setup/reload-alerts/cloud/alert-emails/#sending-alert-emails-to-app-owners) describes how to configure that.

## Alert emails only for some apps

Sometimes there is a desire to only have email alerts for _some_ apps.  
Maybe some apps are critical and should always trigger an alert email when they fail, while other apps are less critical and should not trigger any alert emails.

This is possible using a tag set on apps in Qlik Sense Cloud:

![Tagging apps for reload failed alerts in Qlik Sense Cloud](/img/butler-qscloud-app-reload-failed-app-tag-1.png "Tagging apps for reload failed alerts in Qlik Sense Cloud")

More info in the [setup section](/docs/getting-started/setup/reload-alerts/cloud/alert-emails/#send-alerts-only-for-some-apps).

## How it works

Butler uses a templating engine called [Handlebars](https://handlebarsjs.com/guide/). It is used when sending all kinds of alert emails supported by Butler.

For an overview of how Butler deals with alert messages for Qlik Sense Cloud, please see the [setup section](/docs/getting-started/setup/reload-alerts/cloud/#how-it-works).

### Template fields

The Handlebars templating engine looks for _template fields_ in the template files you create.

A complete list of template fields - including descriptions - is available in the [Reference](/docs/reference/alert-template-fields) section.
