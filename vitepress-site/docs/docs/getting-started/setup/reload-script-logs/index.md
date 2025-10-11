---
title: "Reload script logs"
linkTitle: "Reload script logs"
weight: 105
description: >
  Butler can detect, capture and store all script logs of reload tasks that failed.  

  This makes it much easier to find and analyze the script logs of failed reloads.


  Works with both client-managed Qlik Sense and Qlik Sense Cloud.
---

## What's this?

The idea is to save the full script logs of failed reloads.  
Having access to the full logs can sometimes be what's needed to understand what caused the failure.

- Log files from client-managed Qlik Sense are stored in one directory hierarchy, while logs from Qlik Sense Cloud are stored in another.
- The files are store in separate directories for each date.
- The file name of the script log consists of
  - Client-managed: `<timestamp of the reload failure>_<app ID>_<task ID>.log`
  - Qlik Sense Cloud: `<timestamp of the reload failure>_<app ID>_<reload ID>`

Could look like this:

```bash
.
└── scriptlog
    ├── qscloud
    │   └── 2024-10-14
    │       └── 2024-10-14T11-41-31_appId=86ee4ae7-7ae7-4dd4-98a1-ebea989f78fb_reloadId=670d0369dededd0781e18ade.log
    └── qseow
        └── 2024-10-10
            └── 2024-10-10_15-35-25_appId=8f1d1ecf-97a6-4eb5-8f47-f9156300b854_taskId=22b106a8-e7ed-4466-b700-014f060bef16.log

5 directories, 2 files
```

## How it works

### Client-managed Qlik Sense

This feature relies on the same Qlik Sense log appenders that the [reload alerts](/docs/getting-started/setup/reload-alerts/) uses. Please see that page for an in-depth discussion on how log appenders work and how to set them up.

![Butler high level system overview](/img/butler-failed-reload-log-1.png "Butler high level system overview")

::: warning
The log appenders that catch failed reloads in the Qlik Sense scheduler must be set up on all Qlik Sense servers where reloads are happening for this feature to reliably capture _all_ failed reloads.
:::

### Qlik Sense Cloud

Storing script logs on disk is closely associated with sending alerts about failed reloads.

Those alerts (email, Slack, Teams) can include the first and last few lines of the script log, whereas the full log is stored on disk using the feature described on this page.

![Butler and Qlik Sense Cloud overview](/img/butler-cloud-app-reload-failed-alert-1.png "Butler and Qlik Sense Cloud overview")

Butler listens to the Qlik Sense Cloud event stream and captures the script logs of failed reloads.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Store script logs of failed reloads on disk.
  # The script logs will be stored in daily directories under the specified main directory below
  # NOTE: Use an absolute path when running Butler as a standalone executable!
  scriptLog:
    storeOnDisk:
      clientManaged:
        reloadTaskFailure:
          enable: false
          logDirectory: /path/to/scriptlogs/qseow
      qsCloud:
        appReloadFailure:
          enable: false
          logDirectory: /path/to/scriptlogs/qscloud
  ...
  ...
```
