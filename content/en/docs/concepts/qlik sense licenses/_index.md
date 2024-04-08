---
title: "Qlik Sense licenses"
linkTitle: "Qlik Sense licenses"
weight: 70
description: >
  Monitor and manage Qlik Sense licenses.  

  - High level metrics per user license type (professional, analyzer etc) are gathered and stored in your database of choice (at the time of writing, InfluxDB is supported).  
  
  - User licenses can be released automatically after a certain period of inactivity, allowing them to be used by other users.
---

## Monitor user licenses

In order to use Qlik Sense end users must be assigned some kind of access license.  
There are different types of licenses, for example Professional, Analyzer and Analyzer Capacity licenses.

Butler can monitor the usage of these licenses and store the data in InfluxDB, from where the license data can be visualized in Grafana.

This makes it easy to track (and alert if needed) on the number of used licenses, how many are available and when it's time to get more licenses.

## Release inactive user licenses

Butler can automatically release Professional and Analyzer user licenses that have been inactive for a certain period of time.

This is useful in environments where some users use Sense sporadically, for example only during certain times of the year.  
In such cases it's a waste of resources to keep the license assigned to the user when it's not being used.

Butler can be configured to release the license after a certain period of inactivity, allowing it to be used by other users.
