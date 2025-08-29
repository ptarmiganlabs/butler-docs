# Day 2 operations

Options for running Butler.

## Running Butler

How to start Butler varies depending on whether you run it as a standalone app, as a Docker container or as a Node.js app.

### Monitoring Butler

Once Butler is running it's a good idea to also monitor it. Otherwise you stand the risk of not getting notified if Butler for some reason misbehaves.

Butler logs its own memory usage to the console and log files (if enabled), but can also send these metrics to an InfluxDB database and New Relic.

Butler will log its own memory usage to InfluxDB if

1. The config file's `Butler.uptimeMonitor.enable` and `Butler.uptimeMonitor.storeInInfluxdb.enable` properties are both set to `true`.
2. The remaining InfluxDB properties of the config file are correctly configured.

Similarly, uptime metrics will be sent to New Relic if

1. The config file's `Butler.uptimeMonitor.enable` and `Butler.uptimeMonitor.storeNewRelic.enable` properties are both set to `true`.
2. The remaining New Relic properties of the config file are correctly configured.

Assuming everything is correctly set up, you can then create a Grafana dashboard showing Butler's memory use over time, using data from InfluxDB.
You can also set up alerts in Grafana if so desired, with notifications going to most IM tools and email.

A Grafana dashboard can look like this. Note that one of the available metrics (`external`) is not used in this particular dashboard. It's still logged to InfluxDB though.

![Butler memory usage in Grafana dashboard](/img/butler-memory-usage-grafana-1.png "Butler memory usage in Grafana dashboard")

There is a [sample Grafana dashboard](https://github.com/ptarmiganlabs/butler/tree/master/docs/grafana) in Butler's GitHub repo.

A New Relic graph covering the same information (but a different time range!) can look like this:

![Butler memory usage in Grafana dashboard](/img/butler-memory-usage-new-relic-1.png "Butler memory usage in Grafana dashboard")

## Running Butler as standalone, native app

Running Butler as a standalone app is in most cases the easiest way to use Butler. Pre-built executables are available for Windows, macOS and Linux.

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
➜  butler ./butler
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

## Running Butler in Docker

First configure the `docker-compose.yml` file as needed, then start the Docker container in interactive mode (with output sent to the screen).  
This is useful to ensure everything works as intended when first setting up Butler SOS.

```bash
docker-compose up
```

Once Butler has been verified to work as intended, hit `ctrl-c` to stop it.  
Then start Butler in daemon (background) mode:

```bash
docker-compose up -d
```

From here on the Docker environment will make sure Butler is always running, including restarting it if it for some reason stops.

::: tip
There is a [sample docker-compose.yaml file](https://github.com/ptarmiganlabs/butler/blob/master/docs/docker-compose/docker-compose.yaml) available in the [Butler repository](https://github.com/ptarmiganlabs/butler) over at GitHub.
:::

## Running Butler as Node.js app

If the Butler source code has been installed in `d:\tools\butler`, starting Butler as a Node.js app on Windows could look like this:

```bash
d:
cd \tools\butler\src
node butler.js
```

It is of course also possible to put those commands in a command file (.bat or .ps1 on Windows) file and execute that file instead.

The commands above assume there is a `d:\tools\butler\src\config` directory in which there is a YAML config file.  
The name of that config file should match the value set to the `NODE_ENV` environment variable.  
For example, if `NODE_ENV=dev` the config file should be `d:\tools\butler\src\config\dev.yaml`.

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

Looking at the above, it's actually possible to use the `--configfile` to specify which config file to use.

Similarly the `--loglevel` option can be used to control Butler's logging.

::: tip
Any option given on the command line will override the same setting in the config file
:::

### Windows services

On Windows you can use the excellent [Nssm](https://nssm.cc/) tool to make Node.js (and also the Butler app) run as a Windows Service, with all the benefits that follow (can be monitored using operations tools, automatic restarts etc).

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
