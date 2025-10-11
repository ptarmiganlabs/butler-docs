---
title: "Reload alerts for Qlik Sense Cloud"
linkTitle: "Cloud"
weight: 200
description: >
  Butler offers a lot of flexibility when it comes to alerts when reloads fail in Qlik Sense Cloud.


  Learn how to set up the desired features, the alert layout, formatting and more.
---

::: warning
In general the information related to an app that failed reloading will not be very sensitive.  
It's app name, owner id, tenant id etc.

If this information is considered sensitive in your organization, you should consider the security implications of sending this information to service like Butler via the public Internet. The traffic will be https encrypted, but even so, the information will be sent over the public Internet.

As always, make sure to follow your organization's security guidelines. Think before you act.
:::

## Alert types

These alert types are available:

- Reload task failure. Send alerts when app reloads fail.

## Alert destinations and options

Alerts can be sent to these destinations, with different options available for each destination.  
Each destination can be individually enabled/disabled in the config file.

| Destination | App reload failure | Enable/disable alert per app | Alerts to app owners | Flexible formatting | Basic formatting | Comment |
| ----------- | :----------------: | :--------------------------: | :------------------: | :-----------------: | :--------------: | :-----: |
| Email       |         ✅         |              ✅              |          ✅          |         ✅          |                  |         |
| Slack       |         ✅         |              ✅              |                      |         ✅          |        ✅        |         |
| MS Teams    |         ✅         |              ✅              |                      |         ✅          |        ✅        |         |

## How it works

Somehow Butler needs to be notified when a reload task in Qlik Sense Cloud fails.

The only way to do this is currently (2024 October) to use Qlik Cloud's outgoing webhooks, and have them triggered when the app reload fails.

So, the outbound webhook should call some URL it can reach.  
In practice this means a URL on the public Internet.

This could be a Butler provided endpoint, but exposing Butler to the public Internet is not a good idea from a security perspective.

There are various ways to solve this, each described below.  
More options for bringing Qlik Cloud events to Butler may be added in the future.

### Option 1: Azure function forwarding event to MQTT

While this solution may be seen as a bit complex, it does offer some advantages:

- No need to expose Butler to the public Internet.
- The http-to-MQTT gateway is a minimal service that can be run as a serverless function in your cloud provider of choice, or on-premise in a de-militarized zone (DMZ). The point is that it's a very small and simple service that both is easier to deploy and to secure, compared to a full Butler instance.
- Not having complex services like Butler exposed to the public Internet is a good security practice.
- The http-to-MQTT gateway can be used for other purposes too, such as sending MQTT messages to Butler when other events occur in your Qlik Cloud environment.
- The http-to-MQTT gateway can be used to send MQTT messages to other systems too, not just Butler.
- By exposing several https endpoints, The http-to-MQTT gateway can be used to send MQTT messages to Butler when events occur in other systems, not just Qlik Cloud.
- By using a serverless function in a cloud provider, the solution scales well and can benefit from the cloud provider's security features.
- Low cost. The solution can even be run on a free tier in most cloud providers, and MQTT services are usually very cheap for the message volume in this scenario (one message per failed app reload).
- Fast. Events typically reach Butler within a few seconds after they occur in Qlik Cloud.

Downsides include:

- The solution is a bit complex to set up.
- The solution requires the http-to-MQTT gateway to be up and running at all times.
- A Internet connected MQTT broker is needed. There are several cloud based MQTT brokers available though.

The solution looks like this:

![Sending app reload failure alerts from Qlik Cloud to Butler via an Azure function and MQTT](/img/butler-cloud-app-reload-failed-alert-1.png "Sending app reload failure alerts from Qlik Cloud to Butler via an Azure function and MQTT")

The webhook in Qlik Cloud is set up to call an Azure function when an app reload completes. The Azure function then sends an MQTT message to Butler.

The webhook is defined like this:

![Qlik Cloud webhook definition](/img/butler-cloud-appr-reload-webhook-1.png "Qlik Cloud webhook definition")

The webhook secret can be used in the gateway to verify that the webhook call is coming from an approved Qlik Cloud tenant.

### Future options

Various solutions are possible, including:

- Qlik Cloud supporting other notification mechanisms, such as sending MQTT messages when app reloads fail.
- Qlik Cloud Application Automations supporting MQTT. The failed app reload could then be captured via an automation, and there forwarded to Butler via MQTT.
- Using a 3rd party service that runs a webhook-to-MQTT gateway in the cloud.

If the basic assumption is that you want to expose as little attack surface on the Internet as possible, the solution will most likely involve some kind of intermediate service that can be reached by Qlik Cloud, and that can in turn asynchronously forward the event to Butler.

## Setting up the http-to-MQTT gateway

An Azure Function App is used in this example, but the same concept can be used with other cloud providers, or on-premise.  
In the example below the Azure function is written in Node.js.

Note that the code below is a basic example that should be extended before being used in a production environment:

- Add proper error handling and logging
- Add better security, using the Qlik Cloud webhook secret to verify that the incoming request is coming from an approved Qlik Cloud tenant.
- The function does verify that the incoming request has a http header named `x-myheader-foo1`, but it does not check the value of that header. Room for improvement there.

All in all the function does work, it has been in test use for some months and should serve well as a starting point for your own implementation.

```javascript
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { connectAsync } from "mqtt";

export async function qscloudreload(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  context.log(`Request method: ${request.method}`);

  // Get query string parameters
  const query = Object.fromEntries(request.query.entries());
  context.log(`Request query:\n${JSON.stringify(query, null, 2)}`);

  // Ensure there are no query string parameters
  if (Object.keys(query).length > 0) {
    context.log("Too many query string parameters. Expected none.");
    return {
      status: 400,
      body: "Invalid query string parameters",
    };
  }

  // -----------------------------------------------------
  // Get headers
  const headers = Object.fromEntries(request.headers.entries());
  context.log(`Request headers:\n${JSON.stringify(headers, null, 2)}`);

  // Ensure the correct headers are present
  // The following headers are required:
  // - accept-encoding: gzip
  // - client-ip: <The IP address of the client making the request>
  // - content-length: <The length of the request body>
  // - content-type: application/json
  // - host: <The host name of the function app>
  // -  qlik-signature: <The Qlik Sense Cloud signature of the request>
  // - user-agent: Qlik Webhook
  // - x-forwarded-proto: https
  // - x-forwarded-tlsversion: 1.3
  //
  // Custom https headers (must also be present):
  // - x-myheader-foo1: bar1

  const requiredHeaders = [
    "accept-encoding",
    "client-ip",
    "content-length",
    "content-type",
    "host",
    "qlik-signature",
    "user-agent",
    "x-forwarded-proto",
    "x-forwarded-tlsversion",
    "x-myheader-foo1",
  ];

  for (const header of requiredHeaders) {
    if (!headers[header]) {
      context.log(`Missing required header: ${header}`);
      return {
        status: 400,
        body: `Missing required header`,
      };
    }
  }

  // Make sure select headers contain correct values
  // - accept-encoding: gzip
  // - content-type: application/json
  // - user-agent: Qlik Webhook
  // - x-forwarded-proto: https
  // - x-forwarded-tlsversion: 1.2 | 1.3
  if (headers["accept-encoding"] !== "gzip") {
    context.log(
      `Invalid header value for accept-encoding: ${headers["accept-encoding"]}`
    );
    return {
      status: 400,
      body: `Invalid header value for accept-encoding`,
    };
  }

  if (headers["content-type"] !== "application/json") {
    context.log(
      `Invalid header value for content-type: ${headers["content-type"]}`
    );
    return {
      status: 400,
      body: `Invalid header value for content-type`,
    };
  }

  if (headers["user-agent"] !== "Qlik Webhook") {
    context.log(
      `Invalid header value for user-agent: ${headers["user-agent"]}`
    );
    return {
      status: 400,
      body: `Invalid header value for user-agent`,
    };
  }

  if (headers["x-forwarded-proto"] !== "https") {
    context.log(
      `Invalid header value for x-forwarded-proto: ${headers["x-forwarded-proto"]}`
    );
    return {
      status: 400,
      body: `Invalid header value for x-forwarded-proto`,
    };
  }

  if (
    headers["x-forwarded-tlsversion"] !== "1.2" &&
    headers["x-forwarded-tlsversion"] !== "1.3"
  ) {
    context.log(
      `Invalid header value for x-forwarded-tlsversion: ${headers["x-forwarded-tlsversion"]}`
    );
    return {
      status: 400,
      body: `Invalid header value for x-forwarded-tlsversion`,
    };
  }

  // -----------------------------------------------------
  // Get request body
  let body: any = JSON.parse(await request.text());
  let bodyString = JSON.stringify(body, null, 2);
  context.log(`Request body:\n${bodyString}`);

  // Make sure the request body contains the expected properties
  // The following properties are required:
  // - cloudEventsVersion: 0.1
  // - source: com.qlik/engine,
  // - contentType: application/json,
  // - eventId: b0f5c473-5dea-4d7e-a188-5e0b904cde33,
  // - eventTime: 2024-07-27T13:57:27Z,
  // - eventTypeVersion: 1.0.0,
  // - eventType: com.qlik.v1.app.reload.finished,
  // - extensions: <object with the following properties>
  // -   ownerId: <userID of the owner of the Qlik Sense resource that triggered the event>
  // -   tenantId: <tenantID of the Qlik Sense tenant that contains the Qlik Sense resource that triggered the event>
  // -   userId: <userID of the user that triggered the event>
  // data: <object>
  const requiredProperties = [
    "cloudEventsVersion",
    "source",
    "contentType",
    "eventId",
    "eventTime",
    "eventTypeVersion",
    "eventType",
    "extensions",
    "data",
  ];

  for (const property of requiredProperties) {
    if (!body[property]) {
      context.log(`Missing required body property: ${property}`);
      return {
        status: 400,
        body: `Missing required body property`,
      };
    }
  }

  // Make sure the extensions object contains the expected properties
  // The following properties are required:
  // - ownerId: <userID of the owner of the Qlik Sense resource that triggered the event>
  // - tenantId: <tenantID of the Qlik Sense tenant that contains the Qlik Sense resource that triggered the event>
  // - userId: <userID of the user that triggered the event>
  const extensions = body.extensions;
  const extensionsProperties = ["ownerId", "tenantId", "userId"];

  for (const property of extensionsProperties) {
    if (!extensions[property]) {
      context.log(
        `Missing required extensions property in request body: ${property}`
      );
      return {
        status: 400,
        body: `Missing required extensions property`,
      };
    }
  }

  // Make sure select properties contain correct values
  // - cloudEventsVersion: 0.1
  // - contentType: application/json
  if (body.cloudEventsVersion !== "0.1") {
    context.log(
      `Invalid body value for cloudEventsVersion: ${body.cloudEventsVersion}`
    );
    return {
      status: 400,
      body: `Invalid body value for cloudEventsVersion`,
    };
  }

  if (body.contentType !== "application/json") {
    context.log(`Invalid body value for contentType: ${body.contentType}`);
    return {
      status: 400,
      body: `Invalid body value for contentType`,
    };
  }

  // -----------------------------------------------------
  // Forward message to MQTT broker
  const brokerHost = "hostname.of.mqtt.broker";
  const brokerPort = 8765;
  const mqttClient = await connectAsync(`mqtts://${brokerHost}:${brokerPort}`, {
    username: "my-username",
    password: "my-password",
  });
  const topic = `qscloud/app/reload/${body?.extensions?.tenantId}`;
  context.log(`Using MQTT topic: ${topic}`);

  context.log("MQTT client connected");
  mqttClient.publish(topic, bodyString, (err) => {
    if (err) {
      context.log(`Error publishing message: ${err}`);
    }
  });

  context.log("Message published");
  await mqttClient.endAsync();
  context.log("MQTT client disconnected");

  // Return a 200 response
  return {
    status: 200,
    // body: `Body received:\n${bodyString}`
    body: `OK. Message received.`,
  };
}

app.http("qscloudreload", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: qscloudreload,
});
```

## Customizing the alerts

The alerts can be customized in the same ways as for Qlik Sense client-managed. More info at links below.

- [Email alerts](/docs/getting-started/setup/task-alerts/client-managed/alert-emails/)
- [Slack alerts](/docs/getting-started/setup/task-alerts/client-managed/alert-slack/)
- [Teams alerts](/docs/getting-started/setup/task-alerts/client-managed/alert-teams/)

### References

- Creating webhooks in Qlik Cloud: [Qlik Cloud documentation](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-administer-webhook-create.htm)
