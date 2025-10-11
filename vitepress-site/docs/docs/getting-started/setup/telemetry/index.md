---
title: "Configuring telemetry"
linkTitle: "Telemetry"
weight: 350
description:
---

## What's this?

A description of Butler's telemetry feature is available [here](/docs/about/telemetry/).

## Settings in config file

```yaml
---
Butler:
  # Logging configuration
  ...
  ...
  anonTelemetry: true     # Can Butler send anonymous data about what computer it is running on? 
                          # More info on whata data is collected: https://butler.ptarmiganlabs.com/docs/about/telemetry/
                          # Please consider leaving this at true - it really helps future development of Butler!
  ...
  ...
```

Setting `anonTelemetry` to true enables telemetry, setting it to false disables telemetry.
