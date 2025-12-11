# Upgrade

Upgrading from one version of Butler to another is usually quite straightforward.

This page describes the upgrade process.

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

The versioning scheme used in Butler is described in the about section (coming soon).

::: warning
You should always upgrade to the latest available version.  
That version has the latest features, bug fixes and security patches.
:::

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

Some Butler versions include changes to the InfluxDB schema, meaning that you need to do some manual work in order to upgrade to the new schema.

The easiest way to do this is to delete the InfluxDB database used by Butler, then let Butler re-create it using the new schema.  
If the InfluxDB database specified in the Butler config file does not exist, Butler will automatically create it for you.

Deleting the InfluxDB database "senseops" can be done with a command similar to this:

```bash
influx --host <ip-where-influxdb-is-running> --port <influxdb-port-usually-8086>
drop database senseops
exit
```

### Upgrade checklist

::: info
Starting with Butler version 9.0 there is a check that the config file has the correct format.

This means that if you forget to add or change some setting in the main YAML config file, Butler will tell you what's missing and refuse to start.  
A consequence of this is that all settings are now mandatory, even if you don't use them.
:::

1. Make a backup of your YAML configuration file before upgrading. Just... do it.
2. Look at the [release notes](https://github.com/ptarmiganlabs/butler/releases) to get a general feeling for what is new and what has changed.  
   Those are the areas that may require changes in the config file.
3. Compare your existing main config file with the [template config file](https://raw.githubusercontent.com/ptarmiganlabs/butler/master/src/config/production_template.yaml) available on GitHub.  
   This comparison is a manual process and can be a bit tedious, but knowing your config file is really needed in order to make full and correct use of Butler.
   1. That file is also included in the Butler ZIP file available on the [download page](https://github.com/ptarmiganlabs/butler/releases).
   2. A more in-depth description of the config file is available in the Reference docs > Config file syntax section of the documentation (TODO).
4. The result of the comparison will show you what parts of the config file are new (for medium-sized upgrades) and which parts have changed in a significant way (for major upgrades).
5. Get the binaries for the new Butler version from the [download page](https://github.com/ptarmiganlabs/butler/releases).
6. Start the new Butler version and let it run for a few minutes.
   1. Review the console logs (or the log files) to make sure there are no warnings or errors.
   2. If there are warnings or errors it can be helpful to start Butler with more verbose logging.  
      Adding `--log-level verbose` or even `--log-level debug` will give you more details on what Butler is doing and what might be causing the problems you are experiencing.

## Version-Specific Upgrade Notes

### Upgrading to Butler 15.0.0

Butler 15.0.0 is a major release with significant new features for task monitoring and alerting. This version expands InfluxDB and email support to cover all Qlik Sense task types.

#### Breaking Changes

This release includes breaking changes that require configuration file updates:

1. **New InfluxDB configuration sections** - If you use InfluxDB for task monitoring, you must add the following new sections to your config file under `Butler.influxDb`:

   - `userSyncTaskSuccess` - Store successful user sync tasks in InfluxDB
   - `userSyncTaskFailure` - Store failed user sync tasks in InfluxDB
   - `externalProgramTaskSuccess` - Store successful external program tasks in InfluxDB
   - `externalProgramTaskFailure` - Store failed external program tasks in InfluxDB
   - `distributeTaskSuccess` - Store successful distribution tasks in InfluxDB
   - `distributeTaskFailure` - Store failed distribution tasks in InfluxDB
   - `preloadTaskSuccess` - Store successful preload tasks in InfluxDB
   - `preloadTaskFailure` - Store failed preload tasks in InfluxDB

2. **New email notification sections** - If you use email notifications, you must add these new sections under `Butler.emailNotification`:

   - `distributeTaskSuccess` - Email alerts for successful distribution tasks
   - `distributeTaskFailure` - Email alerts for failed distribution tasks
   - `preloadTaskSuccess` - Email alerts for successful preload tasks
   - `preloadTaskFailure` - Email alerts for failed preload tasks

3. **Reload task success emails** - New settings for including script log excerpts in reload success emails:
   - `Butler.emailNotification.reloadTaskSuccess.headScriptLogLines` - Lines from start of script log
   - `Butler.emailNotification.reloadTaskSuccess.tailScriptLogLines` - Lines from end of script log

#### InfluxDB Schema Changes

Butler 15.0.0 introduces new InfluxDB measurements for all task types. If upgrading from an earlier version, you may need to recreate your InfluxDB database to accommodate the new schema:

```bash
influx --host <influxdb-host> --port 8086
drop database butler
exit
```

Butler will automatically recreate the database with the new measurements on startup.

New InfluxDB measurements in 15.0.0:

- `user_sync_task_success` / `user_sync_task_failed`
- `external_program_task_success` / `external_program_task_failed`
- `distribute_task_success` / `distribute_task_failed`
- `preload_task_success` / `preload_task_failed`

#### XML Log Appender Updates

If you use Butler's UDP-based task failure/success detection, you must update your Qlik Sense log appender configuration (`LocalLogConfig.xml`) to support preload task detection.

Add these filters to the `TaskFailLogger` appender:

```xml
<!-- Preload tasks may have either of these log messages when failing -->
<filter type="log4net.Filter.StringMatchFilter">
    <param name="stringToMatch" value="Failed to start session" />
</filter>
<filter type="log4net.Filter.StringMatchFilter">
    <param name="stringToMatch" value="Could not reserve an executor for task" />
</filter>
```

See the [log appender setup documentation](/docs/getting-started/setup/task-alerts/#setting-up-the-log-appender) for complete configuration examples.

#### New Email Template Files

Butler 15.0.0 includes new email template files for distribution and preload tasks:

- `failed-distribute-qseow.handlebars`
- `success-distribute-qseow.handlebars`
- `failed-preload-qseow.handlebars`
- `success-preload-qseow.handlebars`

These template files are included in the Butler distribution and should be placed in your email templates directory.

#### Bug Fixes and Improvements

- **Certificate loading fix**: The `--no-qs-connection` command line option now correctly skips loading Qlik Sense API certificates. This is useful when running Butler in isolated mode without Qlik Sense connectivity.

- **Improved stability**: Added global unhandled rejection handler and comprehensive async error handling to prevent Butler crashes from unhandled promise rejections, particularly when processing External Program Task completions.

- **Hostname validation**: Added hostname validation for Windows service monitoring to provide clearer error messages when service hosts are misconfigured.

- **Config validation**: More informative logging when the configuration file is invalid, making it easier to identify and fix configuration issues.

#### Upgrade Steps for 15.0.0

1. Back up your existing configuration file
2. Download Butler 15.0.0 from the [releases page](https://github.com/ptarmiganlabs/butler/releases)
3. Compare your config file with the [template config file](https://github.com/ptarmiganlabs/butler/blob/master/src/config/production_template.yaml)
4. Add all new required sections (see Breaking Changes above)
5. Update your Qlik Sense `LocalLogConfig.xml` if using task failure detection
6. Copy new email template files to your templates directory
7. (Optional) Drop and recreate your InfluxDB database if using InfluxDB
8. Stop the old Butler process
9. Start Butler 15.0.0 and verify operation in logs

## Finally: When things aren't working - check the logs

By far the most common problem when upgrading to a new Butler version (or doing a fresh install) is an incorrect config file.

> If some feature in the config file is disabled, its associated settings **are not** mandatory and will not be checked/verified.  
> If a feature is enabled, its associated settings **are** mandatory.

Butler is pretty good at figuring out what is wrong with the config file, but there may be cases where it's not obvious what is wrong.

Thus, double check your config file, then triple check it.

Then start Butler and read the logs carefully.  
If you need more details, start Butler with the `--log-level verbose` or even `--log-level debug` options to get more details on what's going on.

If things still don't work you can post a question in the [Butler forums](https://github.com/ptarmiganlabs/butler/discussions/categories/q-a).

By sharing your installation and upgrade challenges/issues you enable future improvements, which will benefit both yourself and others.
