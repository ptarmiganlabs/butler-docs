# Config File Syntax

Description of Butler's config file.

## Main Butler config file

The `production_template.yaml` config file looks like this (sorry for the incorrect syntax coloring, the issue is noted and is being worked on):

::: info
Starting with Butler version 9.0 there is a check that the config file has the correct format.

This means that if you forget to add or change some setting in the main YAML config file, Butler will tell you what's missing and refuse to start.  
A consequence of this is that all settings are now mandatory, even if you don't use them.
:::

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
```

### Comments

- Note that you can enable/disable most features independently of each other. This means Butler can be configured to do exactly what you need, and nothing more.

- The default location cert/key files are found in (assuming a standard install of Qlik Sense) `C:\ProgramData\Qlik\Sense\Repository\Exported Certificates\<name specified during certificate export>`

  The files needed by Butler are `client.pem`, `client_key.pem` and `root.pem`.
