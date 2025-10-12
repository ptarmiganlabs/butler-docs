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

{{% alert title="Warning: UNC paths only on Windows" color="warning" %}}
UNC paths (i.e. "\\\\host\\fileshare\\folder1\\folder2") is a Windows-only feature and as such only supported when Butler is running on Windows.

If Butler is running on a non-Windows operating system and directories on network file shares should be accessible via Butler's REST API, those directories must be mounted on the server using the standard OS mechanisms, then accessed via the server's local file system.

Butler will warn in the console and file logs if UNC paths are specified in the config file, and Butler is NOT running on Windows.
{{% /alert %}}

### 1. Install and configure Butler

Described [here](https://butler.ptarmiganlabs.com/docs/getting-started/setup/).

### 2. Add approved directories to Butler config file

The general idea is:  
For each file system operation (copy, move and delete) you can specify in which (or between which) directories that operation should be allowed.

This is straight forward, but because Butler can run on different operating systems AND access file shares hosted by various OSs, things can get a bit complicated.  
In most cases the paths to use are the expected ones, but when it comes to UNC paths they can for example either use forward slash "/" or back ditto "\\".  
Both work as all paths are normalized into an internal, uniform format when loaded into Butler.

Note that all subdirectories of the directories listed in the config file are also considered to be approved directories by Butler.

A few examples show how to deal with some common scenarios:

```yaml
fileCopyApprovedDirectories:
  - fromDirectory: /data1/qvd # Butler running on Linux, with either a local directory in /data1, or a remote fileshare mounted into /data1
    toDirectory: /data2/qvd_archive
  - fromDirectory: e:\data3\qvd # Butler running on Windows Server, accessing files/directories in the local file system
    toDirectory: e:\data4\qvd_archive
  - fromDirectory: //server1.my.domain/fileshare1/data1 # Butler running on Windows server, accessing a SMB file share (which can be on a Windows or Linux server)
    toDirectory: //server1.my.domain/fileshare1/data2
  - fromDirectory: \\server1.my.domain\fileshare1\data1
    toDirectory: \\server1.my.domain\fileshare1\data2

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
  - //server3.my.domain/data1/qvd_archive
  - \\server3.my.domain\data1\qvd_archive
```

This configuration (for example) means:

- Copying can be done from `e:\data3\qvd` to `e:\data4\qvd_archive`, but _not_ from `e:\data3\qvd` to `e:\data6\qvd_archive`
- Moving files can be done from `/data7/qvd` to `/data8/qvd_archive`, but _not_ from `/data7/qvd` to `e:\data9\qvd`
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
// Parameters:
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

This is a way to work around a limitation of Qlik's REST connector, as it only supports GET and POST operations. The extra HTTP header tells Butler what kind of HTTP operation should _really_ be carried out.

## Examples using UNC paths

When specifying UNC paths in the Butler config file and running Butler on a non-Windows operating system, you will get warnings like the ones below.

The approved directories sections of the config file look like this:

```yaml
Butler:
  ....
# List of directories between which file copying via the REST API can be done.
  fileCopyApprovedDirectories:
    - fromDirectory: /from/some/directory2
      toDirectory: /to/some/directory2
    - fromDirectory: //1.2.3.4/qlik/testdata/deletefile1
      toDirectory: //1.2.3.4/qlik/testdata/deletefil2

    # List of directories between which file moves via the REST API can be done.
  fileMoveApprovedDirectories:
    - fromDirectory: /from/some/directory3
      toDirectory: /to/some/directory3
    - fromDirectory: //1.2.3.4/qlik/testdata/deletefile1
      toDirectory: //1.2.3.4/qlik/testdata/deletefil2

  fileDeleteApprovedDirectories:
    - /from/some/directory2
    - \\1.2.3.4\qlik\testdata\deletefile3
```

In this case Butler is running on macOS (with IP 192.168.1.168 on port 8081) and we get warnings in the logs when starting Butler:

{{< imgproc butler-unc-path-on-macos-1 Resize "900x" >}}
Startup warnings about non-compatible UNC paths when running Butler on macOS.
{{< /imgproc >}}

When trying to do a file operation (in this case a delete) using an UNC path (Butler is still running on macOS!) we get a warning in the logs and a http error returned to the Sense script:

{{< imgproc butler-unc-path-on-macos-3 Resize "600x" >}}
http error returned when trying to delete a file via a UNC path, and Butler is running on macOS.
{{< /imgproc >}}

{{< imgproc butler-unc-path-on-macos-2 Resize "900x" >}}
Warnings in log for the previous scenario.
{{< /imgproc >}}
