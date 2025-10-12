# Publish message to MQTT

Demo app showing how to publish messages to MQTT from Qlik Sense load script.

## Load script

Assuming the [.qvs helper subs](/docs/reference/sense-helper-subs/) are used, only one line of script is needed to publish a MQTT message.

The demo app does a bit more. First it posts a startup message to MQTT, then it loads some data and finally an all-done message is sent:

```qlik
// -------------------------------------------
// Publish a MQTT message, load some data and publish another message
Call PostToMQTT('butler/5.0/demo-reloading/status', 'reload started')

// Load some data
Characters:
Load Chr(RecNo()+Ord('A')-1) as Alpha, RecNo() as Num autogenerate 26;

// Publish final message
Call PostToMQTT('butler/5.0/demo-reloading/status', 'reload done')
```

The MQTT messages look like this in the [MQTT Explorer](http://mqtt-explorer.com/) app on macOS:

<ResponsiveImage
  src="/img/butler-publish-mqtt-message-1.png"
  alt="MQTT messages created from Qlik Sense load script"
  caption="MQTT messages created from Qlik Sense load script"
  maxWidth="800px"
/>

## Demo app

The demo app is available in the [GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

## Seeing is believing

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

<iframe width="560" height="315" src="https://www.youtube.com/embed/GtOojhW5HsA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## See Also

- [Messaging from Load Script](../../messaging-from-load-script) - More examples of Slack and MQTT messaging
- [Butler helper functions](/docs/reference/sense-helper-subs/) - Complete reference for all load script helper subs
