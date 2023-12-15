---
title: "Storing script logs of failed reloads to disk"
linkTitle: "Store failed reload logs"
weight: 42
description: >
  When investigating reload failures it can often be useful to have access to the entire reload log.<br>
  Butler detects failed reloads and can store the entire reload log into easy to find and analyse files on disk. 
---

## Reload script logs

When doing a scheduled reload or a reload started from the QMC, Sense will create a detailed log file that includes all the commands executed during the reload.

If a reload for reason fails it can be very useful to look at these reload logs.

The *latest* reload log file for each reload task is available via the QMC, but logs for previous reload attempts are not available via the QMC.

Using the same mechanism used by [reload failure alerts](/docs/concepts/alert-emails/) in general, Butler can be configured to store the reload logs of all failed reloads to disk.

The reload logs are stored in the directory configured in the Butler config file, with separate directories for each date:

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

All in all this makes it a lot easier to find log files for failed reloads.

Configuration of this feature is described [here](/docs/getting-started/setup/reload-script-logs/).