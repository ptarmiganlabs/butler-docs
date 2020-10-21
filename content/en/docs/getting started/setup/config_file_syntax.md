---
title: "Config file syntax"
linkTitle: "Config file syntax"
weight: 3
description: >
  Description of Butler's config file.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Config file syntax

The `default_template.yaml` config file looks like this:

```yml
---
Butler:
  # Logging configuration
  logLevel: info          # Log level. Possible log levels are silly, debug, verbose, info, warn, error
  fileLogging: false       # true/false to enable/disable logging to disk file
  logDirectory: log      # Subdirectory where log files are stored (no trailing / )

  slackConfig:
    enable: true
    webhookURL: <fill in your web hook URL from Slack>
    loginNotificationChannel: sense-user-activity
    taskFailureChannel: sense-task-failure

  mqttConfig:
    enable: false
    brokerHost: <FQDN or IP of MQTT server>
    brokerPort: 1883
    taskFailureTopic: qliksense/task_failure
    taskFailureServerStatusTopic: qliksense/butler/task_failure_server
    sessionStartTopic: qliksense/session/start
    sessionStopTopic: qliksense/session/stop
    connectionOpenTopic: qliksense/connection/open
    connectionCloseTopic: qliksense/connection/close
    sessionServerStatusTopic: qliksense/butler/session_server
    activeUserCountTopic: qliksense/users/active/count
    activeUsersTopic: qliksense/users/active/usernames

  udpServerConfig:
    enable: false
    serverIP: <FQDN or IP (or localhost) of server where Butler is running>
    portSessionConnectionEvents: 9997
    portTaskFailure: 9998

  restServerConfig:
    enable: false
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    serverPort: 8080

  # Enable/disable individual REST API endpoints. Set config item below to true to enable that endpoint.
  restServerEndpointsEnable:
    activeUserCount: true
    activeUsers: true
    slackPostMessage: true 
    createDir: true
    createDirQVD: true
    mqttPublishMessage: true
    senseStartTask: true
    senseAppDump: true
    senseListApps: true
    butlerping: true
    base62ToBase16: true
    base16ToBase62: true

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
    engineVersion: 12.170.2        # Qlik Associative Engine version to use with Enigma.js. Ver 12.170.2 works with Feb 2019
    host: <FQDN or IP of Sense server where Sense Engine is running>
    port: <Port to connect to, usually 4747>
    useSSL: true
    headers:
      X-Qlik-User: UserDirectory=Internal;UserId=sa_repository
    rejectUnauthorized: false

  configQRS:
    authentication: certificates
    host: <FQDN or IP of Sense server where QRS is running>
    useSSL: true
    port: 4242
    headerKey: X-Qlik-User
    headerValue: UserDirectory=Internal; UserId=sa_repository

  configDirectories:
    # enableDirectoryCreation: false
    qvdPath: <Path to folder under which QVDs are stored>

  gitHub:
    host: api.github.com
    pathPrefix: ''
```


### Comments:

* Note that you can enable/disable the REST API, MQTT, UDP server and Slack independently. This makes it easy to have Butler do exactly what's needed - no more - no less.

* The default location cert/key files are found in (assuming a standard install of Qlik Sense) `C:\ProgramData\Qlik\Sense\Repository\Exported Certificates\<name specified during certificate export>`

The files needed by Butler are `client.pem`, `client_key.pem` and `root.pem`.
