---
title: "Reload alerts via outgoing webhooks"
linkTitle: "Webhook"
weight: 70
description: >
  Description of how reload alerts can be sent via outgoing webhooks.
---


## What's this?

Butler can send two kinds of alert messages as outgoing webhooks:

- When a scheduled, running reload task fails.
- When a scheduled, running reload task is somehow stopped/aborted.

## How it works

Outgoing webhooks is a concept where Butler will do a GET, POST or PUT HTTP call to a specific URL when a task fails or is aborted/stopped.  
The use case is to interface with currently unkown third party systems in a generic way.  
Both http and https calls are supported, including the use of self-signed certificates and untrusted certificates.

As the call will include information about the failed/aborted task, the typical (and arguably most correct) way of doing this would be via a PUT call.

But some systems only handle GET calls - and Butler should still be able to notify them using webhooks.  
The chosen solution is to offer full flexibility for outgoing webhooks and support both GET, PUT and POST calls.  

Webhook notifications can be turned off all together with the `Butler.webhookNotification.enable` property in the config file.  
If that property is `true` both task fail and abort webhooks are enabled.

If you don't need any outgoing webhooks you should keep the `Butler.webhookNotification.reloadTaskFailure.webhooks` and `Butler.webhookNotification.reloadTaskAborted.webhooks` arrays empty.

There are also rate limiting properties that are used to ensure that webhooks are not sent too often.

## Certificates and https

Outgoing webhooks can use http or https.  
If https is used and the server being called uses a publicly trusted certificate, no additional configuration is needed.  
If the server uses a self-signed certificate, the corresponding root CA certificate must be provided to Butler in order to avoid certificate validation errors.

Each webhook has its own certificate configuration, so Butler can be integrated with many systems, each using their own publicly verified or self-signed certificates - or just plain http without any certificates at all.

The certificate configuration is done in the Butler config file and looks like this for each webhook:

```yaml
...
cert:
  enable: true                    # Set to true to use a custom CA certificate when calling the webhookURL
  rejectUnauthorized: true        # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
  certCA: /path/to/ca-certificate.pem       # Path to the CA certificate file
...
```

If `...cert.enable` is set to `true` Butler will use the certificate specified in `...cert.certCA` when calling the webhook.

If `...cert.rejectUnauthorized` is set to `false` Butler will ignore warnings/errors caused by self-signed certificates being used on the webhook server.

## Data included in outgoing webhooks

This information is included in all outgoing webhook calls:

| Field  | Description |
|---|---|
| event | Type of event, for example `Qlik Sense reload failed`. |
| hostName | Name of server where the event took place. |
| user | User directory/userId of user causing the event. For task failures this will be the user account used to do the reload. For aborts it will be the user stopping/aborting the task. |
| taskName | Task name |
| taskId | Task ID |
| appName | App name |
| appId | App ID |
| logTimeStamp | Timestamp entry in the Qlik Sense log files when the event took place. |
| logLevel | Log level used in the Qlik Sense log file in which the event was detected by the log appender. |
| executionId | Execution ID of the failed/aborted task. |
| logMessage | Message in Qlik Sense log file that triggered the event. |

### GET call

When doing GET calls all the data fields will be passed as search parameters in the URL.

For example, a failed task GET call to a remote URL could look like this:

`http://someremote.system.com/butler_get?event=Qlik+Sense+reload+failed&hostName=pro2-win1&user=LAB%5Cgoran&taskName=Manually+triggered+reload+of+Test+failing+reloads+2&taskId=dec2a02a-1680-44ef-8dc2-e2bfb180af87&appName=Test+failing+reloads+2&appId=e7af59a0-c243-480d-9571-08727551a66f&logTimeStamp=2021-02-16+09%3A24%3A59%2C099&logLevel=INFO&executionId=14a81bf5-f81c-4047-b1a1-193b0920de28&logMessage=Max+retries+reached`

The received/remote system can then unpack the URL parameters and use them as needed.

### PUT and POST calls

PUT and POST calls work the same when it comes to Butler's outgoing webhooks: 

1. A stringified JSON is created based on the event's data fields.
2. The string is sent in the POST/PUT call's body.

The same event as above looks like this:

```json
{"event":"Qlik Sense reload failed","hostName":"pro2-win1","user":"LAB\\goran","taskName":"Manually triggered reload of Test failing reloads 2","taskId":"dec2a02a-1680-44ef-8dc2-e2bfb180af87","appName":"Test failing reloads 2","appId":"e7af59a0-c243-480d-9571-08727551a66f","logTimeStamp":"2021-02-16 09:24:59,099","logLevel":"INFO","executionId":"14a81bf5-f81c-4047-b1a1-193b0920de28","logMessage":"Max retries reached"}
```

## Settings in  config file

```yaml
---
Butler:
  ...
  ...
  # Settings for notifications and messages sent using outgoing webhooks
  webhookNotification:
    enable: false
    reloadTaskFailure:
      rateLimit: 300              # Min seconds between outgoing webhook calls for a given taskID. Defaults to 5 minutes.
      webhooks:
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # Outgoing webhook that Butler will call
          httpMethod: POST                                    # GET/POST/PUT
          cert:
            enable: false                                     # Set to true to use a custom CA certificate when calling the webhookURL
            rejectUnauthorized: true                          # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
            certCA: /path/to/ca-certificate.pem               # Path to the CA certificate file
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # Outgoing webhook that Butler will call
          httpMethod: PUT                                     # GET/POST/PUT
          cert:
            enable: false                                     # Set to true to use a custom CA certificate when calling the webhookURL
            rejectUnauthorized: true                          # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
            certCA: /path/to/ca-certificate.pem               # Path to the CA certificate file
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # Outgoing webhook that Butler will call
          httpMethod: GET                                     # GET/POST/PUT
          cert:
            enable: false                                     # Set to true to use a custom CA certificate when calling the webhookURL
            rejectUnauthorized: true                          # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
            certCA: /path/to/ca-certificate.pem               # Path to the CA certificate file
    reloadTaskAborted:
      rateLimit: 300              # Min seconds between outgoing webhook calls for a given taskID. Defaults to 5 minutes.
      webhooks:
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # Outgoing webhook that Butler will call
          httpMethod: PUT                                     # GET/POST/PUT
          cert:
            enable: false                                     # Set to true to use a custom CA certificate when calling the webhookURL
            rejectUnauthorized: true                          # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
            certCA: /path/to/ca-certificate.pem               # Path to the CA certificate file
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # Outgoing webhook that Butler will call
          httpMethod: POST                                    # GET/POST/PUT
          cert:
            enable: false                                     # Set to true to use a custom CA certificate when calling the webhookURL
            rejectUnauthorized: true                          # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
            certCA: /path/to/ca-certificate.pem               # Path to the CA certificate file
        - description: 'This outgoing webhook is used to...'  # Informational only
          webhookURL: http://host.my.domain:port/some/path    # Outgoing webhook that Butler will call
          httpMethod: GET                                     # GET/POST/PUT
          cert:
            enable: false                                     # Set to true to use a custom CA certificate when calling the webhookURL
            rejectUnauthorized: true                          # Set to false to ignore warnings/errors caused by self-signed certificates used on the webhooks server.
            certCA: /path/to/ca-certificate.pem               # Path to the CA certificate file
  ...
  ...
```
