---
title: "New Relic"
linkTitle: "New Relic"
weight: 10
description: >
  New Relic is an enterprise grade observability solution in a SaaS package.
  `<br>``<br>`They offer a uniform approach to dealing with metrics, logs and events - including a basic but working alert management feature. 
  `<br>`If more advanced alert management is needed New Relic offers out-of-the-box integrations with tools like PagerDuty, ServiceNow, Jira, VictorOps and many other services.
  `<br>``<br>`
  The service is easy to get started with and has a generous free tier that works very well for testing Butler alerts.
  `<br>`New Relic is a great choice as it handles both reload failure alerts for the Butler tool as well as both server and Sense specific operational metrics (CPU load, available memory, number of currently connected users etc) from [Butler SOS](https://butler-sos.ptarmiganlabs.com).
  `<br>``<br>`
  More info at [newrelic.com](https://newrelic.com)
---

## What's this?

Butler can forward several kinds of information to New Relic:

- Reload failure/abort events and log entries. Once in New Relic, these can be used to create alerts and incidents.
- Windows service start/stop events and log entries
- Generic New Relic events and metrics via Butler's REST API
- Uptime and performance metrics from Butler itself

Example [here](/docs/concepts/incident-mgmt-tools/new-relic/).

## How it works

New Relic exposes APIs through which data such as log entries as well as generic events and metrics can be sent to New Relic.

These logs, metrics and events are stored in New Relic's databases for a configurable retention period.  
Rules and queries against this data are used to create monitoring dashboards and notifications when reload tasks fail or are aborted.

The retention period of New Relic's free tier is usually more than enough for Butler's use cases, but their paid product versions offers even longer retention periods if/when needed.

To use Butler with New Relic you must

- Create a New Relic account. The free/trial account is quite generous and will easily get you started.
- Create an API key with _insert_ permissions. See New Relic docs how to do this.
- Configure the Butler config file.

More info about the New Relic event API that is used to send alerts can be found in [New Relic's API docs](https://docs.newrelic.com/docs/apis/intro-apis/introduction-new-relic-apis).

## Rate limiting

If a reload task is set to run very frequently but fails every time, this will result in a lot of log entries and events sent to New Relic.  
If New Relic alerts are configured to be sent for each reload failure event, there will be lots of alerts.

To handle this scenario Butler offers rate limiting for events sent to New Relic.

The `Butler.incidentTool.newRelic.reloadTaskFailure.sharedSettings.rateLimit` setting controls how often (seconds) reload-failed events will be sent to New Relic, at most.

A similar setting exists for aborted reloads.

## Data sent to New Relic

### Failed and aborted reloads

Butler can be configured to send neither, either or both of two different data sets to New Relic:

- Failed reloads can be sent to New Relic as _events_.  
  A New Relic event has a basic set of _event attributes_ associated with it. Examples are task name, task ID, app name and app ID. These attributes are always sent to New Relic.
- Failed reloads can also be sent to New Relic as _log entries_.  
  Log entries are more versatile than events and can contain any text in the _log message_. Butler uses the log message to pass along the last x rows (x=configurable number) from the script log to New Relic. Having the script log from the failed reload available in New Relic makes it possible to see where the reload script failed and possible even what caused the failure.

Aborted reloads can be configured in exactly the same way as failed reloads, described above.

#### New Relic events

The following data is sent as New Relic _events_ when a reload task fails or is aborted:

- All http headers defined in the Butler config file.
- All shared, static attributes defined in the Butler config file.
- All event specific, static attributes defined in the Butler config file.
- All tags for the Sense app that was reloaded (can be turned on/off in Butler config file).
- All tags for the Sense reload task that was reloaded (can be turned on/off in Butler config file).
- Butler version the event originated from. This is useful to have in New Relic as it makes it possible to easily show in a dashboard what Butler version is used and whether an update is possible/needed.
- Event related data
  - Event type. Either `qs_reloadTaskFailedEvent` or `qs_reloadTaskAbortedEvent`.
  - Timestamp when the event took place.
  - Host where the reload task was executing.
  - User directory and ID for user which was doing the reload. This will be the Sense service account in most cases.
  - Reload task name.
  - Reload task ID.
  - App name.
  - App ID.
  - Timestamp for this event in Sense log files.
  - Log level for this event in Sense log files.
  - Sense execution ID for this event.
  - Description of the event, as found in the Sense log files.

#### New Relic log entries

If Butler is configured to forward failed/aborted reload tasks to New Relic as log entries, the follow info is sent to New Relic:

- All information sent for events (see above), but with log specific static attributes rather than event specific ditto.
- The various states the reload task went through before failing, including timestamps when each state started.
- The last x lines from the reload script log. x is configurable in the `Butler.incidentTool.newRelic.reloadTaskFailure.destination.log.tailScriptLogLines` setting.
- The host name of the Sense node where the reload took place
- Timestamp (in several different formats) when the reload started
- Timestamp (in several different formats) when the reload failed
- Duration of the reload task
- Result code of the reload task
- Result text of the reload task
- Total size of complete script log (number of characters).
- Number of lines included in the reload script log sent to New Relic

## Monitoring Windows services

Butler can be configured to send Windows service start/stop events to New Relic as New Relic events and/or log entries.

Please see the setup instructions for [Windows service monitoring](/docs/getting-started/setup/windows-service-monitor/new-relic/).

## Sending data to several New Relic accounts

The most common scenario is to send metrics and events to a single New Relic account.  
There are however scenarios when sending data to multiple accounts can be of interest.

### Workaround for lack of dashboard level access control

There is currently no access control on dashboard level in New Relic. This means that a user with read-only access to a New Relic account can access **all** dashboards in that account.

Let's assume

- There are 3 separate Sense environments (DEV, TEST, PROD) that should be monitored for failed reload alerts.
- Different teams are responsible for the different Sense environments.
- Each team should only have access to New Relic dashboards containing data from their Sense environment.
- A central operations team should have dashboards containing data from all three environments.

A solution is then to create separate New Relic accounts for each team, plus one account for the central operations team.  
Deploy separate Butler instances for DEV, TEST and PROD, and configure each to send data to both the central New Relic account and the separate DEV, TEST or PROD accounts.

### Control which New Relic accounts to send data to

The `Butler.thirdPartyToolsCredentials.newRelic` section in the Butler config file defines which New Relic accounts metrics and events can be sent to:

```yaml
Butler:
  ...
  ...
  thirdPartyToolsCredentials:
    newRelic:         # Array of New Relic accounts/insert keys. Any data sent to New Relic will be sent to both accounts.
      - accountName: First NR account
        insertApiKey: <API key 1 (with insert permissions) from New Relic>
        accountId: <New Relic account ID 1>
      - accountName: Second NR account
        insertApiKey: <API key 2 (with insert permissions) from New Relic>
        accountId: <New Relic account ID 2>
  ...
  ...
```

The `accountName` is used to differentiate between the different accounts. It is only used within Butler itself, i.e. it is not used when communicating with New Relic.

`accountName` is then referenced elsewhere in the config file, controlling which New Relic account metrics, events and logs is sent to.  
For example, the destination(s) for Butler uptime metrics is controlled via this section of the config file:

```yaml
Butler:
  ...
  ...
  uptimeMonitor:
    storeNewRelic:
      enable: true
      destinationAccount:
          - First NR account
```

In the example above uptime metrics will only be sent to the New Relic account called "First NR account".

The account information can also be specified via command line options.  
This is useful as it means the New Relic API keys do not have to be stored in the Butler config file. Instead the API keys can be stored in environment variables that are referenced from the command line options.

The configuration used in the YAML config file above can be specified via command line options:

```powershell
PS C:\tools\butler> .\butler.exe -c production.yaml --new-relic-account-name "First NR account" "Second NR account" --new-relic-api-key "API key 1" "API key 2" --new-relic-account-id "account ID 1" "account ID 2"
```

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Incident management tools integration
  # Used to trigger incidents in these tools when task reloads fail or are aborted.
  incidentTool:
    newRelic:
      enable: false
      destinationAccount:
        event:                    # Failed/aborted reload tasks are sent as events to these New Relic accounts
          - First NR account
          - Second NR account
        log:                      # Failed/aborted reload tasks are sent as log entries to these New Relic accounts
          - First NR account
          - Second NR account
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
            sendToAccount:              # Which reload task failures are sent to New Relic as events
              byCustomProperty:
                enable: false            # Control using a task custom property which reload task failures are sent as events
                customPropertyName: 'Butler_FailedTask_Event_NewRelicAccount'
              always:
                enable: false            # Controls which New Relic accounts ALL failed reload tasks are sent to (as events)
                account:
                  - First NR account
                  - Second NR account
            attribute:
              static:                 # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute 1  # Example
                  value: abc 123                    # Example
              dynamic:
                useAppTags: true      # Should app tags be sent to New Relic as attributes?
                useTaskTags: true     # Should task tags be sent to New Relic as attributes?
          log:
            enable: false
            tailScriptLogLines: 20
            sendToAccount:              # Which reload task failures are sent to New Relic as log entries
              byCustomProperty:
                enable: false            # Control using a task custom property which reload task failures are sent as log entries
                customPropertyName: 'Butler_FailedTask_Log_NewRelicAccount'
              always:
                enable: false            # Controls which New Relic accounts ALL failed reload tasks are sent to (as logs)
                account:
                  - First NR account
                  - Second NR account
            attribute:
              static:                 # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute 1    # Example
                  value: def 123                    # Example
              dynamic:
                useAppTags: true      # Should app tags be sent to New Relic as attributes?
                useTaskTags: true     # Should task tags be sent to New Relic as attributes?
        sharedSettings:
          rateLimit: 15             # Min seconds between events sent to New Relic for a given taskID. Defaults to 5 minutes.
          header:                   # Custom http headers
            - name: X-My-Header     # Example
              value: Header value 1 # Example
          attribute:
            static:                 # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service       # Example
                value: butler       # Example
              - name: environment   # Example
                value: prod         # Example
      reloadTaskAborted:
        destination:
          event:
            enable: false
            sendToAccount:              # Which reload task aborts are sent to New Relic as events
              byCustomProperty:
                enable: false            # Control using a task custom property which reload task aborts are sent as events
                customPropertyName: 'Butler_AbortedTask_Event_NewRelicAccount'
              always:
                enable: false            # Controls which New Relic accounts ALL aborted reload tasks are sent to (as events)
                account:
                  - First NR account
                  - Second NR account
            attribute:
              static:                 # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute 2  # Example
                  value: abc 123                    # Example
              dynamic:
                useAppTags: true      # Should app tags be sent to New Relic as attributes?
                useTaskTags: true     # Should task tags be sent to New Relic as attributes?
          log:
            enable: false
            tailScriptLogLines: 20
            sendToAccount:              # Which reload task aborts are sent to New Relic as log entries
              byCustomProperty:
                enable: true            # Control using a task custom property which reload task aborts are sent as log entries
                customPropertyName: 'Butler_AbortedTask_Log_NewRelicAccount'
              always:
                enable: false          # Controls which New Relic accounts ALL aborted reload tasks are sent to (as logs)
                account:
                  - First NR account
                  - Second NR account
            attribute:
              static:                 # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute 2    # Example
                  value: def 123                    # Example
              dynamic:
                useAppTags: true      # Should app tags be sent to New Relic as attributes?
                useTaskTags: true     # Should task tags be sent to New Relic as attributes?
        sharedSettings:
          rateLimit: 15             # Min seconds between events sent to New Relic for a given taskID. Defaults to 5 minutes.
          header:                   # Custom http headers
            - name: X-My-Header     # Example
              value: Header value 2 # Example
          attribute:
            static:                 # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service       # Example
                value: butler       # Example
              - name: environment   # Example
                value: prod         # Example
      serviceMonitor:
        destination:
          event:
            enable: false
            sendToAccount:                # Windows service events are sent to these New Relic accounts
              - First NR account
              - Second NR account
            attribute:
              static:                     # Static attributes/dimensions to attach to events sent to New Relic.
                - name: event-specific-attribute
                  value: abc 123
              dynamic:
                serviceHost: true         # Should host where service is running be sent to New Relic as attribute?
                serviceName: true         # Should service name be sent to New Relic as attribute?
                serviceDisplayName: true  # Should service display name be sent to New Relic as attribute?
                serviceState: true        # Should service state be sent to New Relic as attribute?
          log:
            enable: false
            sendToAccount:                # Windows service log entries are sent to these New Relic accounts
              - First NR account
              - Second NR account
            attribute:
              static:                     # Static attributes/dimensions to attach to events sent to New Relic.
                - name: log-specific-attribute
                  value: def 456
              dynamic:
                serviceHost: true         # Should host where service is running be sent to New Relic as attribute?
                serviceName: true         # Should service name be sent to New Relic as attribute?
                serviceDisplayName: true  # Should service display name be sent to New Relic as attribute?
                serviceState: true        # Should service state be sent to New Relic as attribute?
        monitorServiceState:              # Control whih service states are sent to New Relic
          running:
            enable: true
          stopped:
            enable: true
        sharedSettings:
          rateLimit: 5                    # Min seconds between events/logs sent to New Relic for a given host+service. Defaults to 5 minutes.
          header:                         # Custom http headers
            - name: X-My-Header           # Example
              value: Header value 2       # Example
          attribute:
            static:                       # Static attributes/dimensions to attach to events sent to New Relic.
              - name: service             # Example
                value: butler             # Example
              - name: environment         # Example
                value: prod               # Example
  ...
  ...
```
