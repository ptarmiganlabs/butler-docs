---
title: "Webhooks"
linkTitle: "Webhooks"
weight: 100
description: >
  Webhooks provide a generic way to send information about failed/aborted reloads to any system that can receive HTTP POST/PUT/GET requests.<br>
---

## When nothing else works

Webhooks may be somewhat limited in terms of what they can do, but their simplicity is also their strength.  

When you need to send information about failed/aborted reloads to a system that doesn't have a dedicated integration with Butler, webhooks may be a good solution.

Butler offers a lot of flexibility in terms of how each webhook is configured.  
You can...

- specify the URL to send the webhook to.
- specify the HTTP method to use (POST, PUT, GET).
- use htto or https.
- specify if a custom certificate should be used.
  In this case the root CA certificate is provided to Butler per webhook, which means Butler can be integrated to many systems, each using their own self-signed certificate.
- specify if an untrusted certificate should be accepted.
  This is useful when integrating with systems that use self-signed certificates and you don't have access to the root CA certificate.

Sending reload-failed informnation to a GET http webhook provided by Node-RED can look like this in the Node-RED editor:

![Webhook in Node-RED](/img/webhook-node-red-1.png 'Webhook in Node-RED')




## Configuration

Configuration of this feature is described [here](/docs/getting-started/setup/reload-alerts/alert-webhook-out/).
