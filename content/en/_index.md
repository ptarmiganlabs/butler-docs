---
title: Butler
---

{{< blocks/cover title="Butler: Adding superpowers to Qlik Sense" image_anchor="center" height="full" color="dark" >}}
<div class="mx-auto">
 <p class="lead mt-5" style="font-size: 120%" ">
  Great looking alerts to Slack, Teams, email or New Relic when reloads fail, save all failed reload scripts, monitor Sense licenses, advanced task scheduling, task chaining with parameters, key-value store, start reload tasks from any system, extract app metadata, post to Slack/Teams, MQTT integration and more.<br><br>
 </p>

 <p style="font-size: 120%" ">
  Several of the key features (like app reload failure notifications) are available <br>in both Qlik Sense client-managed and Qlik Sense Cloud environments.
  <br>
 </p>

 <p style="font-size: 120%" ">
  No installation needed. Just download, configure and run.<br>
  Open source of course.<br><br>
 </p>
 <a class="btn btn-lg btn-primary mr-3 mb-4" href="{{< relref "/docs" >}}">
  Documentation <i class="fas fa-arrow-alt-circle-right ml-2"></i>
 </a>
 <a class="btn btn-lg btn-secondary mr-3 mb-4" href="https://github.com/ptarmiganlabs/butler/releases">
  Download <i class="fab fa-github ml-2 "></i>
 </a>
 <a class="btn btn-lg btn-dark mr-3 mb-4" href="https://github.com/ptarmiganlabs/butler/discussions" target="_blank">
  Discussion forum<i class="fa fa-comments ml-2 "></i>
 </a>
 <a class="btn btn-lg btn-success mr-3 mb-4" href="https://ptarmiganlabs.com/#/portal/signup" target="_blank">
  Newsletter <i class="fa fa-envelope ml-2 "></i>
 </a>
 <p class="lead mt-5">
  Click the arrow ⬇️ or scroll down to learn more.
 </p>
 <div class="mx-auto mt-5">
  {{< blocks/link-down color="info" >}}
 </div>

{{< /blocks/cover >}}


{{< blocks/section type="row" color="light">}}

{{% blocks/feature icon="fa-envelope" title="Task failure notifications" %}}
Who should be the first to know that a reload has failed?  
You or your users?  
Who was it that stopped that important 3-hour reload 5 minutes before it was done?

Get notified when tasks fail or are stopped, with notifications sent to Slack, Microsoft Teams, email, InfluxDb, New Relic, Signl4 and other destinations.  
Full support for HTML/Markdown formatting and 50+ template fields.

Both **Qlik Sense client-managed** and **Qlik Sense Cloud** supported, with alerts looking the same in both environments.

[Read more...](/docs/concepts/failed-reloads/)
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-envelope" title="Task success notifications" %}}
Knowing about failed reloads is important, but sometimes it's just as important to know when a reload has succeeded.

Get emails when those important reloads have completed successfully.
Nicely formatted with all the details you need.

[Read more...](/docs/concepts/failed-reloads/) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-archive" title="Save logs from failed reloads" %}}
Finding the complete logs from failed reloads can be a pain.

Butler can save these for you, sorted by date.  
Finding what caused a reload to fail is now easier than ever!

Both **Qlik Sense client-managed** and **Qlik Sense Cloud** supported.

[Read more...](/docs/concepts/failed-reloads/) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-cogs" title="Monitor Windows services" %}}
Make sure the Qlik Sense services are always running - and any other Windows services of interest.
Maybe your IT department does this for you - if not Butler offers a pretty solid solution.

Start/stop alerts can be sent to email, Slack, Teams, InfluxDB, New Relic, MQTT and webhooks.  
Service metrics are continuously sent to MQTT and InfluxDB. 

[Read more...](/docs/getting-started/setup/windows-service-monitor/) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-users" title="Monitor and release user licenses" %}}
Stay on top of how your Qlik Sense user licenses are used.
Monitor in real time - broken down by license type - and release licenses that are no longer used by users.

[Read more...](/docs/concepts/qlik-sense-access-licenses/)
{{% /blocks/feature %}}




{{% blocks/feature icon="fa-file-code" title="Monitor and alert on Sense server license" %}}
Continuously monitor the Qlik Sense server license and alert when it is about to expire.

Store the data in InfluxDB for further analysis, or send to your alerting destination of choice.

[Read more...](/docs/concepts/qlik-sense-server-license/)
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-code-branch" title="Monitor Sense server version" %}}
Continuously monitor the Qlik Sense server version and store the data in InfluxDB.

Reduces the risk of running outdated versions of Sense, with associated security risks.

[Read more...](/docs/concepts/qlik-sense-server-version/)
{{% /blocks/feature %}}




{{% blocks/feature icon="fa-clock" title="Advanced task scheduler" %}}
Set up advanced task scheduling, more flexible than the one built into Sense.

[Cron](https://crontab.guru) for Qlik Sense, no more, no less.

[Read more...](/docs/concepts/scheduler/) 
{{% /blocks/feature %}}



{{% blocks/feature icon="fa-link" title="Task chaining with parameters" %}}
Need to pass parameters from one reload task to the next?

Create chained app reloads with any number of parameters passed from app to app.

[Read more...](/docs/examples/reload-chaining/) 
{{% /blocks/feature %}}



{{% blocks/feature icon="fa-database" title="Generic key-value store" %}}
Keep state across any number of apps. Namespace support and optional Time To Live (TTL) for each key-value pair.

[Read more...](/docs/concepts/key-value/) 
{{% /blocks/feature %}}



{{% blocks/feature icon="fa-play" title="Start tasks via REST API or MQTT" %}}
Data delays - no thanks!  
Start reload tasks from within app load scripts or from upstream source systems that feed Sense with data.

Need parameters too? No problem - just add zero or more key-value pairs and they will be available to any Sense app!

Or maybe start all tasks having a certain tag or custom property set? Available via the [REST API](/docs/reference/rest-api-1/).

[Read more...](/docs/examples/start-task/start-task-from-rest/) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-redo" title="Partial app reloads" %}}
Trigger full or partial app reloads using Butler's REST API.

Useful when dealing with reload chains that only should update a subset of an app's data.

[Read more...](/docs/examples/sense-demo-apps/partial-loads/) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-shoe-prints" title="App metadata extract" %}}
Extract app metadata for a single or all apps in a Sense cluster.
Great for backup purposes!

[Read more...](/docs/reference/rest-api-1/?operationsSorter=alpha) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-comments" title="Keep your users in the know" %}}
Tired of being asked "when is new data available"?

Automatically inform your users via Slack or Teams when new data is available.

[Read more...](/docs/examples/sense-demo-apps/post-to-slack/) 
{{% /blocks/feature %}}



{{% blocks/feature icon="fa-chart-line" title="Observable" %}}
Butler can save data about its own memory usage for inclusion in operational monitoring tools.

[Read more...](/docs/examples/monitoring-butler/) 
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-server" title="Runs anywhere" %}}
Run Butler on Windows server, Linux, Docker, Kubernetes or Mac OS.

Standalone binaries - no installation needed. Download, configure and run.

[Read more...](/docs/getting-started/) 
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-share-alt" title="Integrations" %}}
Send failed reload events to dedicated tools such as New Relic and Signl4. 

Butler itself can be monitored in InfluxDB/Grafana and New Relic.
[Read more...](/docs/getting-started/) 
{{% /blocks/feature %}}

{{< /blocks/section >}}






{{< blocks/section type="row" color="dark">}}

{{% blocks/feature icon="fa-lightbulb" title="Latest release: 13.0" %}}
Qlik Sense Cloud support added. Yay! 🎉

Get reload failed alerts to email, Slack, Teams or script log on local disk.

Tons of updates to the reload failed alert templates, making them better looking than before, and also consistent across client-managed and Qlik Sense Cloud.

Available on [GitHub](https://github.com/ptarmiganlabs/butler/releases).
{{% /blocks/feature %}}


{{% blocks/feature icon="fab fa-github" title="Contributions welcome!"  url="https://github.com/ptarmiganlabs/butler" %}}
We do a [Pull Request](https://github.com/ptarmiganlabs/butler/pulls) contributions workflow on **GitHub**. New developers are always welcome!

Please consider giving us a star on [GitHub](https://github.com/ptarmiganlabs/butler) if you find Butler useful.
{{% /blocks/feature %}}


{{% blocks/feature icon="fa-hand-spock" title="Don't be a stranger!" url="https://ptarmiganlabs.com/#/portal/signup" %}}
We have a great [newsletter](https://ptarmiganlabs.com/#/portal/signup) and [LinkedIn](https://www.linkedin.com/in/gorsan).  
The [GitHub discussion forums](https://github.com/ptarmiganlabs/butler/discussions) are good for feature questions and discussions.
{{% /blocks/feature %}}


{{< /blocks/section >}}




