---
title: "Real-time metrics"
linkTitle: "Real-time metrics"
weight: 200
description: >
  Details about the real-time metrics (active user count etc) provided by Butler.
---


{{% alert title="Deprecated feature" color="warning" %}}
Looking for info on number of active Sense users, what apps are loaded into the Sense engine or what warnings and errors are logged by Sense?

If yes, you are probably looking for [Butler SOS](https://butler-sos.ptarmiganlabs.com), another open source project in the [Butler family of tools](https://github.com/ptarmiganlabs).

The metrics offered by Butler (this tool) are rather basic and has some inherit design issue that have been adressed in Butler SOS.  

That said, there certainly are cases where Butler's metrics will work fine.  
Take a look at both tools and then decide which suits your needs best. The most common scenario is actually to use both tools: Butler for it's REST API and MQTT integration, and Butler SOS for enterprise grade operational monitoring of Qlik Sense Enterprise.
{{% /alert %}}
