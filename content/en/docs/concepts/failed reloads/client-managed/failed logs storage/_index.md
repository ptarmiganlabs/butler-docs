---
title: "Storing script logs of failed reloads to disk"
linkTitle: "Store failed reload logs"
weight: 50
description: >
  When investigating reload failures it can often be useful to have access to the entire reload log.<br>
  Butler detects failed reloads and can store the entire reload log into easy to find and analyze files on disk.
---

## Reload script logs

When doing a scheduled reload or a reload started from the QMC, Sense will create a detailed log file that includes all the commands executed during the reload.

If a reload for reason fails it can be very useful to look at these reload logs.

The _latest_ reload log file for each reload task is available via the QMC, but logs for previous reload attempts are not available via the QMC.

Using the same mechanism used by [reload failure alerts](/docs/concepts/alert-emails/) in general, Butler can be configured to store the reload logs of all failed reloads to disk.

The reload logs are stored in the directory configured in the Butler config file, with separate directories for each date:

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

All in all this makes it a lot easier to find log files for failed reloads.

Configuration of this feature is described [here](/docs/getting-started/setup/reload-script-logs/).
