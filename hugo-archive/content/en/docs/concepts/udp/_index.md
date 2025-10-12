---
title: "UDP client"
linkTitle: "UDP client"
weight: 190
description: >
  A basic, stand-alone UDP client is included in Butler.
---

Butler includes a very basic UDP client, which can be used to send test messages to Butler's UDP servers.  
This can be useful when debugging a Butler server, when adding new UDP handlers etc.  
The client is built using node.js, and is found in the src/udp_client directory.

Run the app to show its help text (in this case the UDP client is executed on a Mac):

    $ node udp_client.js
    Usage: node udp_client.js [options]

    This app sends messages to the UDP server(s) built into Butler (or any other UDP
    server)

    Options:
      --version   Show version number                                      [boolean]
      -i, --ip    IP address of UDP server message will be sent to        [required]
      -p, --port  Port on UDP server                                      [required]
      -m, --msg   Message to send                          [default: "Test message"]
      -h, --help  Show help                                                [boolean]

    Missing required arguments: i, p
    $

## Testing the failed task UDP server

Sending a message to port 9998 will test the UDP server responsible for handling task failure messages:

Sending a message to Butler looks like this (with a fake IP address):

    $ node udp_client.js --ip 1.2.3.4 -p 9998 -m "Abc;123;456;test"
    UDP message sent to 1.2.3.4:9998, 16 bytes.
    $

The resulting Slack message looks like this:  

![Slack failed task](slack_failed_task_1.jpg "Slack failed task")
