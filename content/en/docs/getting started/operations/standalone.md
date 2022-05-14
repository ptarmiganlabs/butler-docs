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
  -V, --version                output the version number
  -c, --configfile <file>      path to config file
  -l, --loglevel <level>       log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-api-key <key>    insert API key to use with New Relic
  --new-relic-account-id <id>  New Relic account ID
  -h, --help                   display help for command
➜  butler git:(master)
PS C:\tools\butler>
```

Adding the `--configfile` option and pointing it to a valid config file gives Butler everything needed to start.

All other options are optional.

```powershell
PS C:\tools\butler> dir


    Directory: C:\tools\butler


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----       2022-04-07     05:41       65606159 butler.exe
-a----       2022-02-11     13:54          19728 production.yaml


PS C:\tools\butler>
PS C:\tools\butler> .\butler.exe -c .\production.yaml -l info
2022-05-12T18:07:58.478Z info: Adding normalized fileDelete directory c:\temp
...
...

2022-05-12T18:07:58.486Z info: CONFIG: Influxdb enabled: true
2022-05-12T18:07:58.486Z info: CONFIG: Influxdb host IP: 192.168.100.20
2022-05-12T18:07:58.486Z info: CONFIG: Influxdb host port: 8086
2022-05-12T18:07:58.486Z info: CONFIG: Influxdb db name: butler
2022-05-12T18:07:59.097Z info: CONFIG: Found InfluxDB database: butler
2022-05-12T18:07:59.546Z info: --------------------------------------
2022-05-12T18:07:59.546Z info: Starting Butler
2022-05-12T18:07:59.547Z info: Log level      : info
2022-05-12T18:07:59.547Z info: App version    : 7.4.0
2022-05-12T18:07:59.547Z info: Instance ID    : 3de76798c85894844ac20100cf2142c9a58cc90d7e9dd31a22c94b68048c3ee5
2022-05-12T18:07:59.547Z info:
2022-05-12T18:07:59.547Z info: Node version   : v16.13.2
2022-05-12T18:07:59.547Z info: Architecture   : x64
2022-05-12T18:07:59.547Z info: Platform       : Windows
2022-05-12T18:07:59.547Z info: Release        : 10.0.14393
2022-05-12T18:07:59.548Z info: Distro         : Microsoft Windows Server 2016 Standard
2022-05-12T18:07:59.548Z info: Codename       : 
2022-05-12T18:07:59.548Z info: Virtual        : false
2022-05-12T18:07:59.548Z info: Processors     : 1
2022-05-12T18:07:59.548Z info: Physical cores : 8
2022-05-12T18:07:59.548Z info: Cores          : 16
2022-05-12T18:07:59.548Z info: Docker arch.   : undefined
2022-05-12T18:07:59.548Z info: Total memory   : 68719476736
2022-05-12T18:07:59.549Z info: --------------------------------------
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
  -V, --version                output the version number
  -c, --configfile <file>      path to config file
  -l, --loglevel <level>       log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-api-key <key>    insert API key to use with New Relic
  --new-relic-account-id <id>  New Relic account ID
  -h, --help                   display help for command
➜  demo-dir
```

The available options are exactly the same as for Windows.

Below Butler is started with `info` level logging, using a config file `./production.yaml`.

```bash
➜  demo-dir ls -lah
drwxr-xr-x  6 goran  staff   192B May 12 20:07 .
drwxr-xr-x  4 goran  staff   128B Mar 30 16:20 ..
-rwxr-xr-x  1 goran  staff    75M May 12 19:49 butler
drwxr-xr-x  9 goran  staff   288B May 12 20:07 log
-rw-r--r--  1 goran  staff    30K May 12 20:07 production.yaml
➜  demo-dir
➜  demo-dir ./butler -c ./production.yaml -l info
2022-05-12T18:34:09.786Z info: Adding normalized fileCopy directories {
  "fromDir": "/Users/goran/butler-test-dir1",
  "toDir": "/Users/goran/butler-test-dir2"
}
2022-05-12T18:34:09.787Z info: Adding normalized fileCopy directories {
  "fromDir": "/Users/goran/butler-test-dir2",
  "toDir": "/Users/goran/butler-test-dir1"
}
...
...
2022-05-12T18:34:09.793Z info: CONFIG: Influxdb enabled: true
2022-05-12T18:34:09.794Z info: CONFIG: Influxdb host IP: 192.168.100.20
2022-05-12T18:34:09.794Z info: CONFIG: Influxdb host port: 8086
2022-05-12T18:34:09.794Z info: CONFIG: Influxdb db name: butler
2022-05-12T18:34:10.264Z info: CONFIG: Found InfluxDB database: butler
2022-05-12T18:34:10.661Z info: --------------------------------------
2022-05-12T18:34:10.662Z info: Starting Butler
2022-05-12T18:34:10.662Z info: Log level      : info
2022-05-12T18:34:10.662Z info: App version    : 7.3.2
2022-05-12T18:34:10.662Z info: Instance ID    : 3de76798c85894844ac20100cf2142c9a58cc90d7e9dd31a22c94b68048c3ee5
2022-05-12T18:34:10.662Z info:
2022-05-12T18:34:10.662Z info: Node version   : v16.13.2
2022-05-12T18:34:10.662Z info: Architecture   : x64
2022-05-12T18:34:10.663Z info: Platform       : darwin
2022-05-12T18:34:10.663Z info: Release        : 12.3.1
2022-05-12T18:34:10.663Z info: Distro         : macOS
2022-05-12T18:34:10.663Z info: Codename       : macOS Monterey
2022-05-12T18:34:10.663Z info: Virtual        : false
2022-05-12T18:34:10.663Z info: Processors     : 1
2022-05-12T18:34:10.663Z info: Physical cores : 8
2022-05-12T18:34:10.663Z info: Cores          : 16
2022-05-12T18:34:10.664Z info: Docker arch.   : undefined
2022-05-12T18:34:10.664Z info: Total memory   : 68719476736
2022-05-12T18:34:10.664Z info: --------------------------------------
...
...
```

#### Services & process monitors

The exact way of auto-starting apps when a computer boots varies between different versions of macOS and Linux.  
If you want to do this Google is your friend.

That said, [PM2](https://github.com/Unitech/pm2) and [Forever](https://github.com/foreverjs/forever) are two process monitors that both have been successfully tested with Butler. These tools bascially monitor what processes are running and restart them if they for some reason fail.

## Command line options

### \-\-configfile

The `--configfile` is a must-have as it's the only way to tell the standalone Butler executable where to find its config file.

### \-\-loglevel

The `--loglevel` option can be quite useful when you want to temporarily switch from the `info` level logging set in the config file, to a more detailed `verbose` or `debug` level logging while investigating some problem.  
Changing log level on the command line is simply easier than doing the same in the config file.

### \-\-new-relic-api-key

It's always better to store sensitive information in environment variable than in config files.

For that reason it's possible to provide the New Relic insert API key (using when sending data to New Relic) via a command line option.  
It's then possible to pass in the New Relic API key via the command line rather than store it within the config file.

### \-\-new-relic-account-id

Similar to the `--new-relic-api-key`, the account ID used with New Relic can be provided as a command line option.

{{< notice tip >}}
Any option given on the command line will override the same setting in the config file
{{< /notice >}}
