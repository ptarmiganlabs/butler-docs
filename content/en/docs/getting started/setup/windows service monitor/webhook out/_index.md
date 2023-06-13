---
title: 'Sending Windows service alerts as outgoing webhooks (=http messages)'
linkTitle: 'Webhook'
weight: 70
description: >
  This page contains information on how to configure Butler to send alerts as outbound http calls, also known as "outbound webhooks".
---

## What's this?

These config settings are specific to the outbound webhook alert destination.  
They are used in addition to the general Windows Service monitoring settings in `Butler.serviceMonitor`.

## How it works

All settings are found in the `Butler.webhookNotification` section of the config file.

Butler can send three kinds of http messages: POST, PUT and GET.  
Some services only support one/some of these, so you need to check the documentation for the service you want to send the message to.

It is possible to define any number of webhook, and each destination can have its own settings such as http method and URL.  
It is for example possible to send POST messages to different URLs if needed.

The rate limit defined in `Butler.webhookNotification.rateLimit` is calculated against each state change of the monitored Windows service.  
There is no check with respect to rate limits how manu URLs are defined (and thus outbound http messages are sent).

## Payload of outbound http calls

The same webhooks/URLs are used for both Windows service start and stop events.  
The defails of the Windows service events is sent in the payload of the http message - exactly how depends on the http method used.

### POST

The payload is sent as JSON in the body of the http message.

Here [Node-RED](https://nodered.org) is used to receive the http message and display it in a debug window:

![POST http call when Windows service has stopped](butler-win-svc-monitor-webhook-post-1.png 'POST http call when Windows service has stopped')

### PUT

The message payload is sent in the body, exactly as for POST messages.

The same fields are used as for POST messages:

![PUT http call when Windows service has stopped](butler-win-svc-monitor-webhook-put-1.png 'PUT http call when Windows service has stopped')

### GET

The message payload is sent as [URL query parameters](https://en.wikipedia.org/wiki/Query_string) rather than in the body.

The fields are the same as for POST and PUT messages, except that the field names are in lower case.

![GET http call when Windows service has stopped](butler-win-svc-monitor-webhook-get-1.png 'GET http call when Windows service has stopped')

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Settings for notifications and messages sent using outgoing webhooks
  webhookNotification:
    enable: false
    serviceMonitor:
      rateLimit: 15               # Min seconds between outgoing webhook calls, per Windows service that is monitored. Defaults to 5 minutes.
      webhooks:
        - description: 'This outgoing webhook is used to...'
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: POST                                    # GET/POST/PUT. Note that the body and URL query parameters differs depending on which method is used
        - description: 'This outgoing webhook is used to...'
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: PUT                                     # GET/POST/PUT. Note that the body and URL query parameters differs depending on which method is used
        - description: 'This outgoing webhook is used to...'
          webhookURL: http://host.my.domain:port/some/path    # outgoing webhook that Butler will call
          httpMethod: GET                                     # GET/POST/PUT. Note that the body and URL query parameters differs depending on which method is used
  ...
  ...
```
