---
title: "Configuring file system access via REST API"
linkTitle: "File system access"
weight: 130
description: >
  Butler contains REST API endpoints for moving, copying and deleting files.
---

## What's this?

For (good) security reasons Qlik Sense does not allow direct access to the file system.  
In QlikView this was possible, but also resulted in risks and potential attack vectors for poorly written or even malicious QlikView apps.

Still, from time to time you need to delete old QVDs, move config files from an inbox directory to a staging ditto etc. Butler solves this by allowing file copy/move/delete operations between pre-defined directories.

By using the these APIs you can do file system operations from within Sense load scripts.

## How it works

There are three supported file system operations: copy, move and delete:

- For copy and move operations you specify which source and destination directories are allowed.
- For delete operations you specify which directories file delete operations are allowed in.
- Wildcards are supported.
- Butler will try to clean up paths when loading them from the config file. See below for example.

As the config file is only read when Butler starts, you must restart Butler in order for any config changes to take effect.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # List of directories between which file copying via the REST API can be done.
  # Butler will try to clean up messy paths like this one, which resolves to /Users/goran/butler-test-dir1
  # How? First you have /Users/goran/butler-test-dir1//abc which cleans up to /Users/goran/butler-test-dir1/abc,
  # then up one level (..).
  fileCopyApprovedDirectories:
    - fromDirectory: /Users/goran/butler-test-dir1//abc//..
      toDirectory: /Users/goran/butler-test-dir2
    - fromDirectory: /Users/goran/butler-test-dir2
      toDirectory: /Users/goran/butler-test-dir1
    - fromDirectory: /from/some/directory2
      toDirectory: /to/some/directory2

  # List of directories between which file moves via the REST API can be done.
  fileMoveApprovedDirectories:
    - fromDirectory: /Users/goran/butler-test-dir1//abc//..
      toDirectory: /Users/goran/butler-test-dir2
    - fromDirectory: /Users/goran/butler-test-dir2
      toDirectory: /Users/goran/butler-test-dir1
    - fromDirectory: /from/some/directory2
      toDirectory: /to/some/directory2

  # List of directories in which file deletes via the REST API can be done.
  fileDeleteApprovedDirectories:
    - /Users/goran/butler-test-dir1
    - /Users/goran/butler-test-dir1//abc//..
    - /Users/goran/butler-test-dir2
  ...
  ...
```
