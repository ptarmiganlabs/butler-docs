---
title: "Helper subs that make it easy to use Butler APIs"
linkTitle: "Sense helper subs"
weight: 60
description: >
    Butler exposes a REST API that can be called from many different systems and tools, just not Qlik Sense itself.
      
    When it comes to Sense, it's very doable but not entirely easy to call REST APIs from an app's load script.  
    Butler comes with a set of subs/functions that wrap the API calls and make it a lot easier and cleaner to call Butler APIs from load scripts.
      
    This page describes those subs.
---


## Currently available helper subs

These sub() are available in the the file `butler_subs.qvs` in the [GitHub repo](https://github.com/ptarmiganlabs/butler/blob/master/docs/sense_script/butler_subs.qvs).

They are also part of the demo app **Butler 5.2 demo app**, which is also available in the [GitHub repo](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

| Sub name | Description |
|----------|-------------|
| NiceTrace | Prints timestamped messages in the reload log. |
| ButlerInit | Initializes some data structures used by Butler. Right now there isn't much done in this sub, but this may change in future versions. |
| GetEnabledButlerAPIEndpoints | Gets a list of which Butler API endpoints are enabled. |
| ReloadSenseApp | Does a full or partial app reload in the engine. No reload tasks are involved in the actual reload, but when the reload is done different reload tasks can be started depending on whether the reload was successful or not. |
| StartTask | Start a reload task. Task ID is used to identify which task should be started. Useful for starting reload tasks when certain conditions are met during an app reload. |
| StartTask_KeyValue | Same as above, but a key-value pair can also be included via the extra parameters. This KV pair is saved in Butler's KV store (assuming it's enabled). Any Sense app (or other system) can then query the KV store for these parameters. It's thus an easy but effective way of passing arbitrary parameters to Sense tasks (or rather to the associated app's load scripts). |
| CopyFile | Copy a file or directory in a file system that's accessible to Butler and also approved in the config file. |
| MoveFile | Move a file or directory in a file system that's accessible to Butler and also approved in the config file. |
| DeleteFile | Delete a file in a file system that's accessible to Butler and also approved in the config file. |
| CreateDir | Create new directory anywhere Butler has access. ***Warning!*** If Butler is running with admin privileges there is no stopping a user from creating directories *anywhere*.  |
| CreateDirQVD | Create a directory somewhere under the QVD folder specified in the config file's `Butler.configDirectories.qvdPath`. This is less of a security concern than the previous call, of course. |
| AddKeyValue | Add a key-value pair to a namespace in the Key-Value (KV) store. |
| GetKeyValue | Get KV pair in a namespace. |
| DeleteKeyValue | Delete a KV pair in a namespace. |
| ExistsKeyValue | Tests if a KV pair exists in a namespace.  |
| DeleteKeyValueNamespace | Delete a namespace and all KV pairs in it. |
| GetKeyValueNamespaces | Get all namespaces. |
| GetKeyValueNamespaces | Get all keys in a specifi namespace. |
| PostToMQTT | Post a message to a MQTT topic. |
| PostToSlack | Post a basic message to Slack. |

## Helper subs on the todo list

There should be helper subs for these API endpoints too, they're just not there yet...

| Sub name | Description |
|----------|-------------|
| AddSchedule | Add a new task reload schedule to Butler's scheduler. |
| GetSchedule | Get information about an existing Butler task schedule. |
| UpdateSchedule | Modify an existing Butler task schedule. |
| DeleteSchedule | Delete a Butler task schedule. |
| StartSchedule | Enable a Butler task schedule. |
| StopSchedule | Disable/pause a Butler task schedule. |
| PostToTeams | Make it easy to post basic messages to MS Teams. |
