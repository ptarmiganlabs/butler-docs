---
title: "Command line options"
linkTitle: "Command line options"
weight: 5
description: >
  Description of Butler's command line options.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Command line options

When starting Butler, you can pass command line options to customize its behavior.  
Looks like this:

```shell
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
  --skip-config-verification           Disable config file verification (default: false)
  -h, --help                           display help for command
```

## -V, --version

Output the version number of Butler.

## -c, --configfile

Specifies the configuration file to use.

Valid values: A path to a configuration file.

Default: Whatever is specified in the `NODE_ENV` environment variable, with a .yaml extension added. Butler will look for that file in the `./config` directory.

Example:

- `-c` or `--configfile` are not specified. `NODE_ENV` is set to `production`. Butler will try to read settings from `./config/production.yaml`.

## -l, --loglevel

Specifies the log level to use.  
When set, this overrides the log level specified in the configuration file.

Valid values: 'error', 'warn', 'info', 'verbose', 'debug', 'silly'

Default: 'info'

## New Relic related options

When using New Relic as backend for storing logs, information about failed reloads etc, you can specify New Relic credentials in the config file - but that is not ideal from a security perspective.

To avoid that, you can specify the New Relic credentials on the command line using the following options.

### --new-relic-account-name

List of New Relic account names. Used within Butler to differentiate between different target New Relic accounts to which data can be sent. This name has nothing to do with the account name used in New Relic - it's purely for Butler's internal use.  
Specifically, it's at multiple places in the config file where you can specificy to which New Relic account to send data.

Enclose account names in quotes if they contain spaces.  
Separate multiple account names with a space.

Example: `--new-relic-account-name "Account 1" "Account 2"`

### --new-relic-api-key

List of New Relic API keys. Used to authenticate with New Relic.

Enclose API keys in quotes if they contain spaces.
Separate multiple API keys with a space. Note that the order of the API keys must match the order of the account names, i.e. the first API key corresponds to the first account name, the second API key corresponds to the second account name, and so on.

Example: `--new-relic-api-key "API key 1" "API key 2"`

### --new-relic-account-id

List of New Relic account IDs. Used to identify the New Relic account to which data should be sent.

Enclose account IDs in quotes if they contain spaces.
Separate multiple account IDs with a space. Note that the order of the account IDs must match the order of the account names, i.e. the first account ID corresponds to the first account name, the second account ID corresponds to the second account name, and so on.

## Send test email

Butler has several alerting features for sending emails when some event happens (typoically something failing...) in Sense.

To verify that the email settings in the config file are correct, you can send a test email using the following options.

### --test-email-address

Send a test email to this address, using the SMTP configuration in the config file.  
Used to verify email settings in the config file.

This is the destination address for the test email.

### --test-email-from-address

Send a test email to this address, using the SMTP configuration in the config file.  
Used to verify email settings in the config file.

This is the sender address for the test email. Only relevant when the SMTP server allows the from address to be set.

## --no-qs-connection

Don't connect to Qlik Sense server at all. Run in isolated mode.

This is probably only relevant when you're developing Butler and don't have a Qlik Sense server available, or when you want to automatically exporting the API docs for Butler's REST API (this is done during the build process).

## --api-rate-limit

Set the rate limit of Butler's REST API, per minute. Default is 100 calls/minute. Set to 0 to disable rate limiting.

Useful when you want to ensure that Butler (or the server it runs on) doesn't get overloaded with requests.

## --skip-config-verification

Disable config file verification.

By default, Butler verifies the config file when it starts. If the config file is invalid, Butler will log an error and exit.  
Use this option to disable config file verification.

## -h, --help

Display help for command.
