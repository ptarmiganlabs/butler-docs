---
title: 'Security considerations'
linkTitle: 'Security considerations'
weight: 100
description: >
    Security is important! Keep these things in mind when deploying Butler.
---

{{% pageinfo %}}
Security is a whole field in its ownn.  
What's considered secure in one company might be considered insecure in another.

It's a good idea to review your tools and services every now and then, for example making sure they are updated to include the latest secutity patches etc.  
When in doubt, be paranoid.
{{% /pageinfo %}}

## Security considerations

{{% alert title="Security/Disclosure" color="warning" %}}
If you discover a serious bug with Butler that may pose a security problem, please disclose it confidentially to security@ptarmiganlabs.com first, so that it can be assessed and hopefully fixed prior to being exploited. Please do not raise GitHub issues for security-related doubts or problems.
{{% /alert %}}

- Make sure to configure the firewall on the server where Buter is running to only accept connections from the desired clients/IP addresses.

    A reasonable first approach would be to configure the firewall to only allow calls from localhost. That way calls to Butler can only be made from the server where Butler itself is running.  
     If Butler is not running on the Sense server, the IPs of the Sense servers should also be whitelisted in the firewall, of course.

- The MQTT connections are not secured by certificates or passwords.

    For use within a controlled network that might be fine, but nonetheless something to keep in mind. Adding certificate based authentication (which MQTT supports) would solve this.

- Butler uses various Node.js modules from [npm](https://www.npmjs.com/). If concerned about security, you should review these dependencies and decide whether there are issues in them or not.

    Same thing with Butler itself - while efforts have been made to make Butler secure, you need to decide for yourself whether the level of security is enough for your use case.

    Butler is continuously checked for security vulnerabilities by using GitHub security audit, [Snyk](https://snyk.io/), npm audit and other tools.

## Butler's REST API

Butler uses http for its REST API. As Butler typically runs on the Sense server itself (or a server in close network proximity to the Sense server), the firewalls of that server can be configured to protect Butler from unauthorised access.

This way of using http for communication between internal systems is in many cases considered ok from a security perspective. You should however always consider what's ok in _your_ particular company/setup/configuration/network.

Adding https support could be done, Node.js supports this very nicely.

## Butler talking to Qlik Sense

Butler uses https for all communication with Sense, using Sense's certificates for authentication.

## Signed binaries

The macOS executable binary is signed and notarized by Apple’s standard process.  
A warning may still be shown first time the app is started. This is expected and normal.

The Windows executable binary is signed by “Open Source Developer, Göran Sander".
