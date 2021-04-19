---
title: 'Installing Butler'
linkTitle: 'Installing Butler'
weight: 20
description: >
    How to install Butler, including requirements and on what platforms Butler can be installed.
---

{{< notice warning >}}
Butler was developed with InfluxDB version 1.x in mind.  

InfluxDB is currently available in version 2.x and while this version brings lots of new goodies, it's not out-of-the-box compatible with Butler.  
For that reason you should use the latest 1.x version of InfluxDB, which at the time of this writing is 1.8.4.

If you do not intend to use any InfluxDB-dependend features of Butler you can simply disregard this warning.

In due time Butler will be updated to support InfluxDB 2.x too.
{{< /notice >}}

{{% pageinfo %}}
Given the cross platform nature of Node.js (which is the language Butler is written in), Butler can run on lots of different hardware platforms and operating systems.

It is therefore difficult to give detailed installation instructions for each possible installation scenario. This site thus tries explain how to get started with Butler in some of the most common scenarios.
{{% /pageinfo %}}

## Getting started

Sorry - there is no installer for Butler.  
You will need to work a bit on the command line to set things up.

It's not as bad as it sounds though, the instructions here should help.  
If you run into troubles you can always reach out via the [GitHub discussion forums](https://github.com/ptarmiganlabs/butler/discussions).

## Prerequisites

Either you install a few pieces of software (most notably [Node.js](https://nodejs.org/en/) and some node modules), or you run Butler in a Docker container.

Either way you also need to edit Butler's configuration file and provide certificates exported from Qlik Sense Enterprise.
