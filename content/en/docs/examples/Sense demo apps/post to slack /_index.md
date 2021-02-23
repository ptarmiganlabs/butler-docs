---
title: "Post message to Slack"
linkTitle: "Post to Slack"
weight: 30
description: >
    Demo app showing how to post message to Slack from Qlik Sense load script.
---

<!-- TODO -->

## Load script

Assuming the [.qvs helper subs](/docs/reference/sense-helper-subs/) are used, only one line of script is needed to send a Slack message:

    // -------------------------------------------
    // Post messsage to Slack
    // -------------------------------------------
    // Post a basic message to Slack
    Call PostToSlack('#general', 'Butler the Bot', '👽 Greetings, we come in peace.' , ':ghost:')

Note how emojis can be used in the message and a message specific icon can be used (":ghost:" above). 

The Slack message looks like this:

![alt text](/img/butler-slack-message-1.png "Slack message created from Qlik Sense load script.")

The demo app is available in the [GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

## Video showing posting to Slack demo app

Available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler YouTube playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

{{< youtube id="" modestbranding=true color="red">}}
