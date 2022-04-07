---
title: Butler
linkTitle: Butler
description: An introduction to Butler.
weight: 10
aliases: ['/docs/', '/docs/about/', '/docs/butler/']
---

The Butler project is all about adding useful features to the client-managed version of Qlik Sense, also known as Qlik Sense Enterprise on Windows, QSEoW.  
Some of the features can be used from Sense load scripts, other features provide integration with 3rd party systems.  
Most of Butler's features try to make daily life for a Qlik Sense administrator a bit easier.

The goal is to integrate battle-proven concepts and best-of-breed open-source tools into Butler and thus make them available to developers of Sense apps or those responsible for running Sense clusters.  
In some cases it might be possible to use these tools from within Sense also without Butler - in those cases Butler simply tries to make things easier, lowering the barriers to get started and get things done.

There is also a clear goal that Butler should be very configurable. In practice this means that individual features can be turned on/off as needed, improving security and lowering memory usage.

Butler is written in [Node.js](https://nodejs.org/en/) and runs on most modern operating systems.  
As of version 7.2 Butler offers pre-built binaries for Windows and macOS, meaning that Node.js no longer has to be separately installed to use Butler.  
This simplifies things - just download, configure and run.

You can run Butler on the same server as Qlik Sense, in a Docker container on a Linux server, in Kubernetes, on Mac OS, on Raspberry Pi (not a good idea.. but possible and proven to work).

Butler is a member of a group of tools collectively referred to as the "Butler family", more info is available [here](/docs/about/butler-family).

This picture might be useful to understand what Butler does and how it fits into the larger system map around Qlik Sense:

![alt text](/img/butler-system-overview-1.png "Butler high level system overview")  
