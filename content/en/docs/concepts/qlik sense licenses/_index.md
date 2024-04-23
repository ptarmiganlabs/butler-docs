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

Here is how it works:

- Butler will evaluate allocation of professional and analyzer access licenses on a configurable schedule, for example once per day.
- Licenses that have not been used for a certain period of time (e.g. 30 days) will be released.
  - Separate inactivity periods can be configured for professional and analyzer licenses.
- Licenses that are within quarantine period will never be released.
- It is possible to exclude certain users from having their licenses released, i.e. guarantee they will always have a license available.
  Can be useful for administrators or users that need guaranteed access to Sense.
  - The following criteria can be used to exclude users from having their licenses released:
    - Specific users (by userDirectory\userId)
    - Specific tag(s) assigned to a user.
    - Specific custom property value(s) assigned to a user.
    - Users belonging to a user directory.
    - Users being marked as (not) active in the QMC.
    - Users being marked as (not) blocked in the QMC.
    - Users being marked as (not) externally removed in the QMC.

## Disclaimer

This feature has the potential to let more users use your Sense environment, compared to a scenario where no release of licenses is done.

In order to avoid users not being able to access Sense you should still ensure to have a good margin, i.e. get more licenses from Qlik once you are running low. This is the only (and correct and proper) way to ensure that users are not denied access to Sense due to missing licenses.

Also, you must ensure that managing licenses this way is not in conflict with *your* license agreement with Qlik.

Butler's license release feature uses [APIs](https://help.qlik.com/en-US/sense-developer/February2024/Subsystems/RepositoryServiceAPI/Content/Sense_RepositoryServiceAPI/RepositoryServiceAPI-Reference-Redirect.htm?ref=ptarmiganlabs.com) that are publicly documented by Qlik (example [here](https://help.qlik.com/en-US/sense-developer/February2024/APIs/RepositoryServiceAPI/index.html?page=126&ref=ptarmiganlabs.com)).  

The same APIs are used by the QMC to release licenses.  
Butler simply automates what is otherwise a manual task in the QMC.
