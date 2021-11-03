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

```yaml
---
Butler:
  # General notes: 
  # - File and directory paths in this sample config file use Linux/Mac syntax, i.e. using forward slashes.
  #   Windows paths work just as well, just make sure to quote them with single or double quotes.

  # Logging configuration
  logLevel: info          # Log level. Possible log levels are silly, debug, verbose, info, warn, error
  fileLogging: false      # true/false to enable/disable logging to disk file
  logDirectory: log       # Directory where log files are stored (no trailing / )
  anonTelemetry: true     # Can Butler send anonymous telemetry data? 
                          # More info on whata data is collected: https://butler.ptarmiganlabs.com/docs/about/telemetry/
                          # Please consider leaving this at true - it really helps future development of Butler!

  # Heartbeats can be used to send "I'm alive" messages to any other tool, e.g. an infrastructure monitoring tool
  heartbeat:
    enable: false
    remoteURL: http://my.monitoring.server/some/path/
    frequency: every 30 seconds         # https://bunkat.github.io/later/parsers.html

  # Docker health checks are used when running Butler as a Docker container. 
  # The Docker engine will call the container's health check REST endpoint with a set interval to determine
  # whether the container is alive/well or not.
  # If you are not running Butler in Docker you can safely disable this feature. 
  dockerHealthCheck:
    enable: false    # Control whether a REST endpoint will be set up to serve Docker health check messages
    port: 12398      # Port the Docker health check service runs on (if enabled)

  # Uptime monitor
  uptimeMonitor:
    enable: false                   # Should uptime messages be written to the console and log files?
    frequency: every 15 minutes     # https://bunkat.github.io/later/parsers.html
    logLevel: verbose               # Starting at what log level should uptime messages be shown?
    storeInInfluxdb: 
      enable: false                 # Should Butler memory usage be logged to InfluxDB?
      hostIP: <IP or host name>     # Where is InfluxDB server located?
      hostPort: 8086                # InfluxDB port
      auth:
        enable: false               # Does InfluxDB require login?
        username: user_joe      
        password: joesecret
      dbName: butler                # Name of database in InfluxDB to which Butler's data is written
      instanceTag: DEV              # Tag that can be used to differentiate data from multiple Butler instances
      # Default retention policy that should be created in InfluxDB when Butler creates a new database there. 
      # Any data older than retention policy threshold will be purged from InfluxDB.
      retentionPolicy:
        name: 10d
        duration: 10d

  # Qlik Sense related links used in notification messages
  qlikSenseUrls:
    qmc: <Link to Qlik Sense QMC>
    hub: <Link to Qlik Sense Hub>

  # Settings for notifications and messages sent to MS Teams
  teamsNotification:
    enable: false
    reloadTaskFailure:
      enable: false
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted     # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload failed: "{{taskName}}"'      # Only needed if message type = basic
      rateLimit: 300             # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/teams/template/directory/failed-reload.handlebars
    reloadTaskAborted:
      enable: false
      webhookURL: <web hook URL from MS Teams>
      messageType: formatted     # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload aborted: "{{taskName}}"'       # Only needed if message type = basic
      rateLimit: 300             # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/teams/template/directory/aborted-reload.handlebars

  # Settings for notifications and messages sent to Slack
  slackNotification:
    enable: false
    restMessage:
      enable: false
      webhookURL: <web hook URL from Slack>
    reloadTaskFailure:
      enable: false
      webhookURL: <web hook URL from Slack>
      channel: sense-task-failure     # Slack channel to which task failure notifications are sent
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload failed: "{{taskName}}"'      # Only needed if message type = basic
      rateLimit: 300                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/slack/template/directory/failed-reload.handlebars
      fromUser: Qlik Sense
      iconEmoji: ':ghost:'
    reloadTaskAborted:
      enable: false
      webhookURL: <web hook URL from Slack>
      channel: sense-task-aborted     # Slack channel to which task stopped notifications are sent
      messageType: formatted          # formatted / basic. Formatted means that template file below will be used to create the message.
      basicMsgTemplate: 'Qlik Sense reload aborted: "{{taskName}}"'       # Only needed if message type = basic
      rateLimit: 300                  # Min seconds between emails for a given taskID. Defaults to 5 minutes.
      headScriptLogLines: 10
      tailScriptLogLines: 10
      templateFile: /path/to/slack/template/directory/aborted-reload.handlebars
      fromUser: Qlik Sense
      iconEmoji: ':ghost:'

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

  # Incident management tools integration
  # Used to trigger incidents in these tools when task reloads fail or are aborted.
  incidentTool:
    signl4:
      enable: false               # Enable/disable Signl4 integration as a whole
      url: https://connect.signl4.com/webhook/abcde12345
      reloadTaskFailure:
        enable: false             # Enable/disable reload failed handling in Signl4
        rateLimit: 15             # Min seconds between emails for a given taskID. Defaults to 5 minutes
        serviceName: Qlik Sense   # Signl4 "service name" to use
        severity: 1               # Signl4 severity level for failed reloads
      reloadTaskAborted:
        enable: false             # Enable/disable reload aborted handling in Signl4
        rateLimit: 15             # Min seconds between emails for a given taskID. Defaults to 5 minutes
        serviceName: Qlik Sense   # Signl4 "service name" to use
        severity: 10              # Signl4 severity level for aborted reloads


  # Settings for notifications and messages sent using outgoing webhooks
  webhookNotification:
    enable: false
    reloadTaskFailure:
      rateLimit: 300              # Min seconds between outgoing webhook calls for a given taskID. Defaults to 5 minutes.
      webhooks:
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: POST                                    # GET/POST/PUT
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: PUT                                     # GET/POST/PUT.
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: GET                                     # GET/POST/PUT
    reloadTaskAborted:
      rateLimit: 300              # Min seconds between outgoing webhook calls for a given taskID. Defaults to 5 minutes.
      webhooks:
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: PUT                                     # GET/POST/PUT
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: POST                                    # GET/POST/PUT
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: GET                                     # GET/POST/PUT

  # Scheduler for Qlik Sense tasks
  scheduler:
    enable: false                                     # Should Butler's reload task scheduler be started?
    configfile: config/schedule.yaml                  # Path to file containing task start schedules

  # Key-value store
  keyValueStore:
    enable: false                                     # Should Butler's key-value store be enabled?
    maxKeysPerNamespace: 1000                         # Max keys that can be stored per namespace. Defaults to 1000 if not specified in this file.

  mqttConfig:
    enable: false                                     # Should Qlik Sense events be forwarded as MQTT messages?
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
    taskFailureSendFull: true
    taskAbortedSendFull: true
    subscriptionRootTopic: qliksense/#                                  # Topic that Butler will subscribe to
    taskStartTopic: qliksense/start_task                                # Topic for incoming messages used to start Sense tasks. Should be subtopic to subscriptionRootTopic
    taskFailureTopic: qliksense/task_failure
    taskFailureFullTopic: qliksense/task_failure_full
    taskFailureServerStatusTopic: qliksense/butler/task_failure_server
    taskAbortedTopic: qliksense/task_aborted
    taskAbortedFullTopic: qliksense/task_aborted_full

  udpServerConfig:
    enable: false                                     # Should the UDP server responsible for receving task failure/aborted events be started?
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portTaskFailure: 9998

  restServerConfig:
    enable: false                                     # Should Butler's REST API be started? Must be true if *any* API endpoints are to be used.
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>   # Use 0.0.0.0 to listen on all network interfaces (e.g. when running in Docker!).
    serverPort: 8080                                  # Port where Butler's REST is available. Any free port on the server where Butler is running can bse used.
    backgroundServerPort: 8081                        # Port used internally by Butle's REST API. Any free port on the server where Butler is running can bse used.

  # List of directories between which file copying via the REST API can be done.
  # Butler will try to clean up messy paths like this one, which resolves to /Users/goran/butler-test-dir1
  # How? First you have /Users/goran/butler-test-dir1//abc which cleans up to /Users/goran/butler-test-dir1/abc, 
  # then up one level (..).
  fileCopyApprovedDirectories:                        
    - fromDirectory: /Users/goran/butler-test-dir1//abc//..     
      toDirectory: /Users/goran/butler-test-dir2
    - fromDirectory: /Users/goran/butler-test-dir2
      toDirectory: /Users/goran/butler-test-dir1
    - fromDirectory: /from/some/directory2
      toDirectory: /to/some/directory2

  # List of directories between which file moves via the REST API can be done.
  fileMoveApprovedDirectories:                        
    - fromDirectory: /Users/goran/butler-test-dir1//abc//..
      toDirectory: /Users/goran/butler-test-dir2
    - fromDirectory: /Users/goran/butler-test-dir2
      toDirectory: /Users/goran/butler-test-dir1
    - fromDirectory: /from/some/directory2
      toDirectory: /to/some/directory2

  # List of directories in which file deletes via the REST API can be done.
  fileDeleteApprovedDirectories:                      
    - /Users/goran/butler-test-dir1
    - /Users/goran/butler-test-dir1//abc//..
    - /Users/goran/butler-test-dir2
  
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
    # engineVersion: 12.170.2        # Qlik Associative Engine version to use with Enigma.js. Ver 12.170.2 works with Feb 2019
    engineVersion: 12.612.0         # Qlik Associative Engine version to use with Enigma.js. Works with Feb 2020 and others
    host: <FQDN or IP of Sense server where Sense Engine is running>
    port: <Port to connect to, usually 4747>
    useSSL: true
    headers:
      X-Qlik-User: UserDirectory=Internal;UserId=sa_repository
    rejectUnauthorized: false       # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
                                    # Set to true if the Qlik Sense root CA is available on the computer where Butler SOS is running.

  configQRS:
    authentication: certificates
    host: <FQDN or IP of Sense server where QRS is running>
    useSSL: true
    port: 4242
    headerKey: X-Qlik-User                                      # Header used to identify what user connection to QRS is made as
    headerValue: UserDirectory=Internal; UserId=sa_repository   # What user connection to QRS is made as
    rejectUnauthorized: false       # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
                                    # Set to true if the Qlik Sense root CA is available on the computer where Butler SOS is running.

  configDirectories:
    # enableirectoryCreation: false
    qvdPath: <Path to folder under which QVDs are stored>
```

### Comments

* Note that you can enable/disable most features independently of each other. This makes it easy to have Butler do exactly what's needed - no more - no less.

* The default location cert/key files are found in (assuming a standard install of Qlik Sense) `C:\ProgramData\Qlik\Sense\Repository\Exported Certificates\<name specified during certificate export>`

  The files needed by Butler are `client.pem`, `client_key.pem` and `root.pem`.
