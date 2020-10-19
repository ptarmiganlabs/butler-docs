---
title: "Key-value store"
linkTitle: "Key-value store"
weight: 40
description: >
  Details about the Butler key-value store. 
---

## Key-value store overview

The [API documentation](http://localhost:1313/docs/reference/rest_api/) is the best, most complete source of information about the key-value API endpoints.

## Namespaces

Each key-value pair is associated with a "namespace", which is simply a way to group KV pairs together in logical groups.

Examples:

* An app might have it's own namespace to make it clear what key-value pairs belong to the app.
* A reload chain that need to pass parameters from app to app can have it's own namespace.

The `Butler.keyValueStore.maxKeysPerNamespace` property in the main config file controls how many KV pairs can be created in each namespace. If no value is specified in the config file, a default value of 1000 KV pairs per namespace is used.

## Time to live

When key-value pairs are created an optional time-to-live (ttl) parameter may also be passed in the call to Butler's API.

If the ttl parameter is specified (=set to a non-zero value, unit is milliseconds) the created KV pair will only exist for that long.

If a KV pair with a running ttl clock is updated before the KV pair expires, the current ttl clock will be discarded and replaced with the ttl value from the new KV pair.

In other words: The ttl is relative to the **last** update of the KV pair in question.
