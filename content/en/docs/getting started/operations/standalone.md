---
title: 'Standalone app'
linkTitle: 'Standalone app'
weight: 10
description: >
    Running Butler as a standalone app is in most cases the easiest way to use Butler. <br>
    Pre-built executables are available for Windows, macOS and Linux.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Running Butler as standalone, native app

### Windows

Running standalone Butler on Windows Server 2016 looks like this:

```powershell
PS C:\tools\butler> .\butler.exe
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version            output the version number
  -c, --configfile <file>  path to config file
  -l, --loglevel <level>   log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  -h, --help               display help for command
PS C:\tools\butler>
```

Adding the `--configfile` option and pointing it to a valid config file gives Butler everything needed to start.  
The `-l info` option is optional.

```powershell
PS C:\tools\butler> dir


    Directory: C:\tools\butler


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----       2022-04-07     05:41       65606159 butler.exe
-a----       2022-02-11     13:54          19728 production.yaml


PS C:\tools\butler>
PS C:\tools\butler> .\butler.exe -c .\production.yaml -l info
2022-04-07T05:40:09.399Z info: Adding normalized fileDelete directory c:\temp
...
...
2022-04-07T05:40:09.400Z info: CONFIG: Influxdb enabled: true
2022-04-07T05:40:09.400Z info: CONFIG: Influxdb host IP: <removed>
2022-04-07T05:40:09.401Z info: CONFIG: Influxdb host port: 8086
2022-04-07T05:40:09.401Z info: CONFIG: Influxdb db name: senseops
2022-04-07T05:40:10.019Z info: CONFIG: Found InfluxDB database: senseops
2022-04-07T05:40:18.102Z info: --------------------------------------
2022-04-07T05:40:18.102Z info: Starting Butler
2022-04-07T05:40:18.105Z info: Log level      : info
2022-04-07T05:40:18.105Z info: App version    : 7.2.0
2022-04-07T05:40:18.106Z info: Instance ID    : <removed>
2022-04-07T05:40:18.106Z info:
2022-04-07T05:40:18.106Z info: Node version   : v16.13.2
2022-04-07T05:40:18.106Z info: Architecture   : x64
2022-04-07T05:40:18.107Z info: Platform       : Windows
2022-04-07T05:40:18.107Z info: Release        : 10.0.14393
2022-04-07T05:40:18.107Z info: Distro         : Microsoft Windows Server 2016 Standard
2022-04-07T05:40:18.107Z info: Codename       :
2022-04-07T05:40:18.107Z info: Virtual        : true
2022-04-07T05:40:18.108Z info: Processors     : 3
2022-04-07T05:40:18.108Z info: Physical cores : 6
2022-04-07T05:40:18.108Z info: Cores          : 12
2022-04-07T05:40:18.108Z info: Docker arch.   : undefined
2022-04-07T05:40:18.108Z info: Total memory   : 68719005696
2022-04-07T05:40:18.108Z info: --------------------------------------
...
...
PS C:\tools\butler>
```

#### Windows services & process monitors

You can use the excellent [Nssm](https://nssm.cc/) tool to make Butler run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic start/restart etc).

### macOS and Linux

Running the standalone Butler tool without any parameters gives you a help text that explains which commands and options are available:

```bash
➜  demo-dir ./butler
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version            output the version number
  -c, --configfile <file>  path to config file
  -l, --loglevel <level>   log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  -h, --help               display help for command
➜  demo-dir
```

There are no sub-commands, but a few options are available, most notably `--configfile`.

Let's first look at what files we have available, then start Butler on macOS. Linux looks and works the same.  
Below Butler is started with `info` level logging, using a config file `./production.yaml`.

```bash
➜  demo-dir ls -lah
total 165936
drwxr-xr-x  6 goran  staff   192B Apr  7 07:16 .
drwxr-xr-x  4 goran  staff   128B Apr  7 07:16 ..
-rwxr-xr-x  1 goran  staff    75M Apr  7 05:48 butler
drwxr-xr-x  5 goran  staff   160B Apr  7 05:44 log
-rw-r--r--  1 goran  staff    21K Apr  7 05:38 production.yaml
drwxr-xr-x  5 goran  staff   160B Apr  7 05:51 scriptlog
➜  demo-dir
➜  demo-dir ./butler -c ./production.yaml -l info
2022-04-07T05:24:38.501Z info: Adding normalized fileCopy directories {
  "fromDir": "/Users/goran/butler-test-dir1",
  "toDir": "/Users/goran/butler-test-dir2"
}
2022-04-07T05:24:38.503Z info: Adding normalized fileCopy directories {
  "fromDir": "/Users/goran/butler-test-dir2",
  "toDir": "/Users/goran/butler-test-dir1"
}
...
...
2022-04-07T05:24:38.509Z info: CONFIG: Influxdb enabled: true
2022-04-07T05:24:38.509Z info: CONFIG: Influxdb host IP: <removed>
2022-04-07T05:24:38.509Z info: CONFIG: Influxdb host port: 8086
2022-04-07T05:24:38.509Z info: CONFIG: Influxdb db name: butler
2022-04-07T05:24:38.962Z info: CONFIG: Found InfluxDB database: butler
2022-04-07T05:24:39.409Z info: --------------------------------------
2022-04-07T05:24:39.409Z info: Starting Butler
2022-04-07T05:24:39.410Z info: Log level      : info
2022-04-07T05:24:39.410Z info: App version    : 7.2.0
2022-04-07T05:24:39.410Z info: Instance ID    : <removed>
2022-04-07T05:24:39.410Z info:
2022-04-07T05:24:39.410Z info: Node version   : v16.13.2
2022-04-07T05:24:39.410Z info: Architecture   : x64
2022-04-07T05:24:39.410Z info: Platform       : darwin
2022-04-07T05:24:39.410Z info: Release        : 12.3
2022-04-07T05:24:39.410Z info: Distro         : macOS
2022-04-07T05:24:39.410Z info: Codename       : macOS Monterey
2022-04-07T05:24:39.411Z info: Virtual        : false
2022-04-07T05:24:39.411Z info: Processors     : 1
2022-04-07T05:24:39.411Z info: Physical cores : 8
2022-04-07T05:24:39.411Z info: Cores          : 16
2022-04-07T05:24:39.411Z info: Docker arch.   : undefined
2022-04-07T05:24:39.411Z info: Total memory   : 68719476736
2022-04-07T05:24:39.412Z info: --------------------------------------
...
...
```

#### Services & process monitors

The exact way of auto-starting apps when a computer boots varies between different versions of macOS and Linux.  
If you want to do this Google is your friend.

That said, [PM2](https://github.com/Unitech/pm2) and [Forever](https://github.com/foreverjs/forever) are two process monitors that both have been successfully tested with Butler. These tools bascially monitor what processes are running and restart them if they for some reason fail.

## Command line options

The `--configfile` is a must-have as it's the only way to tell the standalone Butler executable where to find its config file.

The `--loglevel` option can be quite useful when you want to temporarily switch from the `info` level logging set in the config file, to a more detailed `verbose` or `debug` level logging while investigating some problem.  
Changing log level on the command line is simply easier than doing the same in the config file.

{{< notice tip >}}
Any option given on the command line will override the same setting in the config file
{{< /notice >}}
