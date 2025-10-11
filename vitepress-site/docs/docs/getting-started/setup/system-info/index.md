---
title: "System Information Collection"
linkTitle: "System information"
weight: 360
description: >
  Control whether Butler collects detailed system information about the environment it's running in.
---

## What's this?

Butler can collect detailed information about the system it's running on. This includes information about:

- Operating system and platform
- CPU architecture and details
- Memory usage
- Network interfaces
- Node.js version
- Butler version

This information is useful for:

- **Troubleshooting**: When reporting issues or getting support, system information helps diagnose problems
- **Monitoring**: Understanding Butler's resource usage and environment
- **Documentation**: Keeping track of deployment configurations across different environments
- **Compliance**: In some organizations, it's important to track what software is running where

## Security considerations

The system information feature collects details about the host system Butler is running on. In security-sensitive environments, you may want to disable this feature to minimize information exposure.

::: warning
If you're running Butler in a highly secure environment where even basic system information should not be collected or logged, consider setting `Butler.systemInfo.enable` to `false`.
:::

## When to disable

Consider disabling system information collection in these scenarios:

- **High-security environments**: Where system information disclosure is restricted
- **Compliance requirements**: When organizational policies prohibit system information collection
- **Privacy concerns**: In shared hosting environments where system details should remain private
- **Minimal footprint**: When you want Butler to have the smallest possible system impact

## Performance impact

The system information collection has minimal performance impact:

- Information is collected **only at Butler startup**
- No ongoing system probing or monitoring occurs
- The collected data is small (typically a few kilobytes)
- No significant CPU or memory overhead

## Settings in config file

```yaml
Butler:
  ...
  ...
  # System information
  # Should detailed system information be collected?
  # Set to false in security-sensitive environments.
  systemInfo:
    enable: true
  ...
  ...
```

## Default behavior

By default, system information collection is **enabled** (`enable: true`).

Butler will collect and log system information at startup, which appears in the Butler logs and can be useful for troubleshooting and support purposes.

## What information is collected?

When enabled, Butler collects:

- **Operating system**: Name, version, and platform (Windows, Linux, macOS, etc.)
- **CPU**: Architecture (x64, arm64, etc.), number of cores
- **Memory**: Total system memory and available memory at startup
- **Network**: Network interface information
- **Node.js**: Version of Node.js Butler is running on
- **Butler**: Version of Butler itself

::: info
System information is collected once at Butler startup and logged. It is not continuously monitored or transmitted anywhere unless you explicitly configure Butler to send logs or metrics to external systems (like New Relic or InfluxDB).
:::

## Example output

When system information collection is enabled, you'll see output similar to this in Butler's startup logs:

```
2024-01-15T10:30:45.123Z info: -----------------------------------------------------------
2024-01-15T10:30:45.124Z info: Butler
2024-01-15T10:30:45.125Z info: Version: 13.1.2
2024-01-15T10:30:45.126Z info: 
2024-01-15T10:30:45.127Z info: System information:
2024-01-15T10:30:45.128Z info:   Platform: linux
2024-01-15T10:30:45.129Z info:   Architecture: x64
2024-01-15T10:30:45.130Z info:   Node.js version: v18.17.0
2024-01-15T10:30:45.131Z info:   Total memory: 16.00 GB
2024-01-15T10:30:45.132Z info:   Free memory: 8.45 GB
2024-01-15T10:30:45.133Z info: -----------------------------------------------------------
```
