---
title: "Upgrade"
linkTitle: "Upgrade"
weight: 50
description: >
  Upgrading from one version of Butler to another is usually quite straightforward.  
    
  This page describes the upgrade process.
---

## First: Don't panic

Upgrading Butler is usually a smooth process:

- Get the new version from the assets section on the [download page](https://github.com/ptarmiganlabs/butler/releases). Extract the ZIP file.
- Back up your existing Butler configuration file.
- Edit the configuration file to match the new version's requirements.
- Stop the Butler process/service.
- Replace the Butler binary with the new version.
- Start the process/service.
- Verify that Butler is running as expected.
- 🥳 Celebrate!

## Then: The details

### Version number hints

Different kind of upgrades (usually) result in different levels on modifications needed in the main config file.

- "Small" Butler upgrades move from one patch version to another, without changing the feature version.  
  Example: Upgrading from 7.3.0 > 7.3.4.
- "Medium" upgrades involves moving from one minor version to another, without changing the major version.
  Example: Upgrading from 7.2.3 > 7.3.0
- "Major" upgrades is when you move to a new major version.
  Example: 7.4.2 > 8.0.0

The versioning scheme used in Butler is described [here](/docs/about/versioning/).

{{< notice warning >}}
You should always upgrade to the latest available version.  
That version has the latest features, bug fixes and security patches.
{{< /notice >}}

#### Minor upgrades

The new release includes bug fixes, security patches, minor updates to documentation etc - but no new features.

In theory there should never be any changes to the config files when doing a minor upgrade.

#### Medium upgrades

This scenario means that new features are added to Butler.  
Usually there are also various bug fixes included.

Most new features need to be configured somehow, meaning that medium upgrades usually require modification to the config files.  
The most common change by far is that it's the main config file that needs to be modified, but a new scheduler related feature could for example mean that the scheduler config file must be modified too.

The changes needed to the config files are _usually_ additive in nature, i.e. some settings must be added to the config file, but the existing settings and general structure of the file remain the same.

#### Major upgrades

This scenario involves breaking changes of some kind.

These almost certainly require changes to the config files, sometimes even significant ones in the sense that the structure of the config file may have changed.

If **very** major rework has been done to Butler, this may also motivate a major version bump.

### Know your config file

Butler is entirely driven by its configuration files, with the [main YAML config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/production_template.yaml) being the most important one.  
There are other config files too, containing for example scheduling information.

### InfluxDB considerations

Some versions include changes to the InfluxDB schema, meaning that you need to do some manual work in order to upgrade to the new schema.

The easiest way to do this is to delete the InfluxDB database used by Butler, then let Butler re-create it using the new schema.  
If the InfluxDB database specified in the Butler config file does not exist, Butler will automatically create it for you.

Deleting the InfluxDB database "senseops" can be done with a command similar to this:

```bash
influx --host <ip-where-influxdb-is-running> --port <influxdb-port-usually-8086>
drop database senseops
exit
```

### Upgrade checklist

{{< notice info >}}
Starting with Butler version 9.0 there is a check that the config file has the correct format.

This means that if you forget to add or change some setting in the main YAML config file, Butler will tell you what's missing and refuse to start.  
A consequence of this is that all settings are now mandatory, even if you don't use them.
{{< /notice >}}

1. Make a backup of your YAML configuration file before upgrading. Just... do it.
2. Look at the [release notes](https://github.com/ptarmiganlabs/butler/releases) to get a general feeling for what is new and what has changed.  
   Those are the areas that may require changes in the config file.
3. Compare your existing main config file with the [template config file](https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/config/production_template.yaml) available on GitHub.  
   This comparison is a manual process and can be a bit tedious, but knowing your config file is really needed in order to make full and correct use of Butler.
   1. That file is also included in the Butler ZIP file available on the [download page](https://github.com/ptarmiganlabs/butler/releases).
   2. A more in-depth description of the config file is available in the [Reference docs > Config file syntax](/docs/reference/config-file/) section of the documentation.
4. The result of the comparison will show you what parts of the config file are new (for medium-sized upgrades) and which parts have changed in a significant way (for major upgrades).
5. Get the binaries for the new Butler version from the [download page](https://github.com/ptarmiganlabs/butler/releases).
6. Start the new Butler version and let it run for a few minutes.
   1. Review the console logs (or the log files) to make sure there are no warnings or errors.
   2. If there are warnings or errors it can be helpful to start Butler with more verbose logging.  
      Adding `--log-level verbose` or even `--log-level debug` will give you more details on what Butler is doing and what might be causing the problems you are experiencing.

## Finally: When things aren't working - check the logs

By far the most common problem when upgrading to a new Butler version (or doing a fresh install) is an incorrect config file.

All config entries are mandatory, even if you don't use them.  
This may seem a bit harsh, but this way Butler can tell you exactly what is missing in the config file.

Butler is pretty good at figuring out what is wrong with the config file, but there may be cases where it's not obvious what is wrong.

Thus, double check your config file, then triple check it.

Then start Butler and read the logs carefully.  
If you need more details, start Butler with the `--log-level verbose` or even `--log-level debug` options to get more details on what's going on.

If things still don't work you can post a question in the [Butler forums](https://github.com/ptarmiganlabs/butler/discussions/categories/q-a).

By sharing your installation and upgrade challenges/issues you enable future improvements, which will benefit both yourself and others.
