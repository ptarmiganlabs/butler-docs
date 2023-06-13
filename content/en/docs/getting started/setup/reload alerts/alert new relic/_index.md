---
title: "Reload alerts via New Relic"
linkTitle: "New Relic"
weight: 14
description: >
  Description of how reload alerts can be sent to New Relic as events and log messages.
---


## What's this?

Butler can send two kinds of messages to New Relic:

- When a scheduled or started from the QMC reload task fails.
- When a scheduled or started from the QMC reload task is somehow stopped/aborted.

See the [Concepts section](/docs/concepts/incident-mgmt-tools/new-relic/) for examples on what a New Relic alert can look like.

[This page](/docs/getting-started/setup/incident-mgmt-tools/new-relic/) has additional info on how to set up Butler to work with New Relic.

A complete reference to the config file format is found [here](/docs/reference/config-file/).

## Different kinds of New Relic messages

Two kinds of messages can be sent to New Relic: Events and log messages.

The difference between them is that New Relic events are meant to be used for alerting, while New Relic log messages are meant to be used for troubleshooting.

Events are more flexible in terms of what data can be included in them, whereas log messages are just that - parts of Sense log files sent to New Relic.

Together they provide a powerful combination of alerting and troubleshooting capabilities, but they can also be enabled independently of each other.

## Destination accounts

New Relic does not have very good access control capabilities for their dashboards, so if you want certain people to see only some reload alerts, and other people to see other alerts, you need to create multiple New Relic accounts.

Butler supports this scenario and can send messages to one or more New Relic accounts.  
It is possible to specify per reload task which New Relic account(s) to send alerts to.

Three pieces of information is needed for each New Relic account that Butler should send messages to:

- The name of the New Relic account. This is just a name that you choose, it is not used for anything other than to identify the account in Butler's config file and in the custom properties of Qlik Sense reload tasks.
- The New Relic account ID.
- The New Relic insert/API key. This is basically a secret key that is used to authenticate Butler with New Relic.

Account numbers and insert keys are available in the New Relic UI, under "Account settings" > "Data sharing".

### Authentication and credentials

Butler looks for New Relic account names, account ID and API keys in two places:

1. The command line, using the `--new-relic-account-name`, `--new-relic-account-id` and `--new-relic-api-key` options.
   1. If you have multiple New Relic accounts they should be listed in sequence, separated by space.
   2. Account names can include spaces, but should then be enclosed in double quotes.
   3. Example: `--new-relic-account-name "First New Relic account" "Second New Relic account" --new-relic-api-key 1234567890abcdef 0987654321fedcba --new-relic-account-id 1234567 7654321`
2. The config file, in the `Butler.thirdPartyToolsCredentials.newRelic` section.

## Standard attributes

When sending messages to New Relic you can include "attributes".

Attributes are key/value pairs that can be used to provide additional information about the message.  
They can be added to both events and log messages.

Attributes can be used in New Relic dashboards to filter and group messages in various ways.

## Static vs dynamic attributes

Butler offers two kinds of attributes: Static and dynamic.

Static attributes are defined in the config file and are the same for all messages sent to New Relic.  
An example of a static attribute could be the name of the Qlik Sense server that Butler is running on, or whether the message related to a production or test Qlik Sense environment.

Dynamic attributes are determined at run-time when the message is sent to New Relic.

Examples include:

- Sense tags that are assigned to the reload task that failed. Their names are `qs_appTag_<tag name>`
- App tags of the app that failed to reload. Their names are `qs_taskTag_<tag name>`

## Shared settings

Some settings are shared between events and log messages, these are found in the `sharedSettings` sections of the config file.
Values there will be used for both events and log messages, unless they are overridden in the respective events or logMessages sections of the config file.

## Settings in config file

```yaml
---
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
