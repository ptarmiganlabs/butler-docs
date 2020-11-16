---
title: "Connecting to a Qlik Sense server"
linkTitle: "Sense server settings"
weight: 20
description: >
  Details on how to configure the connection from Butler to Qlik Sense Enterprise on Windows.
---

{{% alert title="Mandatory" color="warning" %}}
These settings are mandatory.  
They must exist in the config file and be correctly set for Butler to work.
{{% /alert %}}

## What's this?

In order to interact with a Qlik Sense Enterprise on Windows (QSEoW) environment, Butler needs to know a few things about that environment. This is true no matter if the Sense cluster consists of a single Sense server or many.

## Settings in main config file

```yaml
---
Butler:
  ...
  ...
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
  ...
  ...
```
