---
title: "Using custom links in alerts"
linkTitle: "Custom links in alerts"
weight: 220
description: >
  Email, Slack and MS Teams alert messages can include custom links to external systems.


  This pages describes how to set this up.
---

## What's this?

Butler can include custom links in alert messages sent to email, Slack and MS Teams.  
This can be used to link to external systems, such as a ticketing system or a monitoring tool.

The links defined in the config file are available as template variables in the alert messages.  
Documentation for the alert message templates is available [here](/docs/reference/alert-template-fields/).

## Differences between client-managed and Qlik Sense Cloud

Standardized links relating to client-managed Qlik Sense alerts are set in this section of the config file:

```yaml
Butler:
  ...
  ...
  # Qlik Sense related links used in notification messages
  qlikSenseUrls:
    qmc: <URL to Qlik Sense QMC>
    hub: <URL to Qlik Sense Hub>
    appBaseUrl: <URL to Qlik Sense hub>/<virtual proxy, if any>/sense/app   # Base URL for Qlik Sense apps, for example http://sense.mycompany.net/sense/app. App ID will be appended to this URL.
```

Qlik Sense Cloud has slightly different names for things, but the general principle is the same.  
Cloud related links are set in this section of the config file:

```yaml
  qlikSenseCloud:                   # Settings for Qlik Sense Cloud integration
    enable: false
    event:
      mqtt:                         # Which QS Cloud tenant should Butler receive events from, in the form of MQTT messages?
        tenant:
          ...
          tenantUrl: https://tenant.region.qlikcloud.com
          ...
          # Qlik Sense Cloud related links used in notification messages
          qlikSenseUrls:
            qmc: <URL to QMC in Qlik Sense Cloud>
            hub: <URL to Hub in Qlik Sense Cloud>
```

{{< notice note >}}
There is no `appBaseUrl` setting for Qlik Sense Cloud.  
That URL is instead constructed on the fly by Butler based on tenantUrl and app ID.
{{< /notice >}}

## Settings in the config file

```yaml
Butler:
  ...
  ...
  # Qlik Sense (client-managed) related links used in notification messages
  qlikSenseUrls:
    qmc: <URL to Qlik Sense QMC>
    hub: <URL to Qlik Sense Hub>
    appBaseUrl: <URL to Qlik Sense hub>/<virtual proxy, if any>/sense/app   # Base URL for Qlik Sense apps, for example http://sense.mycompany.net/sense/app. App ID will be appended to this URL.

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
```
