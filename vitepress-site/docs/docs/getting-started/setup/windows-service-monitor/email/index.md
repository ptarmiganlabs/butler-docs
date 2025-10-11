---
title: 'Sending Windows service alerts as email'
linkTitle: 'Email'
weight: 10
description: >
    This page contains information on how to configure Butler to send email alerts when Windows services stop or start.
---

## What's this?

These config settings are specific to the email alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

The sent emails are created from template files using the [Handlebars](https://handlebarsjs.com) templating engine.

The template files are located in the `Butler.emailNotification.``<alertType>``.bodyFileDirectory` directory, with the actual file name specified in `Butler.emailNotification.``<alertType>``.htmlTemplateFile`.

The template files can contain [Handlebars expressions](https://handlebarsjs.com/guide/expressions.html) to insert values from the alert data.  
The available values are:

| Value | Description |
| --- | --- |
| `{{host}}` | The hostname of the server where the service is running |
| `{{serviceStatus}}` | The status of the service, e.g. `RUNNING` or `STOPPED` |
| `{{servicePrevStatus}}` | The previous status of the service, e.g. `RUNNING` or `STOPPED` |
| `{{serviceName}}` | The name of the service as defined in Windows |
| `{{serviceDisplayName}}` | The display name of the service as defined in Windows. Can sometimes be a bit more human readable than the serviceName. |
| `{{serviceFriendlyName}}` | The display name of the service as defined in the Butler config file. Used to give the service a good name when both serviceName and serviceDisplayName are unsuitable for use in for example Grafana dashboards. |
| `{{serviceStartType}}` | The startup mode of the service, e.g. `Automatic` or `Manual` |
| `{{serviceExePath}}` | The path to the executable of the service |

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  emailNotification: 
    serviceStopped:
      rateLimit: 30                   # Min seconds between emails for a given service. Defaults to 5 minutes.
      priority: high                  # high/normal/low
      subject: '❌ Windows service stopped on host {{host}}: "{{serviceDisplayName}}"'
      bodyFileDirectory: path/to/email_templates/email_templates
      htmlTemplateFile: service-stopped
      fromAdress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:
        - <Email address 1>
        - <Email address 2>
    serviceStarted:
      rateLimit: 30                   # Min seconds between emails for a given service. Defaults to 5 minutes.
      priority: high                  # high/normal/low
      subject: '✅ Windows service started on host {{host}}: "{{serviceDisplayName}}"'
      bodyFileDirectory: path/to/email_templates/email_templates
      htmlTemplateFile: service-started
      fromAdress: Qlik Sense (no-reply) <qliksense-noreply@mydomain.com>
      recipients:
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
```
