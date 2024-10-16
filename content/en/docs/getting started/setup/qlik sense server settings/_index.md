---
title: "Connecting to a Qlik Sense server"
linkTitle: "Sense server settings"
weight: 20
description: >
  Details on how to configure the connection from Butler to Qlik Sense Enterprise on Windows.
---

## What's this?

In order to interact with a Qlik Sense Enterprise on Windows (QSEoW) environment, Butler needs to know a few things about that environment. This is true no matter if the Sense cluster consists of a single Sense server or many.

## Settings in config file

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
    # engineVersion: 12.170.2        # Qlik Associative Engine version to use with Enigma.js. Ver 12.170.2 works with Feb 2019
    engineVersion: 12.612.0         # Qlik Associative Engine version to use with Enigma.js. Works with Feb 2020 and others
    host: <FQDN or IP of Sense server where Sense Engine is running>
    port: <Port to connect to, usually 4747>
    useSSL: true
    headers:
      static:                                                   # http headers that are sent with every request to QRS. The "X-Qlik-User" is mandatory.
        - name: X-Qlik-User                                     # Header used to identify what user connection to QRS is made as
          value: UserDirectory=Internal;UserId=sa_repository    # What user connection to QRS is made as    
    rejectUnauthorized: false

  configQRS:
    authentication: certificates
    host: <FQDN or IP of Sense server where QRS is running>
    useSSL: true
    port: 4242
    headers:
      static:                                                   # http headers that are sent with every request to QRS. The "X-Qlik-User" is mandatory.
        - name: X-Qlik-User                                     # Header used to identify what user connection to QRS is made as
          value: UserDirectory=Internal;UserId=sa_repository    # What user connection to QRS is made as    
    rejectUnauthorized: false       # Set to false to ignore warnings/errors caused by Qlik Sense's self-signed certificates.
                                    # Set to true if the Qlik Sense root CA is available on the computer where Butler SOS is running.
  ...
  ...
```
