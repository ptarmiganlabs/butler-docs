---
title: "Config file syntax"
linkTitle: "Config file syntax"
weight: 10
description: >
  Description of Butler's config file.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Main Butler config file

The `production_template.yaml` config file looks like this (sorry for the incorrect syntax coloring, the issue is noted and is being worked on):

{{< notice info >}}
Starting with Butler version 9.0 there is a check that the config file has the correct format.

This means that if you forget to add or change some setting in the main YAML config file, Butler will tell you what's missing and refuse to start.  
A consequence of this is that all settings are now mandatory, even if you don't use them.
{{< /notice >}}

Trying to start Butler without some mandatory settings in the config file will result in an error message like this:

![Starting Butler with missing setting in YAML config file](/img/butler-startup-missing-settings-1.png "Starting Butler with missing setting in YAML config file.")

Adding the missing settings and restarting Butler will result in a successful startup.

```yaml
---
Butler:
  # General notes:
  # - File and directory paths in this sample config file use Linux/Mac syntax, i.e. using forward slashes.
  #   Windows paths work just as well, just make sure to quote them with single or double quotes.
  # - All entries in the config file are mandatory in the sense that they must be present.
  #   However, if a feature is not used the corresponding config entries can contain
  #   any value (for example the provided default ones).
  # - Butler will start using the settings in this file if the follwing settings are set first:
  #   - Butler.cert.clientCert: Set to the path of the client certificate file. If relative paths cause issues, use an absolute path.
  #   - Butler.cert.clientCertKey: Set to the path of the client key file. If relative paths cause issues, use an absolute path.
  #   - Butler.cert.clientCertCA: Set to the path of the CA certificate file. If relative paths cause issues, use an absolute path.
  #   - Butler.configEngine.host: Set to the IP or FQDN of the host where the Sense engine service is running.
  #   - Butler.configEngine.port: Set to the port where the Sense engine service is listening.
  #   - Butler.configQRS.host: Set to the IP or FQDN of the host where the Qlik Repository Service (QRS) is running.
  #   - Butler.configQRS.port: Set to the port where the Qlik Repository Service (QRS) is listening.
  # - Having set the above settings, Butler will start and run, but it will not do anything useful until you configure
  #   the various monitoring and notification settings, as described at https://butler.ptarmiganlabs.com.

  # Logging configuration
  logLevel: info # Log level. Possible log levels are silly, debug, verbose, info, warn, error
  fileLogging: false # true/false to enable/disable logging to disk file
  logDirectory: log # Directory where log files are stored (no trailing / )
  anonTelemetry:
    true # Can Butler send anonymous telemetry data?
    # More info on whata data is collected: https://butler.ptarmiganlabs.com/docs/about/telemetry/
    # Please consider leaving this at true - it really helps future development of Butler!

  # Should Butler start a web server that serves an obfuscated view of the Butler config file?
  configVisualisation:
    enable: true
    host: localhost # Hostname or IP address where the web server will listen. Should be localhost in most cases.
    port: 3100 # Port where the web server will listen. Change if port 3100 is already in use.
    obfuscate: true # Should the config file shown in the web UI be obfuscated?

  # Heartbeats can be used to send "I'm alive" messages to any other tool, e.g. an infrastructure monitoring tool
  heartbeat:
    enable: false
    remoteURL: http://my.monitoring.server/some/path/
    frequency: every 30 seconds # https://bunkat.github.io/later/parsers.html#text

  # Docker health checks are used when running Butler as a Docker container.
  # The Docker engine will call the container's health check REST endpoint with a set interval to determine
  # whether the container is alive/well or not.
  # If you are not running Butler in Docker you can safely disable this feature.
  dockerHealthCheck:
    enable: false # Control whether a REST endpoint will be set up to serve Docker health check messages
    port: 12398 # Port the Docker health check service runs on (if enabled)

  # Uptime monitor
  uptimeMonitor:
    enable: false # Should uptime messages be written to the console and log files?
    frequency: every 15 minutes # https://bunkat.github.io/later/parsers.html#text
    logLevel: verbose # Starting at what log level should uptime messages be shown?
    storeInInfluxdb:
      enable: false # Should Butler memory usage be logged to InfluxDB?
    storeNewRelic:
      enable: false
      destinationAccount:
        - First NR account
        - Second NR account
      # There are different URLs depending on whther you have an EU or US region New Relic account.
      # The available URLs are listed here: https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/choose-your-data-center/
      # As of this writing the options for the New Relic metrics API are
      # https://insights-collector.eu01.nr-data.net/metric/v1
      # https://metric-api.newrelic.com/metric/v1
      url: https://insights-collector.eu01.nr-data.net/metric/v1 # Where should uptime data be sent?
      header: # Custom http headers
        - name: X-My-Header
          value: Header value
      metric:
        dynamic:
          butlerMemoryUsage:
            enable: true # Should Butler's memory/RAM usage be sent to New Relic?
          butlerUptime:
            enable: true # Should Butler's uptime (how long since it was started) be sent to New Relic?
      attribute:
        static: # Static attributes/dimensions to attach to the data sent to New Relic.
          - name: metricType
            value: butler-uptime
          - name: service
            value: butler
          - name: environment
            value: prod
        dynamic:
          butlerVersion:
            enable: true # Should the Butler version be included in the data sent to New Relic?

  # Credentials for third party systems that Butler integrate with.
  # These can also be specified via command line parameters when starting Butler.
  # Command line options takes precedence over settings in this config file.
  thirdPartyToolsCredentials:
    newRelic:# Array of New Relic accounts/insert keys. Any data sent to New Relic will be sent to both accounts.
      # - accountName: First NR account
      #   insertApiKey: <API key 1 (with insert permissions) from New Relic>
      #   accountId: <New Relic account ID 1>
      # - accountName: Second NR account
      #   insertApiKey: <API key 2 (with insert permissions) from New Relic>
      #   accountId: <New Relic account ID 2>

  # InfluxDB settings
  influxDb:
    enable: false # Master switch for InfluxDB integration. If false, no data will be sent to InfluxDB.
    hostIP: influxdb.mycompany.com # IP or FQDN of Influxdb server
    hostPort: 8086 # Port where Influxdb is listening. Default=8086
    auth:
      enable: false # Does InfluxDB require login?
      username: user_joe
      password: joesecret
    dbName: butler # Name of database in InfluxDB to which Butler's data is written
    # Default retention policy that should be created in InfluxDB when Butler creates a new database there.
    # Any data older than retention policy threshold will be purged from InfluxDB.
    retentionPolicy:
      name: 10d
      duration: 10d
    tag:
      static:# Static tags to attach to all data stored in InfluxDB
        # - name: butler_instance
        #   value: dev
    reloadTaskFailure:
      enable: true
      tailScriptLogLines: 20
      tag:
        static: # Static tags to attach to data stored in InfluxDB
          - name: butler_instance
            value: prod-1
        dynamic:
          useAppTags: true # Should app tags be stored in InfluxDB as tags?
          useTaskTags: true # Should task tags be stored in InfluxDB as tags?
    reloadTaskSuccess:
      enable: true
      allReloadTasks:
        enable: false
      byCustomProperty:
        enable: true
        customPropertyName: "Butler_SuccessReloadTask_InfluxDB"
        enabledValue: "Yes"
      tag:
        static:# Static attributes/dimensions to attach to events sent to InfluxDb
          # - name: event-specific-tag 1
          #   value: abc 123
        dynamic:
          useAppTags: true # Should app tags be sent to InfluxDb as tags?
          useTaskTags: true # Should task tags be sent to InfluxDb as tags?

  # Store script logs of failed reloads on disk.
  # The script logs will be stored in daily directories under the specified main directory below
  # NOTE: Use an absolute path when running Butler as a standalone executable!
  scriptLog:
    storeOnDisk:
      clientManaged:
        reloadTaskFailure:
          enable: false
          logDirectory: /path/to/scriptlogs/qseow
      qsCloud:
        appReloadFailure:
          enable: false
          logDirectory: /path/to/scriptlogs/qscloud

  # Qlik Sense (client-managed) related links used in notification messages
  qlikSenseUrls:
    qmc: <URL to Qlik Sense QMC>
    hub: <URL to Qlik Sense Hub>
    appBaseUrl: <URL to Qlik Sense hub>/<virtual proxy, if any>/sense/app # Base URL for Qlik Sense apps, for example http://sense.mycompany.net/sense/app. App ID will be appended to this URL.

  # Links available as template variables in notification messages
  genericUrls:
    - id: ptarmiganlabs_com
      linkText: Ptarmigan Labs home page
      comment: The home page of the company behind Butler
      url: https://ptarmiganlabs.com
    - id: butler_docs
      linkText: Butler documentation
      comment: The documentation for Butler
      url: https://butler.ptarmiganlabs.com

  # Settings for monitoring Qlik Sense version info
  # Version info is retrieved from the hostname:9032/v1/systeminfo endpoint in Qlik Sense
  qlikSenseVersion:
    versionMonitor:
      enable: false # Should Qlik Sense version info be retrieved?
      frequency: every 24 hours # https://bunkat.github.io/later/parsers.html#text
      host: <FQDN or IP of Qlik Sense central node>
      rejectUnauthorized: false # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
      destination:
        influxDb: # Store version data in InfluxDB.
          # If enabled, version info will be stored as measurements in InfluxDB.
          enable: false
          tag:
            static: # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar

  # Settings for monitoring Qlik Sense licenses
  qlikSenseLicense:
    serverLicenseMonitor:
      enable: false
      frequency: every 24 hours # https://bunkat.github.io/later/parsers.html#text
      alert: # Alert if the number of days left on the license is below the threshold
        # License expiry alerts on a global level are enabled here, then configured on
        # a per-destination basis elsewhere in this config file.
        thresholdDays: 60
      destination:
        influxDb: # Store license data in InfluxDB
          enable: false
          tag:
            static: # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar
        mqtt:
          enable: false
          sendRecurring: # Send license data to the MQTT broker at the frequency specified above
            enable: true
          sendAlert: # Send an MQTT alert if the number of days left on the license is below the threshold
            enable: true
        webhook:
          enable: false
          sendRecurring: # Send license data to webhook(s) at the frequency specified above
            enable: true
          sendAlert: # Send alert to webhook(s) if the number of days left on the license is below
            # the threshold or the license has already expired
            enable: true
    licenseMonitor: # Monitor Qlik Sense accesds license usage
      enable: false
      frequency: every 6 hours # https://bunkat.github.io/later/parsers.html#text
      destination:
        influxDb: # Store license data in InfluxDB
          enable: false
          tag:
            static: # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar
    licenseRelease: # Release unused Qlik Sense access licenses
      enable: false # true/false. If true, Butler will release unused licenses according to settings below
      dryRun: true # true/false. If true, Butler will not actually release any licenses, just log what it would have done.
      frequency: every 24 hours # https://bunkat.github.io/later/parsers.html#text
      neverRelease: # Various ways of defining which users should never have their licenses released
        user: # Users who should never have their licenses released
          - userDir: "INTERNAL"
            userId: "sa_repository"
          - userDir: "INTERNAL"
            userId: "sa_api"
          - userDir: "USERDIR"
            userId: "qs_admin_account"
        tag: # Users with these tags will never have their licenses released
          - License do not release
          - some other tag
        customProperty: # Users with these custom properties will never have their licenses released
          - name: LicenseManage
            value: do-not-release
        userDirectory: # List of user directories whose users should never have their licenses released
          - INTERNAL
          - ADMIN
        inactive:
          Ignore # Ignore/Yes/No. The value is case insensitive
          #   No = Don't release licenses for users marked as "Inactive=No" in the QMC
          #   Yes = Don't release licenses for users marked as "Inactive=Yes" in the QMC
          #   Ignore = Disregard this setting
        blocked: Ignore # Ignore/Yes/No, No = Don't release licenses for users marked as "Blocked=No" in the QMC
        removedExternally: ignore # Ignore/Yes/No, No = Don't release licenses for users marked as "Removed externally=No" in the QMC
      licenseType: # License types to monitor and release
        analyzer:
          enable: true # Monitor and release Analyzer licenses
          releaseThresholdDays: 30 # Number of days a license can be unused before it is released
        professional:
          enable: true # Monitor and release Professional licenses
          releaseThresholdDays: 30 # Number of days a license can be unused before it is released
      destination:
        influxDb: # Store info about released licenses in InfluxDB
          enable: false
          tag:
            static: # Static attributes/tags to attach to the data sent to InfluxDB
              - name: foo
                value: bar

  # Settings for notifications and messages sent to MS Teams
  teamsNotification:
    enable: false
    reloadTaskFailure:
      enable: false
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload failed: "{{taskName}}"' # Only needed if message type = basic
      rateLimit: 300 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/teams/template/directory/failed-reload-qseow.handlebars
    reloadTaskAborted:
      enable: false
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload aborted: "{{taskName}}"' # Only needed if message type = basic
      rateLimit: 300 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/teams/template/directory/aborted-reload-qseow.handlebars
    serviceStopped:
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service stopped: "{{serviceName}}" on host "{{host}}"' # Only needed if message type = basic
      rateLimit: 30 # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/teams/template/directory/service-stopped.handlebars
    serviceStarted:
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service started: "{{serviceName}}" on host "{{host}}"' # Only needed if message type = basic
      rateLimit: 30 # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/teams/template/directory/service-started.handlebars

  # Settings for notifications and messages sent to Slack
  slackNotification:
    enable: false
    restMessage:
      webhookURL: <web hook URL from Slack> # Webhook to use when sending basic Slack messages via Butler's REST API
    reloadTaskFailure: # Reload task failed in QSEoW
      enable: false
      webhookURL: <web hook URL from Slack>
      channel: sense-task-failure # Slack channel to which task failure notifications are sent
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload failed: "{{taskName}}"' # Only needed if message type = basic
      rateLimit: 300 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/slack/template/directory/failed-reload-qseow.handlebars
      fromUser: Qlik Sense
      iconEmoji: ":ghost:"
    reloadTaskAborted: # Reload task aborted in QSEoW
      enable: false
      webhookURL: <web hook URL from Slack>
      channel: sense-task-aborted # Slack channel to which task stopped notifications are sent
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload aborted: "{{taskName}}"' # Only needed if message type = basic
      rateLimit: 300 # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/slack/template/directory/aborted-reload-qseow.handlebars
      fromUser: Qlik Sense
      iconEmoji: ":ghost:"
    serviceStopped:
      webhookURL: <web hook URL from Slack>
      channel: qliksense-service-alert # Slack channel to which Windows service stopped notifications are sent
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service stopped: "{{serviceName}}" on host "{{host}}"' # Only needed if message type = basic
      rateLimit: 30 # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/slack/template/directory/service-stopped.handlebars
      fromUser: Qlik Sense
      iconEmoji: ":ghost:"
    serviceStarted:
      webhookURL: <web hook URL from Slack>
      channel: qliksense-service-alert # Slack channel to which Windows service stopped notifications are sent
      messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Windows service started: "{{serviceName}}" on host "{{host}}"' # Only needed if message type = basic
      rateLimit: 30 # Min seconds between messages for a given Windows service. Defaults to 5 minutes.
      templateFile: /path/to/slack/template/directory/service-started.handlebars
      fromUser: Qlik Sense
      iconEmoji: ":ghost:"

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
        customPropertyName: "Butler_SuccessAlertEnableEmail"
        enabledValue: "Yes"
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: "Butler_SuccessAlertSendToEmail"
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
        customPropertyName: "Butler_AbortedAlertEnableEmail"
        enabledValue: "Yes"
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: "Butler_AbortedAlertSendToEmail"
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
        customPropertyName: "Butler_FailedAlertEnableEmail"
        enabledValue: "Yes"
      # Custom property used to say that alerts for a certain task should be sent to zero or more recipients
      # These alerts will be sent irrespective of the alertEnableByCustomProperty.enable setting.
      alertEnabledByEmailAddress:
        customPropertyName: "Butler_FailedAlertSendToEmail"
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
      host: <FQDN or IP or email server, e.g. smtp.gmail.com>
      port: <port on which SMTP server is listening>
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

  # Incident management tools integration
  # Used to trigger incidents in these tools when task reloads fail or are aborted.
  incidentTool:
    signl4:
      enable: false # Enable/disable Signl4 integration as a whole
      url: https://connect.signl4.com/webhook/abcde12345
      reloadTaskFailure:
        enable: false # Enable/disable reload failed handling in Signl4
        rateLimit: 15 # Min seconds between emails for a given taskID. Defaults to 5 minutes
        serviceName: Qlik Sense # Signl4 "service name" to use
        severity: 1 # Signl4 severity level for failed reloads
        includeApp:
          includeAll: false
          appId:
            - 47d38f73-628f-44e1-a62c-841604b123ff
      reloadTaskAborted:
        enable: false # Enable/disable reload aborted handling in Signl4
        rateLimit: 15 # Min seconds between emails for a given taskID. Defaults to 5 minutes
        serviceName: Qlik Sense # Signl4 "service name" to use
        severity: 10 # Signl4 severity level for aborted reloads
        includeApp:
          includeAll: false
          appId:
            - 47d38f73-628f-44e1-a62c-841604b123ff
    newRelic:
      enable: false
      destinationAccount:
        event:# Failed/aborted reload tasks are sent as events to these New Relic accounts
          # - First NR account
          # - Second NR account
        log:# Failed/aborted reload tasks are sent as log entries to these New Relic accounts
          # - First NR account
          # - Second NR account
      # New Relic uses different API URLs for different kinds of data (metrics, events, logs, ...)
      # There are different URLs depending on whther you have an EU or US region New Relic account.
      # The available URLs are listed here: https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/choose-your-data-center/
      url:
        # As of this writing the valid options are
        # https://insights-collector.eu01.nr-data.net
        # https://insights-collector.newrelic.com
        event: https://insights-collector.eu01.nr-data.net

        # Valid options are (1) EU/rest of world and 2) US)
        # https://log-api.eu.newrelic.com/log/v1
        # https://log-api.newrelic.com/log/v1
        log: https://log-api.eu.newrelic.com/log/v1
      reloadTaskFailure:
        destination:
          event:
            enable: false
            sendToAccount: # Which reload task failures are sent to New Relic as events
              byCustomProperty:
                enable: false # Control using a task custom property which reload task failures are sent as events
                customPropertyName: "Butler_FailedTask_Event_NewRelicAccount"
              always:
                enable: false # Controls which New Relic accounts ALL failed reload tasks are sent to (as events)
                account:
                  # - First NR account
                  # - Second NR account
            attribute:
              static: # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute 1 # Example
                  value: abc 123 # Example
              dynamic:
                useAppTags: true # Should app tags be sent to New Relic as attributes?
                useTaskTags: true # Should task tags be sent to New Relic as attributes?
          log:
            enable: false
            tailScriptLogLines: 20
            sendToAccount: # Which reload task failures are sent to New Relic as log entries
              byCustomProperty:
                enable: false # Control using a task custom property which reload task failures are sent as log entries
                customPropertyName: "Butler_FailedTask_Log_NewRelicAccount"
              always:
                enable: false # Controls which New Relic accounts ALL failed reload tasks are sent to (as logs)
                account:
                  # - First NR account
                  # - Second NR account
            attribute:
              static: # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute 1 # Example
                  value: def 123 # Example
              dynamic:
                useAppTags: true # Should app tags be sent to New Relic as attributes?
                useTaskTags: true # Should task tags be sent to New Relic as attributes?
        sharedSettings:
          rateLimit: 15 # Min seconds between events sent to New Relic for a given taskID. Defaults to 5 minutes.
          header: # Custom http headers
            - name: X-My-Header # Example
              value: Header value 1 # Example
          attribute:
            static: # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service # Example
                value: butler # Example
              - name: environment # Example
                value: prod # Example
      reloadTaskAborted:
        destination:
          event:
            enable: false
            sendToAccount: # Which reload task aborts are sent to New Relic as events
              byCustomProperty:
                enable: false # Control using a task custom property which reload task aborts are sent as events
                customPropertyName: "Butler_AbortedTask_Event_NewRelicAccount"
              always:
                enable: false # Controls which New Relic accounts ALL aborted reload tasks are sent to (as events)
                account:
                  # - First NR account
                  # - Second NR account
            attribute:
              static: # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute 2 # Example
                  value: abc 123 # Example
              dynamic:
                useAppTags: true # Should app tags be sent to New Relic as attributes?
                useTaskTags: true # Should task tags be sent to New Relic as attributes?
          log:
            enable: false
            tailScriptLogLines: 20
            sendToAccount: # Which reload task aborts are sent to New Relic as log entries
              byCustomProperty:
                enable: false # Control using a task custom property which reload task aborts are sent as log entries
                customPropertyName: "Butler_AbortedTask_Log_NewRelicAccount"
              always:
                enable: false # Controls which New Relic accounts ALL aborted reload tasks are sent to (as logs)
                account:
                  # - First NR account
                  # - Second NR account
            attribute:
              static: # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute 2 # Example
                  value: def 123 # Example
              dynamic:
                useAppTags: true # Should app tags be sent to New Relic as attributes?
                useTaskTags: true # Should task tags be sent to New Relic as attributes?
        sharedSettings:
          rateLimit: 15 # Min seconds between events sent to New Relic for a given taskID. Defaults to 5 minutes.
          header: # Custom http headers
            - name: X-My-Header # Example
              value: Header value 2 # Example
          attribute:
            static: # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service # Example
                value: butler # Example
              - name: environment # Example
                value: prod # Example
      serviceMonitor:
        destination:
          event:
            enable: false
            sendToAccount:# Windows service events are sent to these New Relic accounts
              # - First NR account
              # - Second NR account
            attribute:
              static: # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute
                  value: abc 123
              dynamic:
                serviceHost: true # Should host where service is running be sent to New Relic as attribute?
                serviceName: true # Should service name be sent to New Relic as attribute?
                serviceDisplayName: true # Should service display name be sent to New Relic as attribute?
                serviceState: true # Should service state be sent to New Relic as attribute?
          log:
            enable: false
            sendToAccount:# Windows service log entries are sent to these New Relic accounts
              # - First NR account
              # - Second NR account
            attribute:
              static: # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute
                  value: def 456
              dynamic:
                serviceHost: true # Should host where service is running be sent to New Relic as attribute?
                serviceName: true # Should service name be sent to New Relic as attribute?
                serviceDisplayName: true # Should service display name be sent to New Relic as attribute?
                serviceState: true # Should service state be sent to New Relic as attribute?
        monitorServiceState: # Control whih service states are sent to New Relic
          running:
            enable: true
          stopped:
            enable: true
        sharedSettings:
          rateLimit: 5 # Min seconds between events/logs sent to New Relic for a given host+service. Defaults to 5 minutes.
          header: # Custom http headers
            - name: X-My-Header # Example
              value: Header value 2 # Example
          attribute:
            static: # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service # Example
                value: butler # Example
              - name: environment # Example
                value: prod # Example

  # Settings for notifications and messages sent using outgoing webhooks
  webhookNotification:
    enable: false
    reloadTaskFailure:
      rateLimit: 300 # Min seconds between outgoing webhook calls for a given taskID. Defaults to 5 minutes.
      webhooks:
        # - description: 'This outgoing webhook makes a POST and is used to...'  # Informational only
        #   webhookURL: http://host.my.domain:port/some/path      # outgoing webhook that Butler will call
        #   httpMethod: POST                                      # GET/POST/PUT
        #   cert:
        #     enable: false                                       # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: true                            # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: /path/to/ca-certificate.pem                 # Path to the CA certificate file
        # - description: 'This outgoing webhook makes a PUT and is used to...'  # Informational only
        #   webhookURL: https://host.my.domain:port/some/path     # Outgoing webhook that Butler will call
        #   httpMethod: PUT                                       # GET/POST/PUT.
        #   cert:
        #     enable: true                                        # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: false                           # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: /path/to/ca-certificate.pem                 # Path to the CA certificate file
        # - description: 'This outgoing webhook makes a GET and is used to ..'  # Informational only
        #   webhookURL: https://host.my.domain:port/some/path     # Outgoing webhook that Butler will call
        #   httpMethod: GET                                       # GET/POST/PUT
        #   cert:
        #     enable: true                                        # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: true                            # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: /path/to/ca-certificate.pem                 # Path to the CA certificate file
    reloadTaskAborted:
      rateLimit: 300 # Min seconds between outgoing webhook calls for a given taskID. Defaults to 5 minutes.
      webhooks:
        # - description: 'This outgoing webhook makes a GET and is used to ..'  # Informational only
        #   webhookURL: http://host.my.domain:port/some/path      # Outgoing webhook that Butler will call
        #   httpMethod: GET                                       # GET/POST/PUT
        #   cert:
        #     enable: true                                        # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: true                            # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: /path/to/ca-certificate.pem                 # Path to the CA certificate file
    serviceMonitor:
      rateLimit: 300 # Min seconds between outgoing webhook calls, per Windows service that is monitored. Defaults to 5 minutes.
      webhooks:
        # - description: 'This outgoing webhook makes a POST and is used to...' # Informational only
        #   webhookURL: http://host.my.domain:port/some/path      # Outgoing webhook that Butler will call
        #   httpMethod: POST                                      # GET/POST/PUT. Note that the body and URL query parameters differs depending on which method is used
        #   cert:
        #     enable: true                                        # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: true                            # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: /path/to/ca-certificate.pem                 # Path to the CA certificate file
    qlikSenseServerLicenseMonitor: # Outgoing webhook that Butler will call with info on Qlik Sense server license status
      rateLimit: 300 # Min seconds between outgoing webhook calls, per Windows service that is monitored. Defaults to 5 minutes.
      webhooks:
        # - description: 'This outgoing webhook makes a PUT and is used to ...'
        #   webhookURL: http://host.my.domain:port/some/path
        #   httpMethod: PUT                   # GET/POST/PUT. Note that the body and URL query parameters differs depending on which method is used
        #   cert:
        #     enable: false                    # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: true        # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: foo
    qlikSenseServerLicenseExpiryAlert: # Outgoing webhook that Butler will call when Qlik Sense server license is about to expire
      rateLimit: 300 # Min seconds between outgoing webhook calls, per Windows service that is monitored. Defaults to 5 minutes.
      webhooks:
        # - description: 'This outgoing webhook makes a POST and is used to ...'
        #   webhookURL: https://host.my.domain:port/some/path
        #   httpMethod: POST                   # GET/POST/PUT. Note that the body and URL query parameters differs depending on which method is used
        #   cert:
        #     enable: true                     # Set to true to use a custom CA certificate when calling the webhookURL
        #     rejectUnauthorized: true         # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
        #     certCA: /path/to/ca-certificate.pem   # Path to the CA certificate file

  # Scheduler for Qlik Sense tasks
  scheduler:
    enable: false # Should Butler's reload task scheduler be started?
    configfile: config/schedule.yaml # Path to file containing task start schedules

  # Key-value store
  keyValueStore:
    enable: false # Should Butler's key-value store be enabled?
    maxKeysPerNamespace: 1000 # Max keys that can be stored per namespace. Defaults to 1000 if not specified in this file.

  mqttConfig:
    enable: false # Should Qlik Sense events be forwarded as MQTT messages?
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
    azureEventGrid:
      enable: false # If set to true, Butler will connect to an Azure Event Grid MQTT Broker, using brokerHost and brokerPort above
      clientId: <client ID>
      clientCertFile: <path to client certificate file>
      clientKeyFile: <path to client key file>
    taskFailureSendFull: true
    taskAbortedSendFull: true
    subscriptionRootTopic: qliksense/# # Topic that Butler will subscribe to
    taskStartTopic: qliksense/start_task # Topic for incoming messages used to start Sense tasks. Should be subtopic to subscriptionRootTopic
    taskFailureTopic: qliksense/task_failure
    taskFailureFullTopic: qliksense/task_failure_full
    taskFailureServerStatusTopic: qliksense/butler/task_failure_server
    taskAbortedTopic: qliksense/task_aborted
    taskAbortedFullTopic: qliksense/task_aborted_full
    serviceRunningTopic: qliksense/service_running
    serviceStoppedTopic: qliksense/service_stopped
    serviceStatusTopic: qliksense/service_status
    qlikSenseServerLicenseTopic: qliksense/qliksense_server_license # Topic to which Sense server license info is published
    qlikSenseServerLicenseExpireTopic: qliksense/qliksense_server_license_expire # Topic to which Sense server license expiration alerts are published
    qlikSenseCloud: # MQTT settings for Qlik Sense Cloud integration
      event:
        mqttForward: # QS Cloud events forwarded to MQTT topics, which Butler will subscribe to
          enable: false
          broker: # Settings for MQTT broker to which QS Cloud events are forwarded
            host: mqttbroker.company.com
            port: <port>
            username: <username>
            password: <password>
          topic:
            subscriptionRoot: qscloud/# # Topic that Butler will subscribe to
            appReload: qscloud/app/reload

  udpServerConfig:
    enable: false # Should the UDP server responsible for receving task failure/aborted events be started?
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998

  restServerConfig:
    enable: false # Should Butler's REST API be started? Must be true if *any* API endpoints are to be used.
    serverHost: <FQDN or IP (or localhost) of server where Butler is running> # Use 0.0.0.0 to listen on all network interfaces (e.g. when running in Docker!).
    serverPort: 8080 # Port where Butler's REST is available. Any free port on the server where Butler is running can bse used.
    backgroundServerPort: 8081 # Port used internally by Butler's REST API. Any free port on the server where Butler is running can bse used.

  # List of directories between which file copying via the REST API can be done.
  # Butler will try to clean up messy paths like this one, which resolves to /Users/goran/butler-test-dir1
  # How? First you have /Users/goran/butler-test-dir1//abc which cleans up to /Users/goran/butler-test-dir1/abc,
  # then up one level (..).
  fileCopyApprovedDirectories:
    # - fromDirectory: /Users/goran/butler-test-dir1//abc//..
    #   toDirectory: /Users/goran/butler-test-dir2
    # - fromDirectory: /Users/goran/butler-test-dir2
    #   toDirectory: /Users/goran/butler-test-dir1
    # - fromDirectory: /from/some/directory2
    #   toDirectory: /to/some/directory2

  # List of directories between which file moves via the REST API can be done.
  fileMoveApprovedDirectories:
    # - fromDirectory: /Users/goran/butler-test-dir1//abc//..
    #   toDirectory: /Users/goran/butler-test-dir2
    # - fromDirectory: /Users/goran/butler-test-dir2
    #   toDirectory: /Users/goran/butler-test-dir1
    # - fromDirectory: /from/some/directory2
    #   toDirectory: /to/some/directory2

  # List of directories in which file deletes via the REST API can be done.
  fileDeleteApprovedDirectories:
    # - /Users/goran/butler-test-dir1
    # - /Users/goran/butler-test-dir1//abc//..
    # - /Users/goran/butler-test-dir2

  # If set to true, Butler will be started with a focus on creating an API documentation file
  # All configuration relating to outbound connections (to Sense, email servers, MQTT broker etc) will be disabled.
  # NOTE: This setting should always be false (or just deleted), unless you want to regenerate the API doc files.
  restServerApiDocGenerate: false

  # Enable/disable individual REST API endpoints. Set config item below to true to enable that endpoint.
  restServerEndpointsEnable:
    apiListEnbledEndpoints: false
    base62ToBase16: false
    base16ToBase62: false
    butlerping: false
    createDir: false
    createDirQVD: false
    fileDelete: false
    fileMove: false
    fileCopy: false
    keyValueStore: false
    mqttPublishMessage: false
    newRelic:
      postNewRelicMetric: false
      postNewRelicEvent: false
    scheduler:
      createNewSchedule: false
      getSchedule: false
      getScheduleStatusAll: false
      updateSchedule: false
      deleteSchedule: false
      startSchedule: false
      stopSchedule: false
    senseAppReload: false
    senseAppDump: false
    senseListApps: false
    senseStartTask: false
    slackPostMessage: false

  restServerEndpointsConfig:
    newRelic:
      postNewRelicMetric: # Setings used by post metric to New Relic API endpoint
        destinationAccount:
          # - First NR account
          # - Second NR account
        # As of this writing the valid options are
        # https://insights-collector.eu01.nr-data.net/metric/v1
        # https://insights-collector.newrelic.com/metric/v1
        url: https://insights-collector.eu01.nr-data.net/metric/v1
        header: # Custom http headers
          - name: X-My-Header
            value: Header value
        attribute:
          static: # Static attributes/dimensions to attach to the metrics data sent to New Relic.
            - name: env
              value: prod
      postNewRelicEvent: # Setings used by post event to New Relic API endpoint
        destinationAccount:
          # - First NR account
          # - Second NR account
        # Note that the URL path should *not* be included in the url setting below!
        # As of this writing the valid options are
        # https://insights-collector.eu01.nr-data.net
        # https://insights-collector.newrelic.com
        url: https://insights-collector.eu01.nr-data.net/
        header: # Custom http headers
          - name: X-My-Header
            value: Header value
        attribute:
          static: # Static attributes/dimensions to attach to the metrics data sent to New Relic.
            - name: env
              value: prod

  # Controls which tasks can be started via Butler's REST API.
  # Enabling this feature gives Qlik Sense sysadmins a way to control which tasks can be started by third party systems and applications.
  # If this feature is disabled all tasks can be started via the API (assuming the start task API itself is enabled).
  # Note that the taskId, tag and customProperty sections below are additive. I.e. a task only has to appear in one of those sections to be on the "allowed" list.
  startTaskFilter:
    enable: false
    allowTask:
      taskId:
        # Zero or more approved/allowed task IDs
        # If Butler.startTaskFilter.enable is true, only task IDs listed below will be started by Butler
        # - e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e
        # - 7552d9fc-d1bb-4975-9a38-18357de531ea
        # - fb0f317d-da91-4b86-aafa-0174ae1e8c8f
      tag:
        # Zero or more tags used to indicate that a task is approved to be started by Butler.
        # Use the Qlik Sense QMC to set tags on tasks.
        # If Butler.startTaskFilter.enable is true, only tasks with the tags below will be started by Butler
        # - startTask1
        # - startTask2
      customProperty:
        # Zero or more custom properties name/value pairs used to indicate that a task is approved to be started by Butler.
        # Use the Qlik Sense QMC to set custom properties on tasks.
        # If Butler.startTaskFilter.enable is true, only tasks with the custom property values below will be started by Butler
        # - name: taskGroup
        #   value: tasks1
        # - name: taskGroup
        #   value: tasks2

  # Monitor Windows services.
  # This feature only works when Butler is running on Windows Server or desktop.
  # On other OSs service monitoring will be automatically disabled.
  serviceMonitor:
    enable: false # Main on/off switch for service monitoring
    frequency: every 30 seconds # https://bunkat.github.io/later/parsers.html#text
    monitor:
      # - host: <hostname or IP>      # Host name of Windows computer where services are running
      #   services:                   # List of services to monitor
      #     - name: postgresql-x64-12       # Posgress/repository db
      #       friendlyName: Repository DB
      #     - name: QlikSenseEngineService
      #       friendlyName: Engine
      #     - name: QlikSensePrintingService
      #       friendlyName: Printing
      #     - name: QlikSenseProxyService
      #       friendlyName: Proxy
      #     - name: QlikSenseRepositoryService
      #       friendlyName: Repository
      #     - name: QlikSenseSchedulerService
      #       friendlyName: Scheduler
      #     - name: QlikSenseServiceDispatcher
      #       friendlyName: Service Dispatcher
    alertDestination: # Control to thich destinations service related alerts are sent
      influxDb: # Send service alerts to InfluxDB
        enable: true
      newRelic: # Send service alerts to New Relic
        enable: true
      email: # Send service alerts as emails
        enable: true
      mqtt: # Send service alerts as MQTT messages
        enable: true
      teams: # Send service alerts as MS Teams messages
        enable: true
      slack: # Send service alerts as Slack messages
        enable: true
      webhook: # Send service alerts as outbound webhooks/http calls
        enable: true

  qlikSenseCloud: # Settings for Qlik Sense Cloud integration
    enable: false
    event:
      mqtt: # Which QS Cloud tenant should Butler receive events from, in the form of MQTT messages?
        tenant:
          id: tenant.region.qlikcloud.com
          tenantUrl: https://tenant.region.qlikcloud.com
          authType: jwt # Authentication type used to connect to the tenant. Valid options are "jwt"
          auth:
            jwt:
              token: <JWT token> # JWT token used to authenticate Butler when connecting to the tenant
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
                messageType: formatted # formatted / basic
                basicMsgTemplate: 'Qlik Sense Cloud app reload failed: "{{appName}}"' # Only needed if message type = basic
                rateLimit: 15 # Min seconds between emails for a given appId. Defaults to 5 minutes.
                headScriptLogLines: 15
                tailScriptLogLines: 15
                templateFile: /path/to/teams_templates/failed-reload-qscloud-workflow.handlebars

            # Settings for notifications and messages sent to Slack
            slackNotification:
              reloadAppFailure:
                enable: false
                alertEnableByTag:
                  enable: false
                  tag: Butler - Send Slack alert if app reload fails
                basicContentOnly: false
                webhookURL: <URL to Slack webhook>
                channel: sense-task-failure # Slack channel to which task failure notifications are sent
                messageType: formatted # formatted / basic. Formatted means that template file below will be used to create the message.
                basicMsgTemplate: 'Qlik Sense Cloud app reload failed: "{{appName}}"' # Only needed if message type = basic
                rateLimit: 60 # Min seconds between emails for a given appId. Defaults to 5 minutes.
                headScriptLogLines: 10
                tailScriptLogLines: 20
                templateFile: /path/to/slack_templates/failed-reload-qscloud.handlebars
                fromUser: Qlik Sense
                iconEmoji: ":ghost:"

            # Settings needed to send email notifications when for example reload tasks fail.
            # Reload failure notifications assume a log appender is configured in Sense AND that the UDP server in Butler is running.
            emailNotification:
              reloadAppFailure:
                enable: false # Enable/disable app reload failed notifications via email
                alertEnableByTag:
                  enable: false
                  tag: Butler - Send email if app reload fails
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
                rateLimit: 60 # Min seconds between emails for a given appId/recipient combo. Defaults to 5 minutes.
                headScriptLogLines: 15
                tailScriptLogLines: 25
                priority: high # high/normal/low
                subject: '❌ Qlik Sense reload failed: "{{taskName}}"'
                bodyFileDirectory: /path/to//email_templates
                htmlTemplateFile: failed-reload-qscloud
                fromAddress: Qlik Sense (no-reply) <qliksense-noreply@ptarmiganlabs.com>
                recipients:
                  # - emma@somecompany.com
                  # - patrick@somecompany.com

  # Certificates to use when connecting to Sense. Get these from the Certificate Export in QMC.
  cert:
    clientCert: <path/to/cert/client.pem>
    clientCertKey: <path/to/cert/client_key.pem>
    clientCertCA: <path/to/cert/root.pem>
    # If running Butler in a Docker container, the cert paths MUST be the following
    # clientCert: /nodeapp/config/certificate/client.pem
    # clientCertKey: /nodeapp/config/certificate/client_key.pem
    # clientCertCA: /nodeapp/config/certificate/root.pem

  configEngine:
    engineVersion: 12.612.0 # Qlik Associative Engine version to use with Enigma.js. Works with Feb 2020 and others
    host: <FQDN or IP of Sense server where Sense Engine is running>
    port: <Port to connect to, usually 4747>
    useSSL: true
    headers:
      static: # http headers that are sent with every request to QRS. The "X-Qlik-User" is mandatory.
        - name: X-Qlik-User # Header used to identify what user connection to QRS is made as
          value: UserDirectory=Internal;UserId=sa_repository # What user connection to QRS is made as
    rejectUnauthorized:
      false # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
      # Set to true if the Qlik Sense root CA is available on the computer where Butler is running.

  configQRS:
    authentication: certificates
    host: <FQDN or IP of Sense server where QRS is running>
    useSSL: true
    port: <Port to connect to, usually 4242>
    headers:
      static: # http headers that are sent with every request to QRS. The "X-Qlik-User" is mandatory.
        - name: X-Qlik-User # Header used to identify what user connection to QRS is made as
          value: UserDirectory=Internal;UserId=sa_repository # What user connection to QRS is made as
    rejectUnauthorized:
      false # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
      # Set to true if the Qlik Sense root CA is available on the computer where Butler is running.

  configDirectories:
    qvdPath: <Path to folder under which QVDs are stored>
```

### Comments

- Note that you can enable/disable most features independently of each other. This means Butler can be configured to do exactly what you need, and nothing more.

- The default location cert/key files are found in (assuming a standard install of Qlik Sense) `C:\ProgramData\Qlik\Sense\Repository\Exported Certificates\<name specified during certificate export>`

  The files needed by Butler are `client.pem`, `client_key.pem` and `root.pem`.
