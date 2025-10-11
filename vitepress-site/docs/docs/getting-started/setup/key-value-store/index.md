---
title: "Configuring the key-value store"
linkTitle: "Key-value store"
weight: 120
description: >
  Butler contains a key-value store that is accessible via the REST API.
---

## What's this?

The key-value has several use cases:

- Pass parameters between apps in a reload chain
- Share state or other data between app reloads
- Share state between extensions, mashups or other web apps.
- Store data with a time-to-live property. Can be used to create timeouts in app reload chains.

## How it works

The data in the key-value store is _not_ persisted to disk, which means that key-value data will be lost if Butler is restarted.  
This behavior could possibly be changed if there is a need, please open a [GitHub ticket](https://github.com/ptarmiganlabs/butler/issues) if key-value persistence is of interest.

Key-value data is manipulated using Butler's [REST API](/docs/reference/rest-api-1/?operationsSorter=alpha).

The [Reference docs](/docs/reference/key-value/) section has more information about the key-value store.

## Settings in config file

```yaml
---
Butler:
  ...
  ...
  # Key-value store
  keyValueStore:
    enable: false                                     # Should Butler's key-value store be enabled?
    maxKeysPerNamespace: 1000                         # Max keys that can be stored per namespace. Defaults to 1000 if not specified in this file.
  ...
  ...
```
