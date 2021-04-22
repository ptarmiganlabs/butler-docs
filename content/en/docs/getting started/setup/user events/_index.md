---
title: "Forwarding user activity events to Butler"
linkTitle: "User activity events"
weight: 300
description: >
  Butler can receive and act on any user event detected in the Sense log files.  
  This page describes how to set this up using Sense log appenders.
---

{{% alert title="Optional" color="primary" %}}
These settings are optional.

If you don't need this feature just disable it and leave the default values in the config as they are.

Do note though that Butler expects the configuration properties below to exist in the config file, but will *ignore their values* if the related features are disabled.
{{% /alert %}}

For a more high-level discussion around log events, please see this [concepts page](/docs/concepts/log-event-handlers/).

## Adding log appender XML files to Qlik Sense

The page covering how to set up task failure alerts has a section on [how to add log appenders](/docs/getting-started/setup/reload-alerts/).  
The concepts there are valid also in the context of user event handlers, the actual XML files and their location on the Sense servers differ though.

The user activity events of interest are found in the proxy service log files.  
More specifically we're looking for the strings `Start session for user`, `Stop session for user`, `connection Opened for session`, `connection Closed for session` in the `C:\ProgramData\Qlik\Sense\Log\Proxy\Audit\PRO2-WIN1_AuditActivity_Proxy.txt` log file.

A sample `LocalLogConfig.xml` file is found in the GitHub repository's `docs/log4net_user-audit-event` directory.  
Edit it as needed with respect to IP/hostname and port where Butler is running.  
If you want to change what events Butler should receive via UDP messages, this is where this should be changed.

The XML file should be saved as `C:\ProgramData\Qlik\Sense\Proxy\LocalLogConfig.xml`.

The sample file included with Butler looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <appender name="EventSession" type="log4net.Appender.UdpAppender">
        <filter type="log4net.Filter.StringMatchFilter">
            <param name="stringToMatch" value="Start session for user" />
        </filter>
        <filter type="log4net.Filter.StringMatchFilter">
            <param name="stringToMatch" value="Stop session for user" />
        </filter>
        <filter type="log4net.Filter.DenyAllFilter" />
        <param name="remoteAddress" value="<FQDN or IP of server where Butler is running>" />
        <param name="remotePort" value="9997" />
        <param name="encoding" value="utf-8" />
        <layout type="log4net.Layout.PatternLayout">
            <converter>
                <param name="name" value="hostname" />
                <param name="type" value="Qlik.Sense.Logging.log4net.Layout.Pattern.HostNamePatternConverter" />
            </converter>
            <param name="conversionpattern" value="/proxy-session/;%hostname;%property{Command};%property{UserDirectory};%property{UserId};%property{Origin};%property{Context};%message" />
        </layout>
    </appender>

    <appender name="EventConnection" type="log4net.Appender.UdpAppender">
        <filter type="log4net.Filter.StringMatchFilter">
            <param name="stringToMatch" value="connection Opened for session" />
        </filter>
        <filter type="log4net.Filter.StringMatchFilter">
            <param name="stringToMatch" value="connection Closed for session" />
        </filter>
        <filter type="log4net.Filter.DenyAllFilter" />
        <param name="remoteAddress" value="<FQDN or IP of server where Butler is running>" />
        <param name="remotePort" value="9997" />
        <param name="encoding" value="utf-8" />
        <layout type="log4net.Layout.PatternLayout">
            <converter>
                <param name="name" value="hostname" />
                <param name="type" value="Qlik.Sense.Logging.log4net.Layout.Pattern.HostNamePatternConverter" />
            </converter>
            <param name="conversionpattern" value="/proxy-connection/;%hostname;%property{Command};%property{UserDirectory};%property{UserId};%property{Origin};%property{Context};%message" />
        </layout>
    </appender>

    <logger name="AuditActivity.Proxy">
        <appender-ref ref="EventSession" />
        <appender-ref ref="EventConnection" />
    </logger>
</configuration>
```

Before depoloying it to your Sense server(s) the sample file should be modified to include the IP address/host name where Butler is running.

{{% alert title="Remember" color="primary" %}}

The XML file must be deployed on all Sense servers.

If the XML file is not deployed to a server that users access Sense through, user events on that server will not be forwarded to Butler.
{{% /alert %}}
