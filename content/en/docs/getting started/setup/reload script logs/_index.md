---
title: 'Reload script logs'
linkTitle: 'Reload script logs'
weight: 105
description: >
    Butler can detect, capture and store all script logs of reload tasks that failed.  

    This makes it much easier to find and analyse the script logs of faile reloads.
---

{{% alert title="Optional" color="primary" %}}
Storing the logs of failed reloads is an optional Butler feature.

If reload lgos are not of interest, the default values in the config file can be left as they are.  
Do note though that Butler expects the configuration properties below to exist in the config file, but will _ignore their values_ if the related features are disabled.
{{% /alert %}}

## What's this?

The idea is to save the full script logs of failed app reloads.  
Having access to the full logs can sometimes be what's needed to understand what caused the failure.

* The logs are store in separate directories for each date.
* The file name of the script log consists of timestamp of the reload failure, app ID and task ID.

Using a standalone Butler executable on Windows Server it can look like this:

```bash
.
├── butler.exe
├── log
│   └── butler.2022-04-07.log
├── production.yaml
└── scriptlog
    ├── 2022-04-06
    │   ├── 2022-04-06_15-36-12_appId=deba4bcf-47e4-472e-97b2-4fe8d6498e11_taskId=0d815a99-1ca3-4131-a398-6878bd735fd8.log
    │   └── 2022-04-06_22-42-35_appId=66bc109d-286a-415b-8355-1422abb22133_taskId=e959f40a-67be-4a5b-ae83-a292f96ba078.log
    └── 2022-04-07
        └── 2022-04-07_05-49-16_appId=deba4bcf-47e4-472e-97b2-4fe8d6498e11_taskId=0d815a99-1ca3-4131-a398-6878bd735fd8.log
```

## How it works

This feature relies on the same Qlik Sense log appenders that the [reload alerts](/docs/getting-started/setup/reload-alerts/) uses. Please see that page for an in-depth discussion on how log appenders work and how to set them up.

![Butler high level system overview](/img/butler-failed-reload-log-1.png 'Butler high level system overview')

{{< notice warning >}}
The log appenders that catch failed reloads in the Qlik Sense scheduler must be set up on all Qlik Sense servers where reloads are happening for this feature to work.
{{< /notice >}}

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Store script logs of failed reloads on disk.
  # The script logs will be stored in daily directories under the specified main directory below
  scriptLog:
    storeOnDisk:
      reloadTaskFailure:
        enable: false
        logDirectory: /path/to/scriptlogs
  ...
  ...
```
