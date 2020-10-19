---
title: Butler
linkTitle: Butler
description: An introduction to Butler.
weight: 10
aliases: ['/docs/', '/docs/about/', '/docs/butler/']
---

The Butler project is all about adding useful features to Qlik Sense Enterprise.  
Some of the features can be used from Sense load scripts, while other provide integration with other systems.

The goal is to integrate battle-proven concepts and best-of-breed open-source tools into Butler and thus make them available to developers of Sense apps or those responsible for running Sense clusters.  
In some cases it might be possible to use these tools from within Sense also without Butler - in those cases Butler simply tries make things easier, lowering the barriers to get started and get things done.

There is also a clear goal that Butler should be very configurable. In practice this means that features can be turned on/off as needed, improving security and lowering memory usage.

Butler is written in [Node.js](https://nodejs.org/en/) and runs on most modern operating systems.  
You can run Butler on the same server as Qlik Sense, in a Docker container on a Linux server, in Kubernetes, on Mac OS, on Raspberry Pi (not a good idea.. but possible and proven to work).

Butler is a member of a group of tools collectively referred to as the "Butler family", more info is available [here](/docs/about/butler-family).
