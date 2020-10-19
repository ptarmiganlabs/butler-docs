---
title: "Documentation"
linkTitle: "Documentation"
weight: 20
# menu:
#   main:
#     weight: 20
---


{{% pageinfo %}}

### What's new in version 4.0

* An **advanced scheduler** that makes it possible to trigger reloads in Sense in a much more flexible way, compared to the scheduler available in the Qlik Sense QMC. It's essentially Cron for Qlik Sense.

* A generic **key-value store** can be used to send parameters between reload tasks. The reload script of the first task stash it's parameters away in the KV store, and the following task(s) pull the parameters from the store.  
KV pairs can optionally also have a time-to-live (TTL) value. This can be an easy way to keep the KV store clean and tidy, or as a way to tell Sense apps that they are reloading within x hours of some event happening, for example.  
Key-value stores are a very versatile tool and a great addition to Qlik Sense.

* **Moving and deleting files** in the file system of the Sense servers, or on any disks accessible by those servers. You customize what directories are approved for these operations, and thus prevent this feature from becoming a security risk.

* **Better logging**, including continuous logging of Butler's own memory usage to InfluxDB, from where it can be graphed using for example Grafana.

* **API docs** using the OpenAPI/Swagger format.

* A totally **re-engineered REST API** that now better follows best practices when to use GET/POST/PUT/DELETE. Previously everything was done using GETs... which was really ugly. The downside is that this is a major breaking change! Please review the [API docs](/docs/reference/rest_api) for details.


{{% /pageinfo %}}
