---
title: "The Butler family"
description: "Please meet the Butlers. They're a nice, wild bunch!" 
weight: 20
---

Butler started out with a very specific need to start Sense reloads from outside systems.  
Over the years a couple of projects have spun off from Butler (for example Butler SOS), and still other projects have been created to solve specific challenges around developing Sense apps (for example the [Butler App Duplicator](https://github.com/ptarmiganlabs/butler-app-duplicator)) or simplifying day 2 operations ([[1](https://www.infoworld.com/article/3442754/why-de-risking-day-2-operations-is-a-smart-business-strategy.html)], [[2](https://dzone.com/articles/defining-day-2-operations)]) in the form of [Butler SOS](https://github.com/ptarmiganlabs/butler-sos).

All members of the Butler family are available on [Ptarmigan Labs' GitHub page](https://github.com/ptarmiganlabs).

Projects with production grade release status are (as of this writing):

### Butler

The original Butler. Offers various utilities that make it easier to develop Sense apps, as well as simplifying day 2 operations.

[butler.ptarmiganlabs.com](https:/butler.ptarmiganlabs.com). (This site!)

### Butler SOS

Real-time operational metrics for Qlik Sense. A must-have if you are responsible for a Sense environment with more than a dozen or so users. Butler SOS makes it possible to detect and alert on issues as they happen, rather than in retrospect much later.

[butler-sos.ptarmiganlabs.com](https://butler-sos.ptarmiganlabs.com).

### Butler CW

Butler Cache Warmer. Cache warming is the process of proactively forcing Sense apps to be loaded into RAM, so they are readily available when users open them. Once again - if your Sense environment serve more than a dozen users, you should consider a cache warming tool.

[github.com/ptarmiganlabs/butler-cw](https://github.com/ptarmiganlabs/butler-cw).

### Butler App Duplicator

No matter if you are a single developer creating Sense apps, or have lots of developers doing this, having app templates is a good idea:

- Lowered barrier of entry for new Sense developers.
- Productivity boost when developing Sense apps.
- Encouraging a common coding standard across all apps.

[github.com/ptarmiganlabs/butler-app-duplicator](https://github.com/ptarmiganlabs/butler-app-duplicator)

### Butler Spyglass

This tool is mainly of interest if you have lots of QVDs and apps, but when that's the case it's of paramount importance to understand what apps use which QVDs. In other words what data lineage looks like.

Butler Spyglass also extracts full load scripts for all Sense apps, creating a historical record of all load scripts for all Sense apps.

[github.com/ptarmiganlabs/butler-spyglass](https://github.com/ptarmiganlabs/butler-spyglass)

### Butler Notifier

This tool makes it easy to tap into the Qlik Sense notification API. From there you can get all kinds of notifications, including task reload failures and changes in session state (user login/logout etc).

[github.com/ptarmiganlabs/butler-notifier](https://github.com/ptarmiganlabs/butler-notifier)

### Butler Icon Uploader

Visual looks is important when it comes to analytics, and this holds true also for Sense apps.
The Butler Icon Uploader makes it easy to upload icon libraries (for example Font Awesome) to Qlik Sense Enterprise.  
With such icons available it is then easy for app developers to use professional quality sheet and app icons in their Sense apps.

[github.com/ptarmiganlabs/butler-icon-upload](https://github.com/ptarmiganlabs/butler-icon-upload)
