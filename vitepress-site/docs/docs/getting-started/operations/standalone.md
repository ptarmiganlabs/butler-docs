---
title: "Standalone app"
description: "Running Butler as a standalone app is in most cases the easiest way to use Butler. Pre-built executables are available for Windows, macOS and Linux."
---

# Standalone app

Running Butler as a standalone app is in most cases the easiest way to use Butler.  
Pre-built executables are available for Windows, macOS and Linux.

## Running Butler as standalone, native app

### Windows

Running standalone Butler on Windows Server 2016 looks like this:

```powershell
PS C:\tools\butler> .\butler.exe --help
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
  --no-qs-connection                   don't connect to Qlik Sense server at all. Run in isolated mode
  --api-rate-limit                     set the API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
  -h, --help                           display help for command
PS C:\tools\butler>
```

::: warning
The -c/--configfile option is now mandatory. Always provide a path to a valid Butler YAML config file when starting Butler.
:::

Adding the `--configfile` option and pointing it to a valid config file gives Butler everything needed to start.

All other options are optional.

```powershell
PS C:\tools\butler> dir


    Directory: C:\tools\butler


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       11/25/2023  11:58 PM                config
d-----       12/10/2023   2:46 PM                log
-a----        12/6/2023   8:31 PM       70614688 butler.exe


PS C:\tools\butler> .\butler.exe -c .\config\butler-config.yaml -l info
...
...
2023-12-10T21:35:39.447Z info: CONFIG: Influxdb enabled: true
2023-12-10T21:35:39.452Z info: CONFIG: Influxdb host IP: 10.11.12.13
2023-12-10T21:35:39.453Z info: CONFIG: Influxdb host port: 8086
2023-12-10T21:35:39.454Z info: CONFIG: Influxdb db name: butler
2023-12-10T21:35:39.722Z info: CONFIG: Found InfluxDB database: butler
2023-12-10T21:35:45.938Z info: --------------------------------------
2023-12-10T21:35:45.939Z info: Starting Butler
2023-12-10T21:35:45.942Z info: Log level      : info
2023-12-10T21:35:45.943Z info: App version    : 9.3.0
2023-12-10T21:35:45.944Z info: Instance ID    : f024dc47...
2023-12-10T21:35:45.945Z info:
2023-12-10T21:35:45.945Z info: Node version   : v18.5.0
2023-12-10T21:35:45.946Z info: Architecture   : x64
2023-12-10T21:35:45.947Z info: Platform       : Windows
2023-12-10T21:35:45.948Z info: Release        : 10.0.14393
2023-12-10T21:35:45.949Z info: Distro         : Microsoft Windows Server 2016 Standard
2023-12-10T21:35:45.949Z info: Codename       :
2023-12-10T21:35:45.950Z info: Virtual        : true
2023-12-10T21:35:45.951Z info: Processors     : 2
2023-12-10T21:35:45.955Z info: Physical cores : 4
2023-12-10T21:35:45.956Z info: Cores          : 8
2023-12-10T21:35:45.957Z info: Docker arch.   : undefined
2023-12-10T21:35:45.958Z info: Total memory   : 34359267328
2023-12-10T21:35:45.959Z info:
2023-12-10T21:35:45.959Z info: Config file    : C:/tools/butler/config/butler-config.yaml
2023-12-10T21:35:45.960Z info: API rate limit : 100
2023-12-10T21:35:45.961Z info: --------------------------------------
...
...
```

#### Windows services & process monitors

You can use the excellent [Nssm](https://nssm.cc/) tool to make Butler run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic start/restart etc).

A step-by-step tutorial for running Butler as a Windows service is available over at [ptarmiganlabs.com](https://ptarmiganlabs.com/running-butler-tools-as-windows-services/).

### macOS and Linux

Running the standalone Butler tool without any parameters gives you a help text that explains which commands and options are available:

```bash
➜  butler ./butler --help
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
  --no-qs-connection                   don't connect to Qlik Sense server at all. Run in isolated mode
  --api-rate-limit                     set the API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
  -h, --help                           display help for command
➜  butler
```

The available options are exactly the same as for Windows.

#### Services & process monitors

The exact way of auto-starting apps when a computer boots varies between different versions of macOS and Linux.  
If you want to do this Google is your friend.

That said, [PM2](https://github.com/Unitech/pm2) and [Forever](https://github.com/foreverjs/forever) are two process monitors that both have been successfully tested with Butler. These tools basically monitor what processes are running and restart them if they for some reason fail.

## Command line options

::: tip
Any option given on the command line will override the same setting in the config file
:::

### --version, -V

Shows Butler's version number.

### --configfile, -c

The `--configfile` option is a must-have as it's the only way to tell the standalone Butler executable where to find its config file.

### --loglevel, -l

The `--loglevel` option can be quite useful when you want to temporarily switch from the `info` level logging set in the config file, to a more detailed `verbose` or `debug` level logging while investigating some problem.

### --new-relic-account-name

A list of New Relic account names to which data can be sent from Butler.

The arguments to this option consists of one or more strings enclosed in single or double quotes (depending on which operating system is used), separated by a space.  
For example `--new-relic-account-name "First NR account" "Second NR account"`.

Note that the same number of arguments must be passed to all the command line options dealing with New Relic accounts!

### --new-relic-api-key

It's always better to store sensitive information in environment variable than in config files.

For that reason it's possible to provide the New Relic insert API keys (used when sending data to New Relic) via a command line option.  
It's then possible to pass in the New Relic API key via the command line rather than store it within the config file.

The arguments to this option consists of one or more strings enclosed in single or double quotes (depending on which operating system is used), separated by a space.  
For example `--new-relic-api-key "API key 1" "API key 2"`.

### --new-relic-account-id

Similar to the `--new-relic-api-key`, the account ID(s) used with New Relic can be provided as a command line option.

The arguments to this option consists of one or more strings enclosed in single or double quotes (depending on which operating system is used), separated by a space.  
For example `--new-relic-account-id "account ID 1" "account ID 2"`.

### --test-email-address

Used to send a test email to an email addresses. Can be used to confirm that the SMTP settings used when sending reload failed/aborted notification emails are working as intended.

Example: `--test-email-address joe@company.com`

### --test-email-from-address

Some SMTP servers, for example GMail, require you to authenticate before any emails can be sent. The sender will then be the logged in/authenticated user.

When using a non-authenticating SMTP server (common in enterprises where access to the SMTP server is limited to the internal network) the sender email address (and optionally name) has to be specified manually.

Example: `--test-email-from-address "User Anna <anna@company.com>"`

### --no-qs-connection

When running Butler in standalone mode it's possible to disable the connection to the Qlik Sense server.
This is used when Butler is executed to provide a Swagger/OpenAPI specification file for the Butler API, i.e. not for any production use-cases.

### --api-rate-limit

The `--api-rate-limit` option can be used to set the REST API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
