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

The `production_template.yaml` config file looks like this:

```yaml
---
Butler:
  # Logging configuration
  logLevel: info          # Log level. Possible log levels are silly, debug, verbose, info, warn, error
  fileLogging: false       # true/false to enable/disable logging to disk file
  logDirectory: log      # Subdirectory where log files are stored (no trailing / )

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

  slackConfig:
    enable: false
    webhookURL: <fill in your web hook URL from Slack>
    loginNotificationChannel: sense-user-activity     # Slack channel to which user activity data is sent
    taskFailureChannel: sense-task-failure            # Slack channel to which task failure notifications are sent

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
    enable: false                                     # Should the UDP server responsible for receving task failure and session events be started?
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    portSessionConnectionEvents: 9997
    portTaskFailure: 9998

  restServerConfig:
    enable: false                                     # Should Butler's REST API be started? Must be true if *any* API endpoints are to be used.
    serverHost: <FQDN or IP (or localhost) of server where Butler is running>
    serverPort: 8080

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
    activeUserCount: false
    activeUsers: false
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
    # enableirectoryCreation: false
    qvdPath: <Path to folder under which QVDs are stored>

  gitHub:
    host: api.github.com
    pathPrefix: ''
  ```

### Comments

* Note that you can enable/disable most features independently of each other. This makes it easy to have Butler do exactly what's needed - no more - no less.

* The default location cert/key files are found in (assuming a standard install of Qlik Sense) `C:\ProgramData\Qlik\Sense\Repository\Exported Certificates\<name specified during certificate export>`

  The files needed by Butler are `client.pem`, `client_key.pem` and `root.pem`.
