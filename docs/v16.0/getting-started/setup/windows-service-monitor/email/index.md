---
title: "Sending Windows service alerts as email"
linkTitle: "Email"
weight: 10
description: >
  This page contains information on how to configure Butler to send email alerts when Windows services stop or start.
---

## What's this?

These config settings are specific to the email alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

The sent emails are created from template files using the [Handlebars](https://handlebarsjs.com) templating engine.

The template files are located in the ` Butler.emailNotification.``<alertType>``.bodyFileDirectory ` directory, with the actual file name specified in ` Butler.emailNotification.``<alertType>``.htmlTemplateFile `.

The template files can contain [Handlebars expressions](https://handlebarsjs.com/guide/expressions.html) to insert values from the alert data.  
The available values are:

| Value                                      | Description                                                                                                                                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <code v-pre>{{host}}</code>                | The hostname of the server where the service is running                                                                                                                                                           |
| <code v-pre>{{serviceStatus}}</code>       | The status of the service, e.g. `RUNNING` or `STOPPED`                                                                                                                                                            |
| <code v-pre>{{servicePrevStatus}}</code>   | The previous status of the service, e.g. `RUNNING` or `STOPPED`                                                                                                                                                   |
| <code v-pre>{{serviceName}}</code>         | The name of the service as defined in Windows                                                                                                                                                                     |
| <code v-pre>{{serviceDisplayName}}</code>  | The display name of the service as defined in Windows. Can sometimes be a bit more human readable than the serviceName.                                                                                           |
| <code v-pre>{{serviceFriendlyName}}</code> | The display name of the service as defined in the Butler config file. Used to give the service a good name when both serviceName and serviceDisplayName are unsuitable for use in for example Grafana dashboards. |
| <code v-pre>{{serviceStartType}}</code>    | The startup mode of the service, e.g. `Automatic` or `Manual`                                                                                                                                                     |
| <code v-pre>{{serviceExePath}}</code>      | The path to the executable of the service                                                                                                                                                                         |

## Settings in config file

```yaml
---
Butler:
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
      rateLimit: 60 # Min seconds between emails for a given taskID/recipient combo. Defaults to 5 minutes.
      headScriptLogLines: 15
      tailScriptLogLines: 25
      priority: high # high/normal/low
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
        enable: true # Should app owner get notification email (assuming email address is available in Sense user directory)
        includeOwner:
          includeAll:
            true # true = Send notification to all app owners except those in exclude list
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
      rateLimit: 600 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15 # Number of lines from start of script to include in email
      tailScriptLogLines: 15 # Number of lines from end of script to include in email
      priority: high # high/normal/low
      subject: 'Qlik Sense reload aborted: "{{taskName}}"' # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates # Directory where email body template files are stored
      htmlTemplateFile: aborted-reload # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients: # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    reloadTaskFailure:
      enable: false
      appOwnerAlert:
        enable: true # Should app owner get notification email (assuming email address is available in Sense user directory)
        includeOwner:
          includeAll:
            true # true = Send notification to all app owners except those in exclude list
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
      rateLimit: 600 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 15 # Number of lines from start of script to include in email
      tailScriptLogLines: 15 # Number of lines from end of script to include in email
      priority: high # high/normal/low
      subject: 'Qlik Sense reload failed: "{{taskName}}"' # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates # Directory where email body template files are stored
      htmlTemplateFile: failed-reload # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients: # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    distributeTaskSuccess:
      enable: false
      # Custom property used to control which task successes will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all successful distribute tasks.
      alertEnableByCustomProperty:
        enable: false
        customPropertyName: 'Butler_DistributeSuccessAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_DistributeSuccessAlertSendToEmail'
      rateLimit: 600 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      priority: high # high/normal/low
      subject: '✅ Qlik Sense distribute task success: "{{taskName}}"' # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates # Directory where email body template files are stored
      htmlTemplateFile: success-distribute # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients: # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    preloadTaskSuccess:
      enable: false
      # Custom property used to control which task successes will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all successful preload tasks.
      alertEnableByCustomProperty:
        enable: false
        customPropertyName: 'Butler_PreloadSuccessAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_PreloadSuccessAlertSendToEmail'
      rateLimit: 600 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      priority: high # high/normal/low
      subject: '✅ Qlik Sense preload task success: "{{taskName}}"' # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates # Directory where email body template files are stored
      htmlTemplateFile: success-preload # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients: # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    preloadTaskFailure:
      enable: false
      # Custom property used to control which task failures will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all failed preload tasks.
      alertEnableByCustomProperty:
        enable: false
        customPropertyName: 'Butler_PreloadFailedAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_PreloadFailedAlertSendToEmail'
      rateLimit: 600 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      priority: high # high/normal/low
      subject: '❌ Qlik Sense preload task failed: "{{taskName}}"' # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates # Directory where email body template files are stored
      htmlTemplateFile: failed-preload # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients: # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    distributeTaskFailure:
      enable: false
      # Custom property used to control which task failures will cause alert emails to be sent
      # If this setting is true, alerts will not be sent for all tasks, but *only* for tasks with the CP set to the enabledValue.
      # If this setting is false, alerts will be sent for all failed distribute tasks.
      alertEnableByCustomProperty:
        enable: false
        customPropertyName: 'Butler_DistributeFailedAlertEnableEmail'
        enabledValue: 'Yes'
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: 'Butler_DistributeFailedAlertSendToEmail'
      rateLimit: 600 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      priority: high # high/normal/low
      subject: '❌ Qlik Sense distribute task failed: "{{taskName}}"' # Email subject. Can use template fields
      bodyFileDirectory: path/to/email_templates # Directory where email body template files are stored
      htmlTemplateFile: failed-distribute # Name of email body template file to use
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients: # Array of email addresses to which the notification email will be sent
        - <Email address 1>
        - <Email address 2>
    serviceStopped:
      rateLimit: 30 # Min seconds between emails for a given service. Defaults to 5 minutes.
      priority: high # high/normal/low
      subject: '❌ Windows service stopped on host {{host}}: "{{serviceDisplayName}}"'
      bodyFileDirectory: path/to/email_templates/email_templates
      htmlTemplateFile: service-stopped
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:
        - <Email address 1>
        - <Email address 2>
    serviceStarted:
      rateLimit: 30 # Min seconds between emails for a given service. Defaults to 5 minutes.
      priority: high # high/normal/low
      subject: '✅ Windows service started on host {{host}}: "{{serviceDisplayName}}"'
      bodyFileDirectory: path/to/email_templates/email_templates
      htmlTemplateFile: service-started
      fromAddress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:
        - <Email address 1>
        - <Email address 2>
    smtp: # Email server settings. See https://nodemailer.com/smtp/ for details on the meaning of these fields.
      host: my.emailhost.net # FQDN or IP or email server, e.g. smtp.gmail.com
      port: 25 # Port on which SMTP server is listening
      secure: true # true/false
      tls:
        serverName: # If specified the serverName field will be used for TLS verification instead of the host field.
        ignoreTLS: false
        requireTLS: true
        rejectUnauthorized: false
      auth:
        enable: true
        user: <Username, email address etc>
        password: <your-secret-password>
  ...
  ...
```
