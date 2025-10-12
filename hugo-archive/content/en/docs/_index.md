---
title: "Documentation"
linkTitle: "Documentation"
weight: 20
# menu:
#   main:
#     weight: 20
---

{{< notice tip >}}
Upgrading from an earlier version of Butler?

General guidance on how to do this is found [here](/docs/getting-started/upgrade/).
{{< /notice >}}

{{% pageinfo %}}

{{< notice tip >}}
Starting with version 11.2, the [GitHub releases page](https://github.com/ptarmiganlabs/butler/releases) is the place where release notes are found.
{{< /notice >}}

## Release highlights

### What's new in version 11.1.0

_🚀 Features_

- **license**: Monitor high level Qlik Sense license usage across different license types.
- **license**: Scheduled removal of unused user Qlik Sense licenses.

_🐛 Bug Fixes_

- **config**: Better, more complete check of config when starting Butler.
- **reload failed**: Make handling of reload failed/aborted/succeeded messages more robust.
- **startup**: Remove Node.js warnings on Butler startup.
- **startup**: More consistent logging during startup.
- **startup**: Tidy up formatting of startup info written to logs.

_👉 Miscellaneous_

Optimize GH Actions for building binaries.
Remove udp client from Butler project, move to its own repo.
Sign Win binaries with new signing solution.
Update dependencies.

### What's new in version 11.0.2

This is a maintenance release used to test the automatic building of Butler binaries, Docker images etc.
No new features or bug fixes were added in this version.

### What's new in version 11.0.1

This is a maintenance release used to test the automatic building of Butler binaries, Docker images etc.
No new features or bug fixes were added in this version.

### What's new in version 11.0.0

Focus of this release is to modernize the Butler code base.  
No new features, but a lot of work has been done to make Butler more robust and easier to maintain in the future.

_🐛 Bug Fixes_

- **docker**: Correctly report Docker status (72e1087), closes #939
- **general**: Make path resolution for QIX schema files more robust (568aa2e)
- **mqtt**: Better logging and check for cert existence (59dc4fa)
- **webhook**: Deal with empty webhook list wo errors (3f42d02), closes #944
- **winsvc**: Win service monitoring no longer rely on New Relic (e47124c), closes #967

### What's new in version 9.4.0

_🚀 Features_

- **influxdb:** Add Butler version tag to uptime data sent to InfluxDb.

_🐛 Bug Fixes_

- **winsvc:** Improve Winsvc checking efficiency

### What's new in version 9.3.2

⚙️ This release address several bugs related to Windows service monitoring.
Long story short - this should work a lot better now compared to previous versions.

🎉 A bonus is that the Windows service monitoring is significantly faster than before.
For example, if you monitor 5 services on a server, Butler's monitoring code now executes ca 5 times faster than before!

_🐛 Bug Fixes_

- **mqtt:** Don't show MQTT startup info when MQTT is disabled.
- **winsvc:** Bug fixes and better logging for win service monitoring.
- **winsvc:** Make Windows service status checks quicker.

_Miscellaneous_

- **deps:** Update dependencies to stay safe & secure.

### What's new in version 9.3.1

_Bug Fixes_

- **mqtt:** More robust startup code for MQTT & Win svc monitoring.
- **winsvc:** Don't send Win svc alerts when Butler starts.

_Refactoring_

- **logging:** More consistent log prefixes.

### What's new in version 9.3.0

_Features_

- **influxdb:** Store failed reload info in InfluxDB.
- **mqtt:** Add support for Azure Event Grid as MQTT broker.
- **influxdb:** Store reload task success info in InfluxDB.

_Bug Fixes_

- Disable SMTP mail appender in sample config.
- More robust generation of anonymous Butler instance id.
- **mqtt:** Better error handling when establishing MQTT connection.
- Verify that all required config file entries exist.
- **winservice:** Better handling of services that don't exist.

_Miscellaneous_

- Add sample config files to release ZIPs.

### What's new in version 9.2.0

_Features_

- **reload-alerts:** Make app owner info available in reload failed alerts.

### What's new in version 9.1.0

_Features_

- **scrip logs:** Only get failed-reload script logs once from Sense server.
- **telemetry:** Change to using PostHog for telemetry collection.

### What's new in version 9.0.0

#### ⚠ BREAKING CHANGES

- Move InfluxDB settings to their own section in config file

_Features_

- Add InfluxDB as destination for Windows service status monitoring
- Add monitoring of Windows services
- Log at startup current API rate limit
- Log at startup which config file is used
- Log warnings when API rate limits exceeded
- Move InfluxDB settings to their own section in config file
- New command line option for setting API rate limit
- Verify structure of config file on Butler startup

_Bug Fixes_

- Add missing fields to template config file
- Only initiate InfluxDB connection if it's actually enabled in config file
- Only set up REST server if it's actually enabled in the config file

_Other_

- deps: Update dependencies to stay safe & secure
- Update Docker image to use Node.js v20

### What's new in version 8.6.2

_Other_

- deps: Update dependencies to stay safe & secure

### What's new in version 8.6.1

_Bug Fixes_

- Allow empty New Relic settings in config file's uptime section
- Allow uptime reporting to New Relic without custom http headers
- Better log messages when rate limiting for reload notifications passes
- Config asset errors when starting Butler without any New Relic accounts specified
- Improve warning when custom property names in config file don't exist in Sense
- Only send to New Relic if event/log is enabled AND custom property name specified.
- Upgrade Swagger docs to latest version

_Other_

- deps: Update dependencies to stay safe & secure

### What's new in version 8.6.0

_Features_

- Add virus/malware scanning of standalone binaries during build,
- Sign Windows binaries during build

_Other_

- deps: Update dependencies to stay safe & secure

### What's new in version 8.5.3

_Other_

- Update dependencies

### What's new in version 8.5.2

_Bug Fixes_

- Handle startup error messages without... errors
- Improved startup checks of custom properties handling New Relic destinations
- Incorrect error messages in config assert module

_Other_

- deps: Updated dependencies to stay safe and secure

### What's new in version 8.5.1

_Bug Fixes_

- New Relic CLI options now work again

_Other_

- deps: Updated dependencies to stay safe and secure

### What's new in version 8.5.0

This release enhances the integration between Butler and the New Relic SaaS monitoring platform.

Specifically, it's now possible to control per reload task which New Relic account failed/aborted task notifications should be sent to.
The destination New Relic account(s) (where failed reload events/log entries are sent) is set via custom properties on the reload tasks.

Failed and aborted tasks can be sent to New Relic as events or log entries, or both.
Zero, one or more New Relic accounts can be defined in the Butler config file.

_Features_

- new-relic: Allow per-reload-task control of to which New Relic account failed/aborted reload alerts are sent
- Add new command line option --no-qs-connection. Used when no connection to Sense should be done, for example when generating API docs

_Bug Fixes_

- scriptlog: Increase timeout when getting script logs
- scriptlog: More descriptive messages when script log retrieval fails

_Other_

- deps: Update dependencies to latest versions

### What's new in version 8.4.2

_Bug Fixes_

- Add building of Linux binaries to build pipeline

### What's new in version 8.4.1

_Bug Fixes_

- Properly store demo apps in GitHub

### What's new in version 8.4.0

_Features_

- Make file copy/move/delete REST endpoints more robust
- Warn if UNC paths are used with file API calls, when Butler runs on non-Windows OS

_Bug Fixes_

- Make startup logging of approved directories for file copy/move/delete less verbose

_Other_

- Update dependencies

### What's new in version 8.3.3

_Bug Fixes_

- API endpoint /v4/schedules/status now respects enable/disable in config file [#509](https://github.com/ptarmiganlabs/butler/issues/509)
- Incorrect return value from base conversion API endpoint [#508](https://github.com/ptarmiganlabs/butler/issues/508)

_Other_

- Migrate to Fastify 4 [#510](https://github.com/ptarmiganlabs/butler/issues/510)
- Upgrade internal API docs to use OpenAPI 3.x [#511](https://github.com/ptarmiganlabs/butler/issues/511)

### What's new in version 8.3.2

_Bug Fixes_

- Update template config file wrt sending data to multiple New Relic accounts [#505](https://github.com/ptarmiganlabs/butler/issues/505)

### What's new in version 8.3.1

_Bug Fixes_

- Add missing API endpoint docs to HTML/YAML/JSON API documents [#502](https://github.com/ptarmiganlabs/butler/issues/502)
- Fix broken macOS build

### What's new in version 8.3.0

NOTE: There is no macOS binary for this version.

_Features_

- Send Butler metrics and failed/aborted reloads as New Relic events and/or logs to zero, one or more New Relic accounts [#489](https://github.com/ptarmiganlabs/butler/issues/489)

_Other_

- Enforce code style across all files [#497](https://github.com/ptarmiganlabs/butler/issues/497)
- Update dependencies

### What's new in version 8.2.0

_Features_

- Add failed/aborted reload task and app tags as metadata for New Relic events and logs [#479](https://github.com/ptarmiganlabs/butler/issues/479)
- Add optional "from" option when sending test email [#486](https://github.com/ptarmiganlabs/butler/issues/486)

_Bug fixes_

- Add better debug logging around which email addresses are used when sending alert emails [#487](https://github.com/ptarmiganlabs/butler/issues/487)
- Back slash in script log breaks Slack and Teams messages [#485](https://github.com/ptarmiganlabs/butler/issues/485)
- Better debug logging when posting data to New Relic

_Other_

- **deps:** Updated dependencies

### What's new in version 8.1.0

_Features_

- API endpoint for sending events to New Relic [#441](https://github.com/ptarmiganlabs/butler/issues/441)

_Bug fixes_

- Incorrect New Relic API url used when posting metrics via Butler's REST API [#468](https://github.com/ptarmiganlabs/butler/issues/468)
- No more errors when empty New Relic metrics attribute/header arrays in config file [#467](https://github.com/ptarmiganlabs/butler/issues/467)

### What's new in version 8.0.1

_Bug fixes_

- Empty attribute arrays in New Relic config no longer cause errors [#640](https://github.com/ptarmiganlabs/butler/issues/464)

### What's new in version 8.0.0

**⚠️ Breaking changes**

- Forward script logs for failed and aborted reloads to New Relic.  
  This required a change in structure/format of Butler's config file [#460](https://github.com/ptarmiganlabs/butler/issues/460)

_Features_

- Command line option for sending test email [#430](https://github.com/ptarmiganlabs/butler/issues/430)

_Bug fixes_

- Update dependencies to stay sharp and secure.

### What's new in version 7.5.1

_Bug fixes_

- Disable sending alerts to New Relic in sample config file [#452](https://github.com/ptarmiganlabs/butler/issues/452)
- Disable API-generate-doc setting in sample config file [#455](https://github.com/ptarmiganlabs/butler/issues/455)

### What's new in version 7.5

_Features_

- Automatic creation of API docs as part of CI pipeline [#444](https://github.com/ptarmiganlabs/butler/issues/385), [#355](https://github.com/ptarmiganlabs/butler/discussions/444)

### What's new in version 7.4

_Features_

- Enable/disable alert emails per reload task. [#385](https://github.com/ptarmiganlabs/butler/issues/385), [#355](https://github.com/ptarmiganlabs/butler/discussions/355)
- Base alert email rate limits on taskId + email address combination instead of just taskId. [#424](https://github.com/ptarmiganlabs/butler/issues/424)
- Add config setting to enable create-API-docs-mode. [#447](https://github.com/ptarmiganlabs/butler/issues/447)
- API endpoint for sending gauge metrics to New Relic. [#440](https://github.com/ptarmiganlabs/butler/issues/440)

_Bug fixes_

- API docs REST endpoint doesn't work for pre-built binaries [#443](https://github.com/ptarmiganlabs/butler/issues/443)
- Change name of New Relic event for failed and aborted reload tasks. [#418](https://github.com/ptarmiganlabs/butler/issues/418)
- Change New Relic metric names for Butler uptime metrics. [#419](https://github.com/ptarmiganlabs/butler/issues/419)
- Verify that Slack/Teams message template file exists before opening them. [#427](https://github.com/ptarmiganlabs/butler/issues/427)

_Other_

- Change Butler's log prefixes for failed reloads across all notification channels. [#425](https://github.com/ptarmiganlabs/butler/issues/425)
- Make source code file names consistent throughout Butler. [#422](https://github.com/ptarmiganlabs/butler/issues/422)
- Update dependencies to stay sharp and secure.

### What's new in version 7.3

_Features_

- Send Butler memory and uptime metrics to New Relic. [#398](https://github.com/ptarmiganlabs/butler/issues/398)
- Send failed/aborted task events to New Relic. [#400](https://github.com/ptarmiganlabs/butler/issues/400)
- Add rate limiting to Butler's REST API. [#403](https://github.com/ptarmiganlabs/butler/issues/403)

_Bug fixes_

- Better parsing of Sense log files before sent to Teams/Slack. [#408](https://github.com/ptarmiganlabs/butler/issues/408)
- Include Signl4 status in telemetry data. [#402](https://github.com/ptarmiganlabs/butler/issues/402)
- Incorrect telemetry status (true/false) for uptime data sent to InfluxDB. [#401](https://github.com/ptarmiganlabs/butler/issues/401)

_Other_

- Update dependencies to stay sharp and secure.
- Now using Node.js v18 when building Docker images.

### What's new in version 7.2

_Features_

- Create stand-alone binaries to make it easier to get started with Butler. No need to install Node.js any more, just download Butler, configure it and run. [#383](https://github.com/ptarmiganlabs/butler/issues/383)
- Make a few important config options available as command line parameters. Specifically, the config file to use and the log level can be specified via command line options `--configfile` and `--loglevel`, respectively. [#381](https://github.com/ptarmiganlabs/butler/issues/381)
- Store full reload logs for failed reload tasks to disk, for easier analysis at later time. [#94](https://github.com/ptarmiganlabs/butler/issues/94)

_Bug fixes_

- Better error checking when calling Qlik Sense APIs. [#386](https://github.com/ptarmiganlabs/butler/issues/386)
- Clean up Docker image and release ZIP files. [#361](https://github.com/ptarmiganlabs/butler/issues/361)
- Better handling of long script logs in notifications sent to MS Teams. [#389](https://github.com/ptarmiganlabs/butler/issues/389)
- Better handling of long script logs in notifications sent to Slack. [#388](https://github.com/ptarmiganlabs/butler/issues/388)

_Other_

### What's new in version 7.1

_Features_

- Add control of what tasks can be started via Butler's REST API. Also known as "task filtering". [#284](https://github.com/ptarmiganlabs/butler/issues/284)
- api: Verify that task IDs are valid (both that they are valid guids and that they exist in Sense) before trying to start the associated tasks. [#319](https://github.com/ptarmiganlabs/butler/issues/319)
- Refactor API for starting tasks. Add magic task guid "-" that can be used as URL parameter when all task IDs (and other parameters) are passed in via the message body. [#326](https://github.com/ptarmiganlabs/butler/issues/326)
- Show URL to API docs/Swagger page on Butler startup. [#317](https://github.com/ptarmiganlabs/butler/issues/317)

_Bug fixes_

- api: API calls with http "Expect" header no longer fails. [#322](https://github.com/ptarmiganlabs/butler/issues/322)
- Increase timeout in API test cases from 5 to 15 seconds. This gets rid of occasional timeouts in the test suite. [#329](https://github.com/ptarmiganlabs/butler/issues/329)
- Use correct return body format in API docs. [#330](https://github.com/ptarmiganlabs/butler/issues/330)
- Use correct return body format in scheduler API docs. [#331](https://github.com/ptarmiganlabs/butler/issues/331)

_Other_

- Various documentation updates, both relating to new features and typos in previous docs. [#332](https://github.com/ptarmiganlabs/butler/issues/332), [#335](https://github.com/ptarmiganlabs/butler/issues/335)
- Updated dependencies to latest versions to keep Butler safe and secure.
- Document all test cases. [#328](https://github.com/ptarmiganlabs/butler/issues/328)
- Add test cases for Expect: 100-continue header. [#323](https://github.com/ptarmiganlabs/butler/issues/323)
- Add test cases for start task API. [#320](https://github.com/ptarmiganlabs/butler/issues/320)
- Replace deprecated later library with @breejs/later. [#280](https://github.com/ptarmiganlabs/butler/issues/280)

### What's new in version 7.0

**⚠️ Breaking changes**

- Make property names returned from reloadtask call consistent. [#279](https://github.com/ptarmiganlabs/butler/issues/279)
- Incorrect return code when creating schedule. [#277](https://github.com/ptarmiganlabs/butler/issues/277)
- Remove session/connection monitoring feature. These features have been moved to the [Butler SOS](https://butler-sos.ptarmiganlabs.com) tool. [#254](https://github.com/ptarmiganlabs/butler/issues/254)
- Return 201 + appId in body, to better align with REST API best practices. [#267](https://github.com/ptarmiganlabs/butler/issues/267)
- Return 201 vs 200 after creating KV entry, to better align with REST API best practices. [#264](https://github.com/ptarmiganlabs/butler/issues/264)

**Other changes**

_Features_

- Graduate Signl4 (incident mgmt tool) integration from beta to released.
- Add API endpoint to get low-level scheduler status. [#269](https://github.com/ptarmiganlabs/butler/issues/269)
- Add API for starting/stopping all schedules. [#261](https://github.com/ptarmiganlabs/butler/issues/261)
- Add CI test cases for all API endpoints. [#271](https://github.com/ptarmiganlabs/butler/issues/271)

_Bug fixes_

- Consistent re-write of remoteIp in http response. [#256](https://github.com/ptarmiganlabs/butler/issues/256)
- Consistent return body when starting task. [#266](https://github.com/ptarmiganlabs/butler/issues/266)
- Correct error msg when getting app owner. [#181](https://github.com/ptarmiganlabs/butler/issues/181)
- Docker healthcheck working again. [#255](https://github.com/ptarmiganlabs/butler/issues/255)
- File copy/move APIs now respect options `preserveTimestamp` and `overwrite`. #[263](https://github.com/ptarmiganlabs/butler/issues/263)
- Return proper JSON from successful API calls. Refactoring the API code in v6.0 introduced a bug, causing empty responses from successful calls to some API endpoints. [#260](https://github.com/ptarmiganlabs/butler/issues/260)
- Sort API endpoints in docs alphabetically. [#268](https://github.com/ptarmiganlabs/butler/issues/268)

_Other_

- Various documentation updates
- Updated dependencies to latest versions to keep Butler safe and secure
- Applied consistent source code formatting across the entire project

### What's new in version 6.1

- Fixed too verbose logging of calls to the REST API. [#240](https://github.com/ptarmiganlabs/butler/issues/240)
- Add POST variant of start task API endpoint. [#185](https://github.com/ptarmiganlabs/butler/issues/185)
- Start multiple tasks with a single API call. [#183](https://github.com/ptarmiganlabs/butler/issues/183)
- Start all tasks that have a certain Qlik Sense task set. [#243](https://github.com/ptarmiganlabs/butler/issues/243)
- Start all tasks that have a certain Qlik Sense custom property set to a specific value. [#244](https://github.com/ptarmiganlabs/butler/issues/244)
- Fix bug that caused starting tasks to fail in previous version of Butler. [#241](https://github.com/ptarmiganlabs/butler/issues/241)
- Change logging so that the IP of the client calling the REST API is logged, instead of the IP of the host where Butler is running. [#242](https://github.com/ptarmiganlabs/butler/issues/242)
- Update dependencies.

### What's new in version 6.0

- **⚠️ Breaking change:** Changed http response codes for some REST API endpoints, where those were not following general best practices. [#210](https://github.com/ptarmiganlabs/butler/issues/210), [#216](https://github.com/ptarmiganlabs/butler/issues/216)
- **⚠️ Breaking change:** Fixed bug where MQTT message parameters were taken from URL instead of from the body of the API call. [#217](https://github.com/ptarmiganlabs/butler/issues/217)
- Total re-write of the entire REST API. [#208](https://github.com/ptarmiganlabs/butler/issues/208), [#211](https://github.com/ptarmiganlabs/butler/issues/211), [#213](https://github.com/ptarmiganlabs/butler/issues/213)
- Add Butler version number in response from ping endpoint. [#209](https://github.com/ptarmiganlabs/butler/issues/209)
- New, more flexible, reliable and scalable process (using GitHub Actions) for building Docker images. [#77](https://github.com/ptarmiganlabs/butler/issues/77), [#187](https://github.com/ptarmiganlabs/butler/issues/187)
- Include more info in error messages from the REST API. [#224](https://github.com/ptarmiganlabs/butler/issues/224)
- Make validation of Qlik Sense certificates optional. [#192](https://github.com/ptarmiganlabs/butler/issues/192)
- Fixed bug where key-value namespace wasn't properly deleted even when instructed to do this via REST API. [#222](https://github.com/ptarmiganlabs/butler/issues/222)

### What's new in version 5.4

- Fixed bug occurring when the start-task API was called with an empty PUT body. [#157](https://github.com/ptarmiganlabs/butler/issues/157)
- [Improved documentation](/docs/getting-started/setup/data-connections/) around the Sense data connections that Butler needs. [#160](https://github.com/ptarmiganlabs/butler/issues/160), [#156](https://github.com/ptarmiganlabs/butler/issues/156).
- Clarified that [Butler requires InfluxDB 1.x](/docs/getting-started/install/). InfluxDB 2.x is great, but bring breaking features wrt Butler. [#159](https://github.com/ptarmiganlabs/butler/issues/159).

### What's new in version 5.3

- Added a new API endpoint for listing all keys in a [key-value](https://butler.ptarmiganlabs.com/docs/concepts/key-value//) namespace.  [#150](https://github.com/ptarmiganlabs/butler/issues/150).
- Fixed a bug where Butler would not start properly if there were empty config sections in the YAML config file. Butler is now more tolerant against slightly incorrectly formatted config files. [#152](https://github.com/ptarmiganlabs/butler/issues/152).

### What's new in version 5.2

- It's now possible to include zero or more (i.e. optional) key-value pairs when starting QSEoW reload tasks using the [/v4/reloadtask/{taskId}/start](https://butler.ptarmiganlabs.com/docs/examples/openapi-docs/) REST endpoint.  
  There are also helper subs available in the demo app included in the GitHub repository - as well as in the online docs at butler.ptarmiganlabs.com. ([#147](https://github.com/ptarmiganlabs/butler/issues/147), [#148](https://github.com/ptarmiganlabs/butler/issues/148))

### What's new in version 5.1

- First version of **telemetry** added to Butler ([#142](https://github.com/ptarmiganlabs/butler/issues/142)). More info [here](/docs/about/telemetry).
- Fixed bug [#143](https://github.com/ptarmiganlabs/butler/issues/143).
- Show high level system info when starting Butler ([#140](https://github.com/ptarmiganlabs/butler/issues/140)).
- Don't waste memory when MQTT is not used: Fixed [#139](https://github.com/ptarmiganlabs/butler/issues/139).
- Refined the documentation, fixed typos and updated dependencies. The usual stuff that comes with every release.

### What's new in version 5.0

- **Greatly improved failed reload notifications** for both **MS Teams** and **Slack**.  
  Task failure alerts for these channels now use the same advanced templating solution that's already available for Butler's email notifications. This is in many ways a milestone as it brings a new level of reload alerts to Qlik Sense Enterprise.  
  The downside is that the Slack and Teams settings in Butler's config file have been changed in a breaking way - **make sure to update the config file** as needed when upgrading Butler.  
  Due to the breaking nature of the config file changes, the version number was [bumped to 5.0 rather than 4.4](/docs/about/versioning/).
- Added a **new API endpoint for doing app reloads**. Both full and partial reloads are supported. When the app has reloaded, a one or more reload tasks can be started based on whether the app reload completed successfully or not.
- Added new API endpoints for **listing all apps** in the Sense server, as well as **extracting metadata for a specific app**. Those features have been available in Butler for many years, they just get a couple of new endpoints that better align with Butler's current API naming standard.
- Refined **user session monitoring**. The previous XML appender file provided by Butler was too generous and passed on too many user activity events to Butler. The new appender files provide a tighter/more relevant filtering and only returns session start/stop events to Butler (from which this info can be sent to Slack or MS Teams).

### What's new in version 4.3

- **Fixed a [bug](https://github.com/ptarmiganlabs/butler/issues/114)** that in some cases prevented Sense reload tasks from being started using Butler's API.
- **Added [instruction](https://butler.ptarmiganlabs.com/docs/getting-started/setup/data-connections/)** for creating the data connections needed to use Butler APIs from Sense load scripts.
- **Added [concept page](https://butler.ptarmiganlabs.com/docs/concepts/file-system-access/)** explaining how Butler can be used to copy/move/delete files from load scripts.
- **Added [example page](https://butler.ptarmiganlabs.com/docs/examples/file-copy-move-delete/)** showing how file manipulation (copy/move/delete) is done from Sense scripts, using Butler's APIs.

### What's new in version 4.2

- **Email reload alerts taken to a new level.** Emails are created using template files, with full support for HTML formatting, emoji support in both email subject/body etc.  
  This makes it possible to create nice looking alert emails that contain just the information you need, while also conforming to corporate design, colors etc.
- Alert emails can be set up for either **failed scheduled reloads**, or running **reloads that are stopped** from the QMC or via APIs. Or both.
- More than **40 templating fields** available, including task history (what steps the task has been through), beginning and end of reload script log, app/task metadata, 5+ date formats and more.
- **Template fields** can be used **in both subject and body** of email.
- **Rate limiter** that prevents email spamming for frequently failing tasks.

### What's new in version 4.1

- The REST API now lets you **copy files in a controlled, secure way**. Version 4.0 added similar features for file moving and deletes, so copying is a natural complement.

### What's new in version 4.0

- An **advanced scheduler** that makes it possible to trigger reloads in Sense in a much more flexible way, compared to the scheduler available in the Qlik Sense QMC. It's essentially Cron for Qlik Sense.

- A generic **key-value store** can be used to send parameters between reload tasks. The reload script of the first task stash it's parameters away in the KV store, and the following task(s) pull the parameters from the store.  
  KV pairs can optionally also have a time-to-live (TTL) value. This can be an easy way to keep the KV store clean and tidy, or as a way to tell Sense apps that they are reloading within x hours of some event happening, for example.  
  Key-value stores are a very versatile tool and a great addition to Qlik Sense.

- **Moving and deleting files** in the file system of the Sense servers, or on any disks accessible by those servers. You customize what directories are approved for these operations, and thus prevent this feature from becoming a security risk.

- **Reload failure notifications** can now be sent to Microsoft Teams, in addition to Slack and as email.

- **Better logging**, including continuous logging of Butler's own memory usage to InfluxDB, from where it can be graphed using for example Grafana.

- **API docs** using the OpenAPI/Swagger format.

- A totally **re-engineered REST API** that now better follows best practices when to use GET/POST/PUT/DELETE. Previously everything was done using GETs... which was really ugly. The downside is that this is a major breaking change! Please review the [API docs](/docs/reference/rest-api-1/) for details.

{{% /pageinfo %}}
