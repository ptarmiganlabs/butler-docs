---
title: "Reload alerts sent as emails"
linkTitle: "Email"
weight: 10
description: >
  Description of the various kinds of alert emails Butler can send.
---

{{% alert title="Optional" color="primary" %}}
These settings are optional.  
If alerts are not of interest, the default values in the config file can be left as they are.
Do note though that Butler expects the configuration properties below to exist in the config file, but will *ignore their values* if the related features are disabled.
{{% /alert %}}

## What's this?

Butler can send two kinds of alert emails:

- When a scheduled, running reload task fails.
- When a scheduled, running reload task is somehow stopped.

See the [Concepts section](/docs/concepts/alert-emails/) for additional details and sample alert emails.

## Basic vs formatted email alerts

If you want Butler to send email alerts you must provide an email template file.

For some other alert destinations (Slack and Teams) Butler offers a "basic" option. A fixed format alert is then sent by Butler.  
The closest thing available for emails is to use the mail log appender described [here](/docs/getting-started/setup/reload-alerts/#sending-basic-alert-emails-from-log4net), but if you set up a log appender AND have Butler running, you might as well use the formatted email option as it provides **much** more flexibility than log4net's email appender.

## Sending alert emails to app owners

Butler can optionally send alert emails to the owners of the app that failed reloading/was aborted.

{{% alert title="Email addresses must be available" color="warning" %}}
App owner notification email can only be sent to app owners that have an email stored in their Qlik Sense user profile.  
This is typically the case if the Qlik Sense user directory has been synced from a Microsoft Active Directory - but there is no guarantee this is the case.

If there is no email available for an app owner, he/she will simply not receive a notification email.
{{% /alert %}}

This feature is controlled by the config file properties `Butler.emailNotification.reloadTaskAborted.appOwnerAlert.enable` and `Butler.emailNotification.reloadTaskFailure.appOwnerAlert.enable`. 

If set to `true` the app owner will be added to the send list of alert emails, in addition to the recipients specied in `Butler.emailNotification.reloadTaskAborted.recipients` and `Butler.emailNotification.reloadTaskFailure.recipients`.

The sections of the config file dealing with app owner notification emails looks like this:

```yaml
appOwnerAlert:
  enable: true              # Should app owner get notification email (assuming email address is available in Sense user directory)
  includeOwner:
    includeAll: true                            # true = Send notification to all app owners except those in exclude list
                                                # false = Send notification to all app owners in the include list
    user:
      - directory: <Sense user directory>
        userId: <userId>
      - directory: <Sense user directory>
        userId: <userId>
  excludeOwner:
    user:
      - directory: <Sense user directory>
        userId: <userId>
      - directory: <Sense user directory>
        userId: <userId>
```

It works like this:

- If `appOwnerAlert.enable` is set to `false` no app owner emails will be sent. If it's set to `true` the rules below apply.
- If `appOwnerAlert.includeOwner.includeAll` is set to `true` all app owners will get notification emails when apps the own fail/are aborted...
  - ... except those app owners listed in the `appOwnerAlert.excludeOwner.user` array.
  - That array thus provides a way to exclude some app owners (e.g. system accounts) to receive notifcation emails.
- If `appOwnerAlert.includeOwner.includeAll` is set to `false` it's still possible to add individual app owners to the `appOwnerAlert.includeOwner.user` array.  
  Those users will then receive notification emails for apps they own.


## Settings in main config file

{{% alert title="Remember" color="warning" %}}
Don't forget to create the log appender .xml files on the Sense server(s).  
[This page](../) describes how.

Those xml files are the foundation on top of which all Butler alerts are built - without them the alerts described on this page won't work.
{{% /alert %}}

```yaml
---
Butler:
  ...
  ...
  # Qlik Sense related links used in notification messages
  qlikSenseUrls:
    qmc: <Link to Qlik Sense QMC>
    hub: <Link to Qlik Sense Hub>
  ...
  ...
  # Settings needed to send email notifications when for example reload tasks fail.
  # Reload failure notifications assume a log appender is configured in Sense AND that the UDP server in Butler is running.
  emailNotification:
    enable: false
    reloadTaskAborted:
      enable: false
      appOwnerAlert:
        enable: true              # Should app owner get notification email (assuming email address is available in Sense user directory)
        includeOwner:
          includeAll: true                            # true = Send notification to all app owners except those in exclude list
                                                      # false = Send notification to all app owners in the include list
          user:
            - directory: <Sense user directory>
              userId: <userId>
            - directory: <Sense user directory>
              userId: <userId>
        excludeOwner:
          user:
            - directory: <Sense user directory>
              userId: <userId>
            - directory: <Sense user directory>
              userId: <userId>
      rateLimit: 600                                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15                          # Number of lines from start of script to include in email
      tailScriptLogLines: 15                          # Number of lines from end of script to include in email
      priority: high                                  # high/normal/low
      subject: 'Qlik Sense reload aborted: "{{taskName}}"'  # Email subject. Can use template fields
      bodyFileDirectory: config/email_templates       # Directory where email body template files are stored
      htmlTemplateFile: aborted-reload                # Name of email body template file to use
      fromAdress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:                                       # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    reloadTaskFailure:
      enable: false
      appOwnerAlert:
        enable: true              # Should app owner get notification email (assuming email address is available in Sense user directory)
        includeOwner:
          includeAll: true                            # true = Send notification to all app owners except those in exclude list
                                                      # false = Send notification to all app owners in the include list
          user:
            - directory: <Sense user directory>
              userId: <userId>
            - directory: <Sense user directory>
              userId: <userId>
        excludeOwner:
          user:
            - directory: <Sense user directory>
              userId: <userId>
            - directory: <Sense user directory>
              userId: <userId>
      rateLimit: 600                                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15                          # Number of lines from start of script to include in email
      tailScriptLogLines: 15                          # Number of lines from end of script to include in email
      priority: high                                  # high/normal/low
      subject: 'Qlik Sense reload failed: "{{taskName}}"'   # Email subject. Can use template fields
      bodyFileDirectory: config/email_templates       # Directory where email body template files are stored
      htmlTemplateFile: failed-reload                 # Name of email body template file to use
      fromAdress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:                                       # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    smtp:                                             # Email server settings. See https://nodemailer.com/smtp/ for details on the meaning of these fields.
      host: <FQDN or IP or email server, e.g. smtp.gmail.com>
      port: <port on which SMTP server is listening>
      secure: true                                    # true/false
      tls:
        serverName:                                   # If specified the serverName field will be used for TLS verification instead of the host field.
        ignoreTLS: false
        requireTLS: true
        rejectUnauthorized: false
      auth:
        enable: true
        user: <Username, email address etc>
        password: <your-secret-password>
  ...
  ...
  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started? true/false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998
  ...
  ...
```

## Templates: Configuring email appearance

Alert emails use standard HTML formatting. Inline CSS can be used (if so desired) for fine tuning the visual look of the alert email.

Butler's process for sending alert emails is

1. Figure out which *email body template file* should be used. This is determine by two set of fields in the main config file:
   1. For *reload failure emails* these config file properties are used:
      `Butler.emailNotification.reladTaskFailure.bodyFileDirectory` and
      `Butler.emailNotification.reladTaskFailure.htmlTemplateFile`
   2. For *aborted reload emails* these config file properties are used:
      `Butler.emailNotification.reloadTaskAborted.bodyFileDirectory` and
      `Butler.emailNotification.reloadTaskAborted.htmlTemplateFile`
2. For email subjects, these config properties are used:
   `Butler.emailNotification.reladTaskFailure.subject` and
   `Butler.emailNotification.reloadTaskAborted.subject`
3. Process the body template, replacing template fields with actual values.
4. Process the email subject template, replacing template fields with actual values.
5. Send the email.

A couple of sample template files are found in the `src/config/email_templates` directory of the [GitHub repository](https://github.com/ptarmiganlabs/butler).

{{% alert title="Remember" color="info" %}}
You can use template fields in email subjects too!
{{% /alert %}}

## Template fields reference

A complete list of template fields - including descriptions - is available in the [Reference](/docs/reference/alert-template-fields) section.
