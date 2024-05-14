---
title: "Which config file to use"
linkTitle: "Which config file?"
weight: 10
description: >
  Butler can use multiple config files. Here you learn to control which one is used by Butler.
---

A description of the config file format is available [here](/docs/reference/config-file/).

## Select which config file to use

Butler uses configuration files in YAML format.

A default config file called `production_template.yaml` is included in the release Zip files on the [download page](https://github.com/ptarmiganlabs/butler/releases) (starting with version 9.3.0). It is also available in the [GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/src/config).

Make a copy of it, then rename the copy `default.yaml`, `production.yaml`, `staging.yaml` or something else suitable to your specific use case.  
Update it as needed (see the [config file reference page](/docs/reference/config-file/) for details).

Trying to run Butler with the default config file (the one on GitHub) will not work - you must adapt it to your server environment. For example, you need to enter the IP or host name of you Sense server(s), the IP or host name where Butler is running etc.

{{% alert title="All config entries are mandatory" color="warning" %}}
As of Butler 9.0 the config file's structure will be validated when Butler starts. If there are any errors (missing entries etc) in the config file, Butler will not start.

This means that all config file entries are mandatory. If some feature is not use the corresponding entry can be left empty.
{{% /alert %}}

Finally, Butler must somehow be given instructions about where to look for the config file.  
This can be done in several ways depending on how Butler is used, see below.

### Config file for stand-alone Butler

Let's run Butler on a Windows Server using PowerShell, without any options or parameters:

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

There is an option `--configfile` (or its short version `-c`) that let us control which config file to use.  
In this example the config file `.\config\butler-config.yaml` is used.  
Let's try again with the `-c` option:

```powershell
PS C:\tools\butler> dir


    Directory: C:\tools\butler


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        20/06/2022     16:27       68426646 butler.exe
-a----        20/06/2022     17:17          34762 butler-config.yaml


PS C:\tools\butler> .\butler.exe -c .\config\butler-config.yaml
2023-12-10T13:46:32.939Z info: Enabled API endpoints: [
  "apiListEnbledEndpoints",
  "base62ToBase16",
  "base16ToBase62",
  "butlerping",
  "createDir",
  "createDirQVD",
  "fileDelete",
  "fileMove",
  "fileCopy",
  "keyValueStore",
  "mqttPublishMessage",
  "postNewRelicMetric",
  "postNewRelicEvent",
...
...
```

Butler now starts nicely using the specified config file.

{{< notice tip >}}
When using the standalone Butler executables you can use an absolute or a relative path when specifying the location of the config file.

For example, `c:\tools\butler\config\butler-config.yaml` is an absolute path, while `.\config\butler-config.yaml` would be a relative path.
{{< /notice >}}

### Config file when running Butler as a Node.js app

When running Butler as a Node.js app, i.e. starting it with `node butler.js`, Butler will look for a config file in the `./config` subdirectory.

The name of the config file matters.  
Butler looks for an environment variable called “NODE_ENV” and then tries to load a config file named with the value found in NODE_ENV.

Example: `NODE_ENV=production`

Butler will look for a config file config/production.yaml.

### Config file when running Butler in a Docker container

The [template docker-compose.yaml](https://github.com/ptarmiganlabs/butler/blob/master/docs/docker-compose/docker-compose.yaml) file in the GitHub repository shows how to specify which config file that will be used:

```yaml
# docker-compose.yml
services:
  butler:
    image: ptarmiganlabs/butler:latest
    container_name: butler
    restart: always
    ports:
      - "8080:8080"       # REST API available on port 8180 to services outside the container
      - "9998:9998/udp"   # UDP port for task failure events
    volumes:
      # Make config file accessible outside of container
      - "./config:/nodeapp/config"
      - "./log:/nodeapp/log"
    environment:
      - "NODE_ENV=production"
    logging:
      driver: json-file
      options:
        max-file: "5"
        max-size: "5m"
```

Here the environment variable `NODE_ENV` is set to "production", and the host OS' `./config` directory is mapped to the container's `/nodeapp/config` directory.

As there is no `--configfile` command line option present the default setting will be used, which is to look for the config file in the `config` directory right under the directory where the `docker-compose.yaml` file is located.  
The file name is determined by Butler (running in the container) looking at the `NODE_ENV` env variable.

Bottom line is that the `./config/production.yaml` (relative to the location of `docker-compose.yaml`) file will be used.

## Running several Butler instances in parallel

If you have several Sense clusters (for example DEV, TEST and PROD environments) you may want to run several Butler instances.

The solution is to create several config files: `butler_dev.yaml`, `butler_test.yaml` and `butler_prod.yaml`.

In this scenario three instances of Butler should be started, each given a different config file via the `--configfile` command line option.

Note: If running several Butler instances in parallel, you must also ensure that each one uses unique port numbers for their respective REST APIs, UDP servers etc.

## Setting environment variables

The method for setting environment variables varies between operating systems:

On Windows: `set NODE_ENV=production`

Mac OS or Linux: `export NODE_ENV=production`

If using Docker, the NODE_ENV environment varible is set in the docker-compose.yml file (as already done in the [template docker-compose file](https://github.com/ptarmiganlabs/butler/blob/master/docs/docker-compose/docker-compose.yaml).)
