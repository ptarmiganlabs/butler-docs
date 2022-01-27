---
title: "Controlled and secure file system operations"
linkTitle: "File system operations"
weight: 60
description: >
    For security reasons Qlik Sense does not offer direct access to the file system from load scripts.
    Using lib:// constructs files can be read and written, but not copied, moved or deleted.
      
    Butler has APIs that enabled file copy/move/delete in a secure, controlled way.
---

## Goal: Copy, move and delete files from Sense load scripts

These steps are needed to achieve the goal:

1. Install and configure Butler's general settings.
2. Add the directories in which file operations should be allowed to Butler's config file.  
   Make sure the account Butler runs under has the appropriate access to those directories.
3. Make sure the [necessary Sense data connections](/docs/getting-started/setup/data-connections) exist.
4. Call the Butler APIs directly or use the subs included in the GitHub repo to do the desired file operations.

### 1. Install and configure Butler

Described [here](https://butler.ptarmiganlabs.com/docs/getting-started/setup/).

### 2. Add approved directories to Butler config file

The general idea is:  
For each file system operation (copy, move and delete) you can specify in which (or between which) directories that operation should be allowed.

This is straight forward, but because Butler can run on different operating systems AND access file shares hosted by various OSs, things can get a bit complicated.  
In most cases the paths to use are the expected ones, but when it comes to UNC paths they need to use forward slash "/" rather than back ditto "\\".

A few examples show how to deal with some common scenarios:

```yaml
  fileCopyApprovedDirectories:
    - fromDirectory: /data1/qvd           # Butler running on Linux, with either a local directory in /data1, or a remote fileshare mounted into /data1
      toDirectory: /data2/qvd_archive
    - fromDirectory: e:\data3\qvd         # Butler running on Windows Server, accessing files/directories in the local file system
      toDirectory: e:\data4\qvd_archive
    - fromDirectory: //server1.my.domain/fileshare1/data1   # Butler running on Windows server, accessing a SMB file share (which can be on a Windows or Linux server)
      toDirectory: //server1.my.domain/fileshare1/data2     # In UNC notation this path would be \\server1.my.domain\fileshare1\data2

  fileMoveApprovedDirectories:
    - fromDirectory: /data7/qvd
      toDirectory: /data8/qvd_archive
    - fromDirectory: e:\data9\qvd
      toDirectory: e:\data10\qvd_archive
    - fromDirectory: //server2.my.domain/data1/qvd
      toDirectory: //server2.my.domain/data1/qvd_archive

  fileDeleteApprovedDirectories:
    - /data1/qvd_archive
    - e:\data1\qvd_archive
    - //server3.my.domain/data1/qvd_archive     # UNC would be \\server3.my.domain\data1\qvd_archive
```

This configuration (for example) means:

- Copying can be done from `e:\data3\qvd` to `e:\data4\qvd_archive`, but *not* from `e:\data3\qvd` to `e:\data6\qvd_archive`
- Moving files can be done from `/data7/qvd` to `/data8/qvd_archive`, but *not* from `/data7/qvd` to `e:\data9\qvd`
- Files can be deleted in the directories `/data1/qvd_archive`, `e:\data1\qvd_archive` and (using UNC notation) `\\server3.my.domain\data1\qvd_archive`.

### 3. Create Sense data connections used to call Butler's REST API

Described [here](/docs/getting-started/setup/data-connections/).

### 4. Call the Butler APIs or use convenience subs

Once you know what file path format to use (see above), using the helper subs is pretty easy:

```
// Where is Butler running?
let vButlerHost = 'http://10.11.12.13';
let vButlerPort = 8080;

// Delete files
Call DeleteFile('/data1/qvd_archive/a.txt')
Call DeleteFile('e:\data1\qvd_archive\a.txt')
Call DeleteFile('//server3.my.domain/data1/qvd_archive\a.txt')

// Copy files with options overwrite-if-exists=true and keep-source-timestamp=true
Call CopyFile('/data1/qvd/a.txt', '/data2/qvd_archive/a.txt', 'true', 'true')
Call CopyFile('e:\data5\qvd\a.txt', 'e:\data6\qvd_archive\a.txt', 'true', 'true')

// Move files with option overwrite-if-exists=true
Call MoveFile('/data7/qvd/a.txt', '/data8/qvd_archive/a.txt', 'true')
Call MoveFile('e:\data9\qvd\a.txt', 'e:\data10\qvd_archive\a.txt', 'true')

```

If you prefer to call the REST API directly, the DeleteFile sub might provide some inspiration:

```
// ------------------------------------------------------------
// ** Delete file **
//
// Files can only be deleted in folders (and subfolders of) directories that 
// have been approved in the Butler config file.
//
// Paramaters:
// vFile                : File to be deleted. 
// ------------------------------------------------------------
sub DeleteFile(vFile)
    let vFile = Replace('$(vFile)', '\', '/');
    let vFile = Replace('$(vFile)', '#', '%23');

    let vRequestBody = '{""deleteFile"":""$(vFile)""}';

    LIB CONNECT TO 'Butler_POST';

    RestConnectorMasterTable:
    SQL SELECT 
        "vFile"
    FROM JSON (wrap on) "root"
    WITH CONNECTION (
    Url "$(vButlerHost):$(vButlerPort)/v4/filedelete",
    BODY "$(vRequestBody)",
    HTTPHEADER "X-HTTP-Method-Override" "DELETE"
    );

    set vFile=;
    set vRequestBody=;
    DROP TABLE RestConnectorMasterTable;
end sub
```

Note how the HTTP operation is set using the X-HTTP-Method-Override HTTP header.

This is a way to work around a limitation of Qlik's REST connector, as it only supports GET and POST operations. The extra HTTP header tells Butler what kind of HTTP operation should *really* be carried out.
