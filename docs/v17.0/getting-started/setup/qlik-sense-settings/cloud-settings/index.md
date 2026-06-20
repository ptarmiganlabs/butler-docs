---
title: "Connecting to Qlik Cloud"
linkTitle: "Qlik Cloud settings"
weight: 25
description: >
  Details on how to configure the connection from Butler to Qlik Sense Cloud.
---

## What's this?

In order to interact with a Qlik Sense Cloud environment, Butler needs to know a few things about that environment.

## How Butler gets events from Qlik Sense Cloud

A few things to note about how Butler gets events from Qlik Sense Cloud:

- When an app reload fails in Qlik Sense Cloud, an outgoing webhook is triggered.
- This webhook calls a https endpoint somewhere on the Internet, for example a serverless function in Azure or AWS (or on-prem).
- The function forwards the event as an MQTT message to a MQTT broker, on a well-defined topic.
- Butler listens to this topic and reacts to the event.

This model may seem a bit complex, but it has a few advantages:

- It is scalable. The serverless function can be scaled up and down as needed. MQTT brokers also scale well.
- It is flexible. The serverless function can be written in any language, and can be hosted anywhere.
- It is secure. The serverless function can be locked down to only accept incoming webhooks from Qlik Sense Cloud. The option would be to expose Butler directly to the Internet, which is not recommended.

The effect is an asynchronous, scalable and secure way of getting events from Qlik Sense Cloud to Butler.

## Settings in config file

```yaml
Butler:
  ...
  ...
  qlikSenseCloud:                   # Settings for Qlik Sense Cloud integration
    enable: false
    event:
      mqtt:                         # Which QS Cloud tenant should Butler receive events from, in the form of MQTT messages?
        tenant:
          id: tenant.region.qlikcloud.com
          tenantUrl: https://tenant.region.qlikcloud.com
          authType: jwt             # Authentication type used to connect to the tenant. Valid options are "jwt"  
          auth:
            jwt:
              token: <JWT token>    # JWT token used to authenticate Butler when connecting to the tenant
          # Qlik Sense Cloud related links used in notification messages
          qlikSenseUrls:
            qmc: <URL to QMC in Qlik Sense Cloud>
            hub: <URL to Hub in Qlik Sense Cloud>
          comment: This is a comment describing the tenant and its settings # Informational only
  ...
  ...
```
