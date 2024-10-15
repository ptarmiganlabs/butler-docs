---
title: "Minimal configuration to start Butler"
linkTitle: "Minimal config"
weight: 15
description: >
  The provided sample config file is a good starting point for your own config file.  
 
  It contains the minimum settings needed to start Butler, but a few settings in it must be updated to match your environment.

---


## Starting Butler with a minimal config file

Configuring Butler via its [YAML format](https://www.redhat.com/en/topics/automation/what-is-yaml#) config file is probably the most difficult part of setting up Butler.  
It's however also *the only* way to configure Butler, so it needs to be done.

To make that process easier, a minimal config file called `production_template.yaml` is included in the release Zip files on the [download page](https://github.com/ptarmiganlabs/butler/releases).

{{% notice note %}}
  The included sample config file contains the minimum settings needed to start Butler, but a few settings in it must be updated to match your environment.
  These are described in the comments at the beginning of the config file.
{{% /notice %}}

The settings are mostly related to the host names and ports of the Qlik Sense server(s) you want Butler to connect to, and the host name and port of the machine where Butler is running.  
After working through the instructions in the config file, you should be able to start Butler with the following command (PowerShell in this case):

```powershell
PS C:\tools\butler> .\butler.exe -c .\config\butler-config-file.yaml
```

Most Butler features are disabled in the minimal config file, but it's a good starting point for your own config file.

To summarize, the recommended steps to get Butler up and running are:

1. Download the latest Butler release from the [download page](https://github.com/ptarmiganlabs/butler/releases). Precompiled binaries are available for Windows, Linux, macOS and Docker (on Docker Hub).
2. Copy the `production_template.yaml` config file (which is included in the Zip file) to a new file, e.g. `butler-config.yaml`.
3. Add the needed settings to `butler-config.yaml` as described in the comments at the beginning of that that file.
4. Start Butler, passing in the path to the config file as the `--configfile` (or `-c`) parameter.
5. Once Butler is running in this minimal configuration, you can start enabling more features in the config file, for example failed task monitoring, monitoring of Windows services, Sense licenses and much more.

## Example: Things to change in the minimal config file

The following is an example of the comments at the beginning of the `production_template.yaml` config file, describing what needs to be changed in it to start Butler with a minimal configuration.

The example below is for Butler [12.4.0](https://github.com/ptarmiganlabs/butler/releases), but the same principle applies to later versions too.

```yaml
---
Butler:
  # General notes: 
  # - File and directory paths in this sample config file use Linux/Mac syntax, i.e. using forward slashes.
  #   Windows paths work just as well, just make sure to quote them with single or double quotes.
  # - All entries in the config file are mandatory in the sense that they must be present.
  #   However, if a feature is not used the corresponding config entries can contain 
  #   any value (for example the provided default ones).
  # - Butler will start using the settings in this file if the follwing settings are set first:
  #   - Butler.cert.clientCert: Set to the path of the client certificate file. If relative paths cause issues, use an absolute path.
  #   - Butler.cert.clientCertKey: Set to the path of the client key file. If relative paths cause issues, use an absolute path.
  #   - Butler.cert.clientCertCA: Set to the path of the CA certificate file. If relative paths cause issues, use an absolute path.
  #   - Butler.configEngine.host: Set to the IP or FQDN of the host where the Sense engine service is running.
  #   - Butler.configEngine.port: Set to the port where the Sense engine service is listening.
  #   - Butler.configQRS.host: Set to the IP or FQDN of the host where the Qlik Repository Service (QRS) is running.
  #   - Butler.configQRS.port: Set to the port where the Qlik Repository Service (QRS) is listening.
  # - Having set the above settings, Butler will start and run, but it will not do anything useful until you configure
  #   the various monitoring and notification settings, as described at https://butler.ptarmiganlabs.com.
...
...
```
