---
title: "Documentation"
linkTitle: "Documentation"
weight: 20
# menu:
#   main:
#     weight: 20
---


{{% pageinfo %}}

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
