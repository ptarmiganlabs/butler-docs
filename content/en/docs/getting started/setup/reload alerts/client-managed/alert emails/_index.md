---
title: "Reload alerts sent as emails"
linkTitle: "Email"
weight: 10
description: >
  Description of the various kinds of alert emails Butler can send.
---

## What's this?

Butler can send two kinds of alert emails:

- When a reload task fails during execution.
- When a running reload task is somehow stopped/aborted.
- When a reload task completes successfully. 

See the [Concepts section](/docs/concepts/failed-reloads/client-managed/) for additional details and sample alert emails.

## Basic vs formatted email alerts

If you want Butler to send email alerts you must provide an email template file.

For some other alert destinations (Slack and Teams) Butler offers a "basic" option. A fixed format alert is then sent by Butler.  
The closest thing available for emails is to use the mail log appender described [here](/docs/getting-started/setup/reload-alerts/#sending-basic-alert-emails-from-log4net), but if you set up a log appender AND have Butler running, you might as well use the formatted email option as it provides **much** more flexibility than log4net's email appender.
  
## Rate limiting and de-duplication

Butler has rate limiting feature to ensure alert recipients are not spammed with too many alert emails.

The rate limit is configured (in seconds) in the main config file and can be set independently for reload-failed and reload-aborted emails.  
The corresponding config settings are `Butler.emailNotification.reloadTaskFailure.rateLimit`, `Butler.emailNotification.reloadTaskAborted.rateLimit` and `Butler.emailNotification.reloadTaskSuccess.rateLimit`.

Rate limiting is done based on task ID + email address.

Butler also has a de-duplication feature that ensure each email address that has qualified for an alert email only gets ONE email per alert.

## Sending test emails to verify correct settings

It can be tricky to find the correct settings to use Butler with email servers.  
Butler itself uses a very generic email components to send emails, but corporate email servers may impose restrictions on from where/what servers emails will be accepted, encryption may be used together with non-standard network ports etc.

Butler offers a command line option that when used will send a simple test email to the specified email address.  
This makes is very easy to test if the email settings in Butler's config file are working or not.  
When this command line option is used Butler will start normally, but also send a test email during startup.

The command line option is `--test-email-address <address>`.  
The sender of the test email can be specified with `--test-email-from-address <address>`.

```powershell
PS C:\tools\butler> .\butler.exe
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version                        output the version number
  -c, --configfile <file>              path to config file
  -l, --loglevel <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-account-name  <name...>  New Relic account name. Used within Butler to differentiate between different target New Relic accounts
  --new-relic-api-key <key...>         insert API key to use with New Relic
  --new-relic-account-id <id...>       New Relic account ID
  --test-email-address <address>       send test email to this address. Used to verify email settings in the config file.
  --test-email-from-address <address>  send test email from this address. Only relevant when SMTP server allows from address to be set.
  --no-qs-connection                   don't connect to Qlik Sense server at all. Run in isolated mode
  --api-rate-limit                     set the API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
  -h, --help                           display help for command
PS C:\tools\butler>
```

If the settings in the config file's `Butler.emailNotification.smtp` section are valid and correct a command like this can be used:  
`butler.exe -c ./config/production.yaml --test-email-address myname@somedomain.com`. Adapt config file location and email address as needed.

The resulting email looks like this:

![Test email from Butler](/img/butler-test-email-1.png 'Test email from Butler')

## Sending alert emails to app owners

Butler can optionally send alert emails to the owner of apps that fail reloading/were aborted.

{{< notice note >}}
App owner notification email can only be sent to app owners that have an email stored in their Qlik Sense user profile.  
This is typically the case if the Qlik Sense user directory has been synced from a Microsoft Active Directory - but there is no guarantee this is the case.

If there is no email available for an app owner, he/she will simply not receive any alert emails.
{{< /notice >}}

This feature is controlled by the config file properties `Butler.emailNotification.reloadTaskAborted.appOwnerAlert.enable` and  `Butler.emailNotification.reloadTaskFailure.appOwnerAlert.enable`.

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

## Send alerts only for some reload tasks

Some reload tasks may be more important than others.  
I.e. some tasks should generate alert emails when they fail/abort/succeed, but others not.

Butler controls which tasks to send alerts for by looking at a specific Qlik Sense custom property.

{{< notice note >}}
The concept described below is the same for failed, aborted and successful reload tasks.  
Each of these three types of tasks have their own settings in the config file.
{{< /notice >}}

- If the config file setting `Butler.emailNotification.reloadTaskFailure.alertEnableByCustomProperty.enable` is set to `false`, *all* failed reload tasks will cause alert emails.
- If that setting is `true` only some tasks will cause alert emails:
  - If a task has the value specified in `Butler.emailNotification.reloadTaskFailure.alertEnableByCustomProperty.enabledValue` set for the custom property named as specified in `Butler.emailNotification.reloadTaskFailure.alertEnableByCustomProperty.customPropertyName`, the alert will be sent.
  - If a task *does not* have that custom property set, no alert will be sent for that task.
    - A task can still cause an alert to be sent if a specific email address is specified for the task, see [below](/docs/getting-started/setup/reload-alerts-qseow/client-managed/alert-emails/#send-alerts-to-specific-people-for-some-tasks) for details.

Some configuration is needed to make this work:

1. Make changes to the config file. Specifically the three settings mentioned above needs to be reviewed and updated as needed.
2. Create a custom property in Sense.
   1. The name and value of the custom property must match the one in the config file, `Butler.emailNotification.reloadTaskFailure.alertEnableByCustomProperty.customPropertyName` and `Butler.emailNotification.reloadTaskFailure.alertEnableByCustomProperty.enabledValue`.
   2. The custom property should be available on reload tasks.
3. Set the custom property for reload tasks for which alert emails should be sent.

*Aborted* reload tasks (as compared to the *failed* reload tasks described above) are handled the same way, with their own settings in the config file.

In the QMC the custom property can look like this:

![QMC custom property for controlling reload alerts](/img/enable-reload-alert-for-specific-task-1.png "QMC custom property for controlling reload alerts")

## Send alerts to specific people, for some tasks

It's possible to send alert emails to specific email addresses and control this on a per-task basis.

This is achieved by using a Sense custom property that contains the email addresses alerts should be sent to, for the task in question.

{{< notice note >}}
The concept described below is the same for failed, aborted and successful reload tasks.  
Each of these three types of tasks have their own settings in the config file.
{{< /notice >}}

These config setting `Butler.emailNotification.reloadTaskFailure.alertEnableByEmailAddress.customPropertyName` controls which custom property is used to store email addresses for failed reload tasks.

Email specific alert recpients is independent from the feature where alerts can be switched on/off for individual tasks (see [above](/docs/getting-started/setup/reload-alerts-qseow/client-managed/alert-emails/#send-alerts-only-for-some-reload-tasks)).

In other words: If an email address has been designated as recipient of alert emails, that address will always receive alert emails for *all* failed reload tasks.

Having set two different (blurred out) recipients of alert emails for a reload task:

![QMC custom property for sending alert emails to specific email addresses](/img/set-email-recipient-per-reload-task-1.png "QMC custom property for sending alert emails to specific email addresses")

## Settings in config file

{{< notice warning >}}

Don't forget to create the log appender .xml files on the Sense server(s).  
[This page](/docs/getting-started/setup/reload-alerts-qseow/#adding-a-log-appender) describes how.

Those xml files are the foundation on top of which all Butler reload task alerts are built - without them the alerts described on this page won't work.
{{< /notice >}}

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
    reloadTaskSuccess:
      enable: false
      # Custom property used to control which task successes will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all failed reload tasks.
      alertEnableByCustomProperty:
        enable: false
        customPropertyName: 'Butler_SuccessAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_SuccessAlertSendToEmail'
      rateLimit: 60              # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15
      tailScriptLogLines: 25
      priority: high              # high/normal/low
      subject: '✅ Qlik Sense reload success: "{{taskName}}"'
      bodyFileDirectory: path/to/email_templates
      htmlTemplateFile: success-reload-qseow
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@ptarmiganlabs.com>
      recipients:
        - <Email address 1>
        - <Email address 2>

    reloadTaskAborted:
      enable: false
      appOwnerAlert:
        enable: true              # Should app owner get notification email (assuming email address is available in Sense user directory)
        includeOwner:
          includeAll: true                            # true = Send notification to all app owners except those in exclude list
                                                      # false = Send notification to app owners in the include list
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
      # Custom property used to control which aborted tasks will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all aborted reload tasks.
      alertEnableByCustomProperty:
        enable: true
        customPropertyName: 'Butler_AbortedAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_AbortedAlertSendToEmail'
      rateLimit: 600                                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15                          # Number of lines from start of script to include in email
      tailScriptLogLines: 15                          # Number of lines from end of script to include in email
      priority: high                                  # high/normal/low
      subject: 'Qlik Sense reload aborted: "{{taskName}}"'  # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates      # Directory where email body template files are stored
      htmlTemplateFile: aborted-reload                # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:                                     # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    reloadTaskFailure:
      enable: false
      appOwnerAlert:
        enable: true              # Should app owner get notification email (assuming email address is available in Sense user directory)
        includeOwner:
          includeAll: true                            # true = Send notification to all app owners except those in exclude list
                                                      # false = Send notification to app owners in the include list
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
      # Custom property used to control which task failures will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all failed reload tasks.
      alertEnableByCustomProperty:
        enable: false
        customPropertyName: 'Butler_FailedAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_FailedAlertSendToEmail'
      rateLimit: 600                                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15                          # Number of lines from start of script to include in email
      tailScriptLogLines: 15                          # Number of lines from end of script to include in email
      priority: high                                  # high/normal/low
      subject: 'Qlik Sense reload failed: "{{taskName}}"'   # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates      # Directory where email body template files are stored
      htmlTemplateFile: failed-reload                 # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:                                       # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    ...
    ...
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
      `Butler.emailNotification.reladTaskFailure.htmlTemplateFile`. A `.handlebars` extension is assumed.
   2. For *aborted reload emails* these config file properties are used:
      `Butler.emailNotification.reloadTaskAborted.bodyFileDirectory` and
      `Butler.emailNotification.reloadTaskAborted.htmlTemplateFile`. A `.handlebars` extension is assumed.
   3. For *successful reload emails* these config file properties are used:
      `Butler.emailNotification.reloadTaskSuccess.bodyFileDirectory` and
      `Butler.emailNotification.reloadTaskSuccess.htmlTemplateFile`. A `.handlebars` extension is assumed.
2. For email subjects, these config properties are used:
   `Butler.emailNotification.reladTaskFailure.subject`, `Butler.emailNotification.reloadTaskAborted.subject` and `Butler.emailNotification.reloadTaskSuccess.subject`.
3. Process the body template, replacing template fields with actual values.
4. Process the email subject template, replacing template fields with actual values.
5. Send the email.

A couple of sample template files are found in the `src/config/email_templates` directory of the [GitHub repository](https://github.com/ptarmiganlabs/butler).

{{< notice tip >}}
You can use template fields in email subjects too!
{{< /notice >}}

### Using custom links in templates

Links to Qlik Sense QMC and Hub (for both client-managed and Qlik Sense Cloud) can be included in email templates.

It is also possible to define custom links in the config file, and use them in email templates.  
This is described here: [Custom links in alerts](/docs/concepts/custom-links-in-alerts/).

## Template fields reference

A complete list of template fields - including descriptions - is available in the [Reference](/docs/reference/alert-template-fields) section.
