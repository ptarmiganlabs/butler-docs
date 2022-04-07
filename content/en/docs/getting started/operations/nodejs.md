---
title: 'Node.js app'
linkTitle: 'Node.js app'
weight: 30
description: >
    
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Running Butler as Node.js app

If the Butler source code has been installed in `d:\tools\butler`, starting Butler as a Node.js app on Windows could look like this:  

    d:
    cd \tools\butler\src
    node butler.js

It is of course also possible to put those commands in a command file (.bat or .ps1 on Windows) file and execute that file instead.

The commands above assume there is a `d:\tools\butler\src\config` directory in which there is a YAML config file.  
The name of that config file should match the value set to the `NODE_ENV` environment variable.  
For example, if `NODE_ENV=dev` the config file should be `d:\tools\butler\src\config\dev.yaml`.

The command line options introduced in Butler 7.2 are available also when running Buter as a Node.js app.  
Use the `--help` command line option to show what options are available:

```powershell
PS D:\tools\butler\src> node butler.js --help
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version            output the version number
  -c, --configfile <file>  path to config file
  -l, --loglevel <level>   log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  -h, --help               display help for command
```

Looking at the above, it's actually possible to use the `--configfile` to specify which config file to use.  

Similarly the `--loglevel` option can be used to control Butler's logging.

{{< notice tip >}}
Any option given on the command line will override the same setting in the config file
{{< /notice >}}

## Windows services

On Windows you can use the excellent [Nssm](https://nssm.cc/) tool to make Node.js (and also the Butler app) run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic restarts etc).
