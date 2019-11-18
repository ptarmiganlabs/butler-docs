---
title: "Security considerations"
linkTitle: "Security considerations"
weight: 10
description: >
  
---


## Butler's REST API
#
Butler uses http for its REST API. As Butler typically runs on the Sense server itself (or a server in close network proximity to the Sense server), the firewalls of that server can be configured to protect Butler from unauthorised access.

This way of using http for communication between internal systems is in many cases considered ok from a security perspective. You should however always consider what's ok in *your* particular company/setup/configuration/network. 

Adding https support could be done, Node.js supports this very well.  

## Butler talking to Qlik Sense

Butler uses https for all communication with Sense, using Sense's certificates for authentication. This way there is no need to set up new virtual proxies or similar in Sense.
