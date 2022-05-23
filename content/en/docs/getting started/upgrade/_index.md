---
title: "Upgrade"
linkTitle: "Upgrade"
weight: 50
description: >
  Upgrading from one version of Butler to another is usually quite straightforward.  
    
  This page describes the upgrade process. 
---

## The upgrade process

Butler is entirely driven by its configuration files, with the [main YAML config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/production_template.yaml) being the most important one.  
There are other config files too, containing for example scheduling information.

Different kind of upgrades usually result in different levels on modifications needed in the main config file.

* "Small" Butler upgrades mean moving from one patch verison to another, without changing the feature version.  
  Example: Upgrading from 7.3.0 > 7.3.4.
* "Medium" upgrades involves moving from one minor version to another, without changing the major version.
  Example: Upgrading from 7.2.3 > 7.3.0
* "Major" upgrades is when you move to a new major version.
  Example: 7.4.2 > 8.0.0

The versioning scheme used in Butler is described [here](/docs/about/versioning/).

{{< notice warning >}}
You should always upgrade to the latest available version.  
That version has the latest features, bug fixes and security patches.

Upgrading to an older version - or a pre-release version - means a higher risk for security concerns, not yet fully tested features etc.
{{< /notice >}}

### Minor upgrades

This scenario rarely require any changes to Butler's configuration.  
The new release includes bug fixes, security patches, minor updates to documentation etc - but no new features.

In theory there should never be any updates needed to the config files when doing a minor upgrade.

### Medium upgrades

This scenario means that new features are added to Butler.  
Usually there are also various bug fixes included.

Most new features need to be configured somehow, meaning that medium upgrades usually require modification to the config files.  
By far the most common is that it's the main config that needs to be modified, but a new scheduler related feature could for example mean that the scheduler config file must be modified too.

The changes needed to the config files are usually additive in nature, i.e. some settings must be added to the config file, but the existing settings and general structure of the file remain the same.

### Major upgrades

This scneario involves breaking changes of some kind.  
These almost certainly require changes to the config files, sometimes even significant ones in the sense that the structure of the config file *may* have changed.

## Upgrade checklist

1. Look at the [release notes](/docs) to get a general feeling for what is new and what has changed.  
  Those are the areas tha may require changes in the config file. 
2. Compare your existing main config file with the [template config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/production_template.yaml) available on GitHub.  
  This comparison is a manual process and can be a bit tedious, but knowing your config file is really needed in order to make full and correct use of Butler.  
3. The result of the comparison will show you what parts of the config file are new (for medium-sized upgrades) and which parts have changed in a significant way (for major upgrades).
4. Get the binaries for the new Butler version from the [download page](https://github.com/ptarmiganlabs/butler/releases).
5. Start the new Butler version and let it run for a few minutes.
   1. Review the console logs (or the log files) to make sure there are no warnings or errors.
   2. If there are warnings or errors it can be helpful to start Butler with more verbose logging.  
      Adding `--log-level verbose` or even `--log-level debug` will give you more details on what Butler is doing and what might be causing the problems you are experiencing.

## When things aren't working

By far the most common problem when upgrading to a new Butler version (or doing a fresh install) is an incorrect config file.

Thus, double check your config file, then triple check it.

If things still aren't working you can post a question in the [Butler forums](https://github.com/ptarmiganlabs/butler/discussions/categories/q-a).  
By sharing your installation and upgrade challenges/issues you enable future improvements, which will benefit both yourself and others.
