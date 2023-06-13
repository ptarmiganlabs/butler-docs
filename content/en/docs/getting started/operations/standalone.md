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
  -V, --version                        output the version number
  -c, --configfile <file>              path to config file
  -l, --loglevel <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-account-name  <name...>  New Relic account name. Used within Butler to differentiate between different target
                                       New Relic accounts
  --new-relic-api-key <key...>         insert API key to use with New Relic
  --new-relic-account-id <id...>       New Relic account ID
  --test-email-address <address>       send test email to this address. Used to verify email settings in the config file.
  --test-email-from-address <address>  send test email from this address. Only relevant when SMTP server allows from address
                                       to be set.
  -h, --help                           display help for command
PS C:\tools\butler>
```

Adding the `--configfile` option and pointing it to a valid config file gives Butler everything needed to start.

All other options are optional.

```powershell
PS C:\tools\butler> dir


    Directory: C:\tools\butler


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        20/06/2022     17:18                log
-a----        20/06/2022     16:27       68426646 butler.exe
-a----        20/06/2022     17:17          34762 production.yaml


PS C:\tools\butler> .\butler.exe -c .\production.yaml -l info
2022-06-20T18:58:48.110Z info: Enabled API endpoints: [
  "butlerping",
  "keyValueStore",
  "mqttPublishMessage",
  "postNewRelicMetric",
  "postNewRelicEvent",
  "senseStartTask",
]
2022-06-20T18:58:48.110Z info: CONFIG: Influxdb enabled: true
2022-06-20T18:58:48.110Z info: CONFIG: Influxdb host IP: 10.11.12.13
2022-06-20T18:58:48.110Z info: CONFIG: Influxdb host port: 8086
2022-06-20T18:58:48.110Z info: CONFIG: Influxdb db name: butler
2022-06-20T18:58:48.781Z info: CONFIG: Found InfluxDB database: butler
2022-06-20T18:58:57.844Z info: --------------------------------------
2022-06-20T18:58:57.844Z info: Starting Butler
2022-06-20T18:58:57.859Z info: Log level      : info
2022-06-20T18:58:57.859Z info: App version    : 8.3.1
2022-06-20T18:58:57.859Z info: Instance ID    : c473b6c518f8f.....
2022-06-20T18:58:57.859Z info:
2022-06-20T18:58:57.859Z info: Node version   : v16.15.0
2022-06-20T18:58:57.859Z info: Architecture   : x64
2022-06-20T18:58:57.859Z info: Platform       : Windows
2022-06-20T18:58:57.859Z info: Release        : 10.0.19043
2022-06-20T18:58:57.859Z info: Distro         : Microsoft Windows 10 Pro
2022-06-20T18:58:57.859Z info: Codename       :
2022-06-20T18:58:57.859Z info: Virtual        : false
2022-06-20T18:58:57.859Z info: Processors     : 1
2022-06-20T18:58:57.875Z info: Physical cores : 2
2022-06-20T18:58:57.875Z info: Cores          : 2
2022-06-20T18:58:57.875Z info: Docker arch.   : undefined
2022-06-20T18:58:57.875Z info: Total memory   : 6418677760
2022-06-20T18:58:57.875Z info: --------------------------------------
...
...
PS C:\tools\butler>
```

#### Windows services & process monitors

You can use the excellent [Nssm](https://nssm.cc/) tool to make Butler run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic start/restart etc).

A step-by-step tutorial for running the Butler tools as Windows services is available over at [ptarmiganlabs.com](https://ptarmiganlabs.com/running-butler-tools-as-windows-services/).

### macOS and Linux

Running the standalone Butler tool without any parameters gives you a help text that explains which commands and options are available:

```bash
➜  demo-dir ./butler
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version                        output the version number
  -c, --configfile <file>              path to config file
  -l, --loglevel <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-account-name  <name...>  New Relic account name. Used within Butler to differentiate between different target New Relic accounts
  --new-relic-api-key <key...>         insert API key to use with New Relic
  --new-relic-account-id <id...>       New Relic account ID
  --test-email-address <address>       send test email to this address. Used to verify email settings in the config file.
  --test-email-from-address <address>  send test email from this address. Only relevant when SMTP server allows from address to be set.
  -h, --help                           display help for command
➜  demo-dir
```

The available options are exactly the same as for Windows.

Below Butler is started with `info` level logging, using a config file `./production.yaml`.

```bash

➜  demo-dir ls -lah
total 161352
drwxr-xr-x  4 goran  staff   128B Jun 20 21:06 .
drwxr-xr-x  5 goran  staff   160B Apr 24 01:55 ..
-rwxr-xr-x@ 1 goran  staff    79M Jun 20 20:12 butler
-rw-r--r--  1 goran  staff    21K Apr  7 05:38 production.yaml
➜  demo-dir ./butler -c ./production.yaml -l info
2022-06-20T19:07:01.441Z info: Adding normalized fileCopy directories {
...
...
2022-06-20T19:07:01.447Z info: CONFIG: Influxdb enabled: true
2022-06-20T19:07:01.447Z info: CONFIG: Influxdb host IP: 10.11.12.13
2022-06-20T19:07:01.448Z info: CONFIG: Influxdb host port: 8086
2022-06-20T19:07:01.448Z info: CONFIG: Influxdb db name: butler
2022-06-20T19:07:01.923Z info: CONFIG: Found InfluxDB database: butler
2022-06-20T19:07:02.455Z info: --------------------------------------
2022-06-20T19:07:02.456Z info: Starting Butler
2022-06-20T19:07:02.456Z info: Log level      : info
2022-06-20T19:07:02.456Z info: App version    : 8.3.2
2022-06-20T19:07:02.456Z info: Instance ID    : 3de76798c8589....
2022-06-20T19:07:02.456Z info:
2022-06-20T19:07:02.456Z info: Node version   : v16.15.0
2022-06-20T19:07:02.456Z info: Architecture   : x64
2022-06-20T19:07:02.456Z info: Platform       : darwin
2022-06-20T19:07:02.457Z info: Release        : 12.3.1
2022-06-20T19:07:02.457Z info: Distro         : macOS
2022-06-20T19:07:02.457Z info: Codename       : macOS Monterey
2022-06-20T19:07:02.457Z info: Virtual        : false
2022-06-20T19:07:02.457Z info: Processors     : 1
2022-06-20T19:07:02.457Z info: Physical cores : 8
2022-06-20T19:07:02.457Z info: Cores          : 16
2022-06-20T19:07:02.458Z info: Docker arch.   : undefined
2022-06-20T19:07:02.458Z info: Total memory   : 68719476736
2022-06-20T19:07:02.458Z info: --------------------------------------
...
...
```

#### Services & process monitors

The exact way of auto-starting apps when a computer boots varies between different versions of macOS and Linux.  
If you want to do this Google is your friend.

That said, [PM2](https://github.com/Unitech/pm2) and [Forever](https://github.com/foreverjs/forever) are two process monitors that both have been successfully tested with Butler. These tools bascially monitor what processes are running and restart them if they for some reason fail.

## Command line options

{{< notice tip >}}
Any option given on the command line will override the same setting in the config file
{{< /notice >}}

### \-\-version, -V

Shows Butler's version number.

### \-\-configfile, -c

The `--configfile` option is a must-have as it's the only way to tell the standalone Butler executable where to find its config file.

### \-\-loglevel, -l

The `--loglevel` option can be quite useful when you want to temporarily switch from the `info` level logging set in the config file, to a more detailed `verbose` or `debug` level logging while investigating some problem.  

### \-\-new-relic-account-name

A list of New Relic account names to which data can be sent from Butler.  

The arguments to this option consists of one or more strings enclosed in single or double quotes (depending on which operating system is used), separated by a space.  
For example `--new-relic-account-name "First NR account" "Second NR account"`.

Note that the same number of arguments must be passed to all the command line options dealing with New Relic accounts!

### \-\-new-relic-api-key

It's always better to store sensitive information in environment variable than in config files.

For that reason it's possible to provide the New Relic insert API keys (used when sending data to New Relic) via a command line option.  
It's then possible to pass in the New Relic API key via the command line rather than store it within the config file.

The arguments to this option consists of one or more strings enclosed in single or double quotes (depending on which operating system is used), separated by a space.  
For example `--new-relic-api-key "API key 1" "API key 2"`.

### \-\-new-relic-account-id

Similar to the `--new-relic-api-key`, the account ID(s) used with New Relic can be provided as a command line option.

The arguments to this option consists of one or more strings enclosed in single or double quotes (depending on which operating system is used), separated by a space.  
For example `--new-relic-account-id "account ID 1" "account ID 2"`.

### \-\-test-email-address

Used to send a test email to an email addresses. Can be used to confirm that the SMTP settings used when sending reload failed/aborted notification emails are working as intended.

Example: `--test-email-address joe@company.com`

### \-\-test-email-from-address

Some SMTP servers, for example GMail, require you to authenticate before any emails can be sent. The sender will then be the logged in/authenticated user.

When using a non-authenticating SMTP server (common in enterprises where access to the SMTP server is limited to the internal network) the sender email address (and optionally name) has to be specified manually.

Example: `--test-email-from-address "User Anna <anna@company.com>"`
