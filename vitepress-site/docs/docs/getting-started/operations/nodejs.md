---
title: "Node.js app"
description: "Running Butler as a Node.js app."
---

# Node.js app

Running Butler as a Node.js app.

## Running Butler as Node.js app

If the Butler source code has been installed in `d:\tools\butler`, starting Butler as a Node.js app on Windows could look like this:

```bash
d:
cd \tools\butler\src
node butler.js -c .\config\dev.yaml
```

It is of course also possible to put those commands in a command file (.bat or .ps1 on Windows) file and execute that file instead.

::: warning
The -c/--configfile option is now mandatory in all run modes (standalone binary, Docker, and Node.js). You must point to a valid YAML config file, for example `-c .\config\dev.yaml`.
:::

The commands above assume there is a `d:\tools\butler\src\config` directory in which there is a YAML config file.

The command line options introduced in Butler 7.2 are available also when running Butler as a Node.js app.  
Use the `--help` command line option to show what options are available:

```powershell
PS D:\tools\butler\src> node butler.js --help
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
```

Looking at the above, you must use `--configfile` to specify which config file to use.

Similarly the `--loglevel` option can be used to control Butler's logging.

::: tip
Any option given on the command line will override the same setting in the config file
:::

## Windows services

On Windows you can use the excellent [Nssm](https://nssm.cc/) tool to make Node.js (and also the Butler app) run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic restarts etc).
