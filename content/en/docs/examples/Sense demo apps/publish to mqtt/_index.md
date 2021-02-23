---
title: "Publish message to MQTT"
linkTitle: "Publish to MQTT"
weight: 40
description: >
    Demo app showing how to publish message to MQTT from Qlik Sense load script.
---

<!-- TODO -->

## Load script

Assuming the [.qvs helper subs](/docs/reference/sense-helper-subs/) are used, only one line of script is needed to publish a MQTT message.

The demo app does a bit more. First it posts a startup message to MQTT, then it loads some data and finally an all-done message is sent:

    // -------------------------------------------
    // Publish a MQTT message, load some data and publish another message
    Call PostToMQTT('butler/5.0/demo-reloading/status', 'reload started')

    // Load some data
    Characters:
    Load Chr(RecNo()+Ord('A')-1) as Alpha, RecNo() as Num autogenerate 26;

    // Publish final message
    Call PostToMQTT('butler/5.0/demo-reloading/status', 'reload done')

The MQTT messages look like this in the [MQTT Explorer](http://mqtt-explorer.com/) app on mac OS:

![alt text](/img/butler-publish-mqtt-message-1.png "MQTT messages created from Qlik Sense load script.")

The demo app is available in the [GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

## Video showing publishing MQTT messages from load script

Available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

{{< youtube id="" modestbranding=true color="red">}}