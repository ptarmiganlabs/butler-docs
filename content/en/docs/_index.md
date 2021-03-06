---
title: "Documentation"
linkTitle: "Documentation"
weight: 20
# menu:
#   main:
#     weight: 20
---


{{% pageinfo %}}

### What's new in version 5.4

* Fixed bug occuring when the start-task API was called with an empty PUT body. [#157](https://github.com/ptarmiganlabs/butler/issues/157)

* [Improved documentation](/docs/getting-started/setup/data-connections/) around the Sense data connections that Butler needs. [#160](https://github.com/ptarmiganlabs/butler/issues/160), [#156](https://github.com/ptarmiganlabs/butler/issues/156).

* Clarified that [Butler requires InfluxDB 1.x](/docs/getting-started/install/). InfluxDB 2.x is great, but bring breaking features wrt Butler. [#159](https://github.com/ptarmiganlabs/butler/issues/159).

### What's new in version 5.3

* Added a new API endpoint for listing all keys in a [key-value](http://localhost:1313/docs/concepts/key-value/) namespace.  [#150](https://github.com/ptarmiganlabs/butler/issues/150).

* Fixed a bug where Butler would not start properly if there were empty config sections in the YAML config file. Butler is now more tolerant against slightly incorrectly formatted config files. [#152](https://github.com/ptarmiganlabs/butler/issues/152).

### What's new in version 5.2

* It's now possible to include zero or more (i.e. optional) key-value pairs when starting QSEoW reload tasks using the [/v4/reloadtask/{taskId}/start](https://butler.ptarmiganlabs.com/docs/examples/openapi-docs/) REST endpoint.  
  There are also helper subs available in the demo app included in the GitHub repository - as well as in the online docs at butler.ptarmiganlabs.com. ([#147](https://github.com/ptarmiganlabs/butler/issues/147), [#148](https://github.com/ptarmiganlabs/butler/issues/148))

### What's new in version 5.1

* First version of **telemetry** added to Butler ([#142](https://github.com/ptarmiganlabs/butler/issues/142)). More info [here](/docs/about/telemetry).

* Fixed bug [#143](https://github.com/ptarmiganlabs/butler/issues/143).

* Show high level system info when starting Butler ([#140](https://github.com/ptarmiganlabs/butler/issues/140)).

* Don't waste memory when MQTT is not used: Fixed [#139](https://github.com/ptarmiganlabs/butler/issues/139).

* Refined the documentation, fixed typos and updated dependencies. The usual stuff that comes with every release.

### What's new in version 5.0

* **Greatly improved failed reload notifications** for both **MS Teams** and **Slack**.  
  Task failure alerts for these channels now use the same advanced templating solution that's already available for Butler's email notifications. This is in many ways a milestone as it brings a new level of reload alerts to Qlik Sense Enterprise.  
  The downside is that the Slack and Teams settings in Butler's config file have been changed in a breaking way - **make sure to update the config file** as needed when upgrading Butler.  
  Due to the breaking nature of the config file changes, the version number was [bumped to 5.0 rather than 4.4](/docs/about/versioning/).

* Added a **new API endpoint for doing app reloads**. Both full and partial reloads are supported. When the app has reloaded, a one or more reload tasks can be started based on whether the app reload completed successfully or not.

* Added new API endpoints for **listing all apps** in the Sense server, as well as **extracting metadata for a specific app**. Those features have been available in Butler for many years, they just get a couple of new endpoints that better align with Butler's current API naming standard.

* Refined **user session monitoring**. The previous XML appender file provided by Butler was too generous and passed on too many user activity events to Butler. The new appender files provide a tighter/more relevant filtering and only returns session start/stop events to Butler (from which this info can be sent to Slack or MS Teams).

### What's new in version 4.3

* **Fixed a [bug](https://github.com/ptarmiganlabs/butler/issues/114)** that in some cases prevented Sense reload tasks from being started using Butler's API.
* **Added [instruction](https://butler.ptarmiganlabs.com/docs/getting-started/setup/data-connections/)** for creating the data connections needed to use Butler APIs from Sense load scripts.
* **Added [concept page](https://butler.ptarmiganlabs.com/docs/concepts/file-system-access/)** explaining how Butler can be used to copy/move/delete files from load scripts.
* **Added [example page](https://butler.ptarmiganlabs.com/docs/examples/file-copy-move-delete/)** showing how file manipulation (copy/move/delete) is done from Sense scripts, using Butler's APIs.

### What's new in version 4.2

* **Email reload alerts taken to a new level.** Emails are created using template files, with full support for HTML formatting, emoji support in both email subject/body etc.  
  This makes it possible to create nice looking alert emails that contain just the information you need, while also conforming to corporate design, colors etc.
* Alert emails can be set up for either **failed scheduled reloads**, or running **reloads that are stopped** from the QMC or via APIs. Or both.
* More than **40 templating fields** available, including task history (what steps the task has been through), beginning and end of reload script log, app/task metadata, 5+ date formats and more.
* **Template fields** can be used **in both subject and body** of email.
* **Rate limiter** that prevents email spamming for frequently failing tasks.

### What's new in version 4.1

* The REST API now lets you **copy files in a controlled, secure way**. Version 4.0 added similar features for file moving and deletes, so copying is a natural complement.

### What's new in version 4.0

* An **advanced scheduler** that makes it possible to trigger reloads in Sense in a much more flexible way, compared to the scheduler available in the Qlik Sense QMC. It's essentially Cron for Qlik Sense.

* A generic **key-value store** can be used to send parameters between reload tasks. The reload script of the first task stash it's parameters away in the KV store, and the following task(s) pull the parameters from the store.  
KV pairs can optionally also have a time-to-live (TTL) value. This can be an easy way to keep the KV store clean and tidy, or as a way to tell Sense apps that they are reloading within x hours of some event happening, for example.  
Key-value stores are a very versatile tool and a great addition to Qlik Sense.

* **Moving and deleting files** in the file system of the Sense servers, or on any disks accessible by those servers. You customize what directories are approved for these operations, and thus prevent this feature from becoming a security risk.

* **Reload failure notifications** can now be sent to Microsoft Teams, in addition to Slack and as email.

* **Better logging**, including continuous logging of Butler's own memory usage to InfluxDB, from where it can be graphed using for example Grafana.

* **API docs** using the OpenAPI/Swagger format.

* A totally **re-engineered REST API** that now better follows best practices when to use GET/POST/PUT/DELETE. Previously everything was done using GETs... which was really ugly. The downside is that this is a major breaking change! Please review the [API docs](/docs/reference/rest-api) for details.

{{% /pageinfo %}}
