---
title: "Storing script logs of failed reloads to disk"
linkTitle: "Store failed reload logs"
weight: 50
description: >
  When investigating reload failures it can often be useful to have access to the entire reload log.


  Butler can store complete script logs for failed app reloads on local disk, making it easy to figure out what happened without having to log into Qlik Cloud. 
---

## Reload script logs

Butler can be configured to retrieve and store the reload logs of all failed app reloads to disk.

The feature is identical to that of client-managed Qlik Sense, but those features can be individually enabled/disabled and configured.

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