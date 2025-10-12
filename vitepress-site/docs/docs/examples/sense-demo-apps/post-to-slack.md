ccccccklirvujfjcgderttukfkrfdubhvfgrcfclulie

# Post message to Slack

Demo app showing how to post messages to Slack from Qlik Sense load script.

## Load script

Assuming the [.qvs helper subs](/docs/reference/sense-helper-subs/) are used, only one line of script is needed to send a Slack message:

```qlik
// -------------------------------------------
// Post message to Slack
// -------------------------------------------
// Post a basic message to Slack
Call PostToSlack('#general', 'Butler the Bot', '👽 Greetings, we come in peace.' , ':ghost:')
```

Note how emojis can be used in the message and a message specific icon can be used (":ghost:" above).

The Slack message looks like this:

<ResponsiveImage
  src="/img/butler-slack-message-1.png"
  alt="Slack message created from Qlik Sense load script"
  caption="Slack message created from Qlik Sense load script"
  maxWidth="600px"
/>

## Demo app

The demo app is available in the [GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

## See Also

- [Messaging from Load Script](../../messaging-from-load-script) - More examples of Slack and MQTT messaging
- [Butler helper functions](/docs/reference/sense-helper-subs/) - Complete reference for all load script helper subs
