---
title: "File system access: copy/move/delete files"
linkTitle: "Copy/move/delete files"
weight: 37
description: >
  Manipulating files from Sense load scripts in a secure yet flexible way.
---

## Unrestricted file system access is a security risk

Qlik Sense locked down things quite a bit compared to its QlikView predecessor:

In QlikView your app scripts could do almost anything with any file on the server's disks as long as the QlikView service account had access to the file.  
This was not ideal from a security perspective and Qlik Sense therefore introduced the concept of [folder data connetions](https://help.qlik.com/en-US/sense/November2020/Subsystems/Hub/Content/Sense_Hub/LoadData/connect-data-sources-data-load-editor.htm) and in general much stricter [file system access restrictions](https://help.qlik.com/en-US/sense/November2020/Subsystems/Hub/Content/Sense_Hub/LoadData/file-system-access-restriction.htm).

With this change Qlik Sense had a much better position with respect to security, as access to files was now boxed by the folder data connection the access used (by means of lib:// statements).  
It's also possible to [include .qvs script files](https://help.qlik.com/en-US/sense/November2020/Subsystems/Hub/Content/Sense_Hub/Scripting/SystemVariables/Include.htm) via the same mechanism.

The problem now is that it's no longer possible to do file level operations on individual or groups of files.  
No more deleting, copying or moving of files from within the load script.

Now - there is a per-server setting that disables this new "standard mode" and reverts back to what's known as "legacy mode", which is essentially how QlikView worked (and still works). But then the Sense environment is once again vulerable to badly written or even malicious Sensse apps.

## Butler adds controlled file system access to Qlik Sense Enterprise

Butler's solution is to add a set of REST API endpoints for file copy/move/delete operations, but only allow these to operate on pre-defined folders.

For example, you might have a QVD folder at `e:\data\qvd\sales\temp`.  
You also need to remove old QVDs from that folder.

This could be done with scheduled BAT/CMD files or PowerShell scripts, but it might be better/more flexible/easier to maintain to drive this cleanup from the load script of a Sense app.

The solution: Add `e:\data\qvd\sales\temp` to Butler's list of folders in which files can be deleted, then call Butler's `/v4/filedelete` [API endpoint](docs/reference/rest-api/) from within your app's load script. Done!

## Convenience subs

Butler includes a set of Subs that make it easy to use the file copy/move/delete APIs.  
These subs are found in [this .qvs file](https://github.com/ptarmiganlabs/butler/blob/master/docs/sense_script/butler_subs.qvs) as well as embedded in the [Butler demo app](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

The [examples section](/docs/examples) shows how to use these subs - or call the Butler APIs directly.
