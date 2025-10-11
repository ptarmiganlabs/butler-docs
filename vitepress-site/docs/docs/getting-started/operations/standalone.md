---
title: "Standalone app"
description: "Running Butler as a standalone app is in most cases the easiest way to use Butler. Pre-built executables are available for Windows, macOS and Linux."
---

# Standalone app

Running Butler as a standalone app is in most cases the easiest way to use Butler.  
Pre-built executables are available for Windows, macOS and Linux.

## Running Butler as standalone, native app

### Windows

Running standalone Butler on Windows Server looks like this:

```powershell
PS C:\tools\butler> .\butler.exe --help
Running as standalone app. Executable path: D:/tools/insider-build/butler
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version                        output the version number
  -c, --configfile <file>              path to config file (REQUIRED)
  -l, --loglevel <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-account-name  <name...>  New Relic account name. Used within Butler to differentiate between different target New Relic accounts
  --new-relic-api-key <key...>         insert API key to use with New Relic
  --new-relic-account-id <id...>       New Relic account ID
  --test-email-address <address>       send test email to this address. Used to verify email settings in the config file.
  --test-email-from-address <address>  send test email from this address. Only relevant when SMTP server allows from address to be set.
  --no-qs-connection                   don't connect to Qlik Sense server at all. Run in isolated mode
  --api-rate-limit                     set the API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
  --skip-config-verification           Disable config file verification (default: false)
  -h, --help                           display help for command

Configuration File:
  Butler requires a configuration file to run. You must specify one using the -c option.

  Example config files are included in the distribution ZIP file, as well as online at:
    https://github.com/ptarmiganlabs/butler/tree/master/src/config


  For more information visit: https://butler.ptarmiganlabs.com
PS C:\tools\butler>
```

::: warning
The -c/--configfile option is now mandatory. Always provide a path to a valid Butler YAML config file when starting Butler.
:::

Adding the `--configfile` option and pointing it to a valid config file gives Butler everything needed to start.

All other options are optional.

```powershell
PS C:\tools\butler> .\butler.exe -c .\config\butler-config.yaml --loglevel info
...
...
2025-10-11T16:41:06.448Z info: Enabled API endpoints: []
2025-10-11T16:41:11.650Z info: CONFIG: Influxdb enabled: false
2025-10-11T16:41:13.199Z info: VERIFY CONFIG FILE: Your config file at D:/tools/insider-build/butler/config/config-insider-build.yaml is valid, good work!
2025-10-11T16:41:13.201Z info: MAIN: Config file structure is correct - all good.
2025-10-11T16:41:13.210Z info: MAIN: Application-specific config validation passed - all good.
2025-10-11T16:41:13.212Z info: MAIN: Conditional config validation passed - all good.
2025-10-11T16:41:13.213Z info: MAIN: Config file contains required email data - all good.
2025-10-11T16:41:13.220Z info: MAIN: Config file contains required New Relic data - all good.
2025-10-11T16:41:13.222Z info: MAIN: Config file contains required InfluxDb data - all good.
2025-10-11T16:41:13.226Z info: MAIN: Config file contains required Qlik Sense data - all good.
2025-10-11T16:41:13.227Z info: START: Globals initialised - all good.
2025-10-11T16:41:13.255Z info: CONFIG: InfluxDB disabled, not connecting to InfluxDB
2025-10-11T16:41:18.770Z info: --------------------------------------
2025-10-11T16:41:18.770Z info: Starting Butler
2025-10-11T16:41:18.778Z info: Log level         : info
2025-10-11T16:41:18.779Z info: App version       : 14.2.0
2025-10-11T16:41:18.780Z info: Instance ID       : b7ab7b35...
2025-10-11T16:41:18.781Z info: Running in Docker : false
2025-10-11T16:41:18.782Z info:
2025-10-11T16:41:18.783Z info: Node version      : v23.1.0
2025-10-11T16:41:18.784Z info: Architecture      : x64
2025-10-11T16:41:18.785Z info: Platform          : Windows
2025-10-11T16:41:18.786Z info: Release           : 10.0.17763
2025-10-11T16:41:18.787Z info: Distro            : Microsoft Windows Server 2019 Standard
2025-10-11T16:41:18.788Z info: Codename          :
2025-10-11T16:41:18.789Z info: Virtual           : true
2025-10-11T16:41:18.799Z info: Processors        : 1
2025-10-11T16:41:18.800Z info: Physical cores    : 8
2025-10-11T16:41:18.801Z info: Cores             : 8
2025-10-11T16:41:18.802Z info: Total memory      : 51539017728
2025-10-11T16:41:18.803Z info:
2025-10-11T16:41:18.804Z info: Config file       : C:/tools/butler/config/butler-config.yaml
2025-10-11T16:41:18.805Z info: API rate limit    : 100 calls per minute
2025-10-11T16:41:18.806Z info: --------------------------------------
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
Running as standalone app. Executable path: D:/tools/insider-build/butler
Usage: butler [options]

Butler gives superpowers to client-managed Qlik Sense Enterprise on Windows!
Advanced reload failure alerts, task scheduler, key-value store, file system access and much more.

Options:
  -V, --version                        output the version number
  -c, --configfile <file>              path to config file (REQUIRED)
  -l, --loglevel <level>               log level (choices: "error", "warn", "info", "verbose", "debug", "silly")
  --new-relic-account-name  <name...>  New Relic account name. Used within Butler to differentiate between different target New Relic accounts
  --new-relic-api-key <key...>         insert API key to use with New Relic
  --new-relic-account-id <id...>       New Relic account ID
  --test-email-address <address>       send test email to this address. Used to verify email settings in the config file.
  --test-email-from-address <address>  send test email from this address. Only relevant when SMTP server allows from address to be set.
  --no-qs-connection                   don't connect to Qlik Sense server at all. Run in isolated mode
  --api-rate-limit                     set the API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
  --skip-config-verification           Disable config file verification (default: false)
  -h, --help                           display help for command

Configuration File:
  Butler requires a configuration file to run. You must specify one using the -c option.

  Example config files are included in the distribution ZIP file, as well as online at:
    https://github.com/ptarmiganlabs/butler/tree/master/src/config


  For more information visit: https://butler.ptarmiganlabs.com
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

### --skip-config-verification

The `--skip-config-verification` option can be used to disable config file verification. By default config file verification is enabled and Butler will refuse to start if the config file is not valid.

### --api-rate-limit

The `--api-rate-limit` option can be used to set the REST API rate limit, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.
