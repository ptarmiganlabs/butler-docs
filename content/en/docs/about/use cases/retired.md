+++ 
title = "Retired use cases" 
description = "Things that Butler used to do, but don't really care for any more..." 
weight = 30
+++

Some features age with grace, others don't.  
Here's a list of features that are candidates for removal from Butler, or that have already been removed.

## Candidates for removal in coming versions

### Real-time metrics around active users

While a good idea in theory, Butler just wasn't the vehicle for this.

The way Butler approached this was to have Sense's log4net logging framework send UDP messages to Butler when users logged in/out or sessions started/ended. This certainly works (quite well in fact!), but it also has inherent issues.  
For example, when Butler was started it wouldn't capture currently active users or sessions - it was only after some event captured in the logs that Butler would update it's internal counters. This meant that it would take some time (sometimes quite long) until the metrics were even approaching the real number of users using Sense.

There was also the risk of Butler missing UDP messages and not registering the associated log event.

The affected API endpoints are:

[/v4/activeusercount](/docs/reference/rest-api-1/?operationsSorter=alpha)  
[/v4/activeusers](/docs/reference/rest-api-1/?operationsSorter=alpha)

{{% alert title="Tip: Butler SOS" color="info" %}}
The shortcomings above lead to the creation of the Butler SOS project, which has over the years evolved into a very comprehensive open source tool for professional grade, real-time monitoring of Qlik Sense.

More information available at [butler-sos.ptarmiganlabs.com](https://butler-sos.ptarmiganlabs.com).
{{% /alert %}}
