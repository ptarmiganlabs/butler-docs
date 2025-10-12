---
title: "Examples"
linkTitle: "Examples"
weight: 40
description: >
  Butler in action!
---

First things first:

If you intend to use the various Qlik script snippets included in the GitHub repository, you first need to initialize things.

Initializing Butler in an app's load script is easy, just call the `ButlerInit` function.

Note: It's usually a good idea to create a shared data connection for scripts that are available to all Sense apps.  
In the example below this shared data connection is simply called "Butler scripts":

    $(Must_Include=[lib://Butler scripts/butler_init.qvs]);
    CALL ButlerInit;
