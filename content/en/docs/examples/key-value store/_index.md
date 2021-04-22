---
title: "Using the key-value store"
linkTitle: "Key-value store"
weight: 70
draft: true
description: >
  Examples showing how to use Butler's built-in key-value store to solve various tasks.
---

There are many ways to call REST APIs. In this page curl is used, but the same tests can be done using [Paw](https://paw.cloud/), [Postman](https://www.postman.com/) and by using the [REST connector](https://help.qlik.com/en-US/connectors/Subsystems/REST_connector_help/Content/Connectors_REST/REST-connector.htm) from within Qlik Sense load scripts.

All the examples assume Butler is exposing it's API on 192.168.1.168:8080.

## Using convenience subs

There are a set of [convencience subs](https://github.com/ptarmiganlabs/butler/blob/master/docs/sense_script/butler_subs.qvs) available in the GitHub repository. These make it easier to call Butler's REST API, including the scheduling endpoints. 

## Using direct calls to REST API endpoints

### List all defined schedules


### Get a specific schedule
