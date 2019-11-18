---
title: "Security considerations"
linkTitle: "Security considerations"
weight: 3
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

* Make sure to configure the firewall on the server where Buter is running to only accepts connections from the desired clients/IP addresses.

    A reasonable first approach would be to configure the firewall to only allow calls from localhost. That way calls to Butler can only be made from the server where Butler itself is running.  
    If Butler is not running on the Sense server, the IPs of the Sense servers should also be whitelisted in the firewall, of course.

* The MQTT connections are not secured by certificates or passwords.

    For use within a controlled network that might be fine, but nonetheless something to keep in mind. Adding certificate based authentication (which MQTT supports) would solve this.  

* Butler uses various Node.js modules from [npm](https://www.npmjs.com/). If concerned about security, you should review these dependencies and decide whether there are issues in them or not.  

    Same thing with Butler itself - while efforts have been made to make Butler secure, you need to decide for yourself whether the level of security is enough for your use case.  

    Butler is continuously checked for security vulnerabilities by using [Snyk](https://snyk.io/) and npm audit, with status badges shown in the readme files.
