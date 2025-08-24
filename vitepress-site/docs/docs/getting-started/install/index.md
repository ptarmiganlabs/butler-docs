# Install

How to install Butler, including requirements and on what platforms Butler can be installed.

::: warning
Butler was developed with InfluxDB version 1.x in mind.  
If you intend to use Butler together with InfluxDB you need to be aware of the following:

InfluxDB is currently available in version 2.x and while this version brings lots of new goodies, it's not out-of-the-box compatible with Butler.  
For that reason you should use the latest 1.x version of InfluxDB, which at the time of this writing is 1.8.4.

If you do not intend to use any InfluxDB related features of Butler you can simply disregard this warning.

In due time Butler will be updated to support InfluxDB 2.x too.
:::

::: info
Given the cross platform nature of Node.js (which is the language Butler is written in), Butler can run on lots of different hardware platforms and operating systems.

It is therefore difficult to give detailed installation instructions for each possible installation scenario. This site thus tries explain how to get started with Butler in some of the most common scenarios.

Pre-built binaries are available for Windows, macOS and Linux. When using these there is no need to install Node.js, as the Node.js runtime is bundled into the binaries.

Using these binaries is the easiest - and thus recommended - way of using Butler.  
...unless you want to use Docker, which is also a great option.
:::

## Getting started

Sorry - there is no installer for Butler.

The pre-built binaries for Windows, macOS, Linux and Docker simply work as-is when combined with a properly set up configuration file.

If you still want to run Butler as Node.js app you will first need to install Node.js.

The instructions on the pages below should provide good guidance, if you still run into troubles you can always reach out via the [GitHub discussion forums](https://github.com/ptarmiganlabs/butler/discussions).

## What's required to use Butler

- A Butler executable for your operating system
- A Butler config file adapted to your specific Qlik Sense environment
- A way to authenticate with Qlik Sense APIs
  - Certificates for Qlik Sense Enterprise on Windows
  - JSON Web Token (JWT) for Qlik Sense Cloud

| What | Comment |
| ---- | ------- |
| Qlik Sense Enterprise on Windows | Most Butler features target client-managed Qlik Sense Enterprise on Windows (QSEoW). |
| Qlik Sense Cloud | Some features are available for Qlik Sense Cloud, for example the ability to send app reload failed alerts to email, Slack, Teams or script log on local disk. |
| Butler executable | _Mandatory._ A Butler executable of some kind. This would be a) a stand-alone binary for the operating system you plan to use, b) a [Docker image](https://hub.docker.com/r/ptarmiganlabs/butler/tags) from which a Butler container can be created or c) the Butler source code plus [Node.js](https://nodejs.org/en) installed. |
| MQTT broker | _Optional._ MQTT is used for both in- and out-bound pub-sub messaging. Butler assumes a working MQTT broker is available, the IP of which is defined in the Butler config file. [Mosquitto](https://mosquitto.org/) is a great open source broker. It requires very little hardware to run, even the smallest (usually free) Amazon/Google/Microsoft/... instance is enough, if you want a dedicated MQTT server. If you don't care about the pubsub features of Butler, you don't need a MQTT broker. In this case you can disable the MQTT features in the config YAML file. |
| [InfluxDB](https://www.influxdata.com/time-series-platform/) | _Optional._ A database for realtime information, used to store metrics around Butler's own memory usage over time (if this feature is enabled). |
| [New Relic](https://newrelic.com) | _Optional._ A commercial online service offering a vast set of observability features of which Butler uses just a few. Reload failure alerts are for example very nicely handled in New Relic as you get access to the script logs (similar to what can be done with InfluxDB + Grafana) right in the New Relic UI. New Relic's free tier usually goes a long way towards the need of SenseOps and Butler use cases, so it's easy to try out New Relic. |
| [Signl4](https://www.signl4.com) | _Optional._ A smaller but very nice, mobile-first incident management service. Using Signl4 it's easy to get failed reload alerts to your phone. The service also makes it easy to set up on-call schedules, escalate incidents if needed etc. |