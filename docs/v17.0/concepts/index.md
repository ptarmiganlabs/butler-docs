# Concepts

Deep dive into the various components that make up Butler.

## Core Concepts

Butler provides several key features that extend primarily client-managed Qlik Sense with additional capabilities, but some features can also be used with Qlik Sense Cloud.

### Monitoring & Alerting

- **[Failed Reloads](/v17.0/concepts/reload-tasks/)** - Get notified when reload tasks fail
- **[Successful Reloads](/v17.0/concepts/successful-reloads)** - Track successful task completions for performance insights
- **[Windows Services](/v17.0/concepts/windows-services)** - Monitor critical Qlik Sense services across multiple servers
- **[Server Version](/v17.0/concepts/server-version)** - Track Qlik Sense server versions for compliance and planning

### License Management

- **[Server License](/v17.0/concepts/qlik-sense-licenses/server-license)** - Monitor and manage Qlik Sense server licenses
- **[Access Licenses](/v17.0/concepts/qlik-sense-licenses/access-licenses)** - Monitor and automatically manage user access licenses

### Incident Management

- **[Incident Management Overview](/v17.0/concepts/incident-management/)** - Comprehensive incident management and alerting
- **[New Relic Integration](/v17.0/concepts/incident-management/new-relic)** - Connect Butler with New Relic for observability and incident management
- **[Signl4 Integration](/v17.0/concepts/incident-management/signl4)** - Modern cloud-based incident management and team alerting

### Communication & Integration

- **[Teams Messaging](/v17.0/concepts/teams-messaging)** - Send automated notifications to Microsoft Teams channels
- **[MQTT](/v17.0/concepts/mqtt/)** - Connect to IoT and automation systems
- **[Custom Links](/v17.0/concepts/custom-links)** - Include helpful links in alert messages
- **[UDP Client](/v17.0/concepts/udp-client)** - Built-in testing tool for UDP message debugging

### Task Management

- **[Scheduler](/v17.0/concepts/scheduler/)** - Advanced Cron-like scheduling for precise task control
- **[Start Sense Tasks](/v17.0/concepts/start-sense-tasks)** - Programmatically trigger reload tasks via REST API
- **[Key-Value Store](/v17.0/concepts/key-value)** - Pass parameters between tasks and applications

### File Operations

- **[File System Access](/v17.0/concepts/file-system-access)** - Secure file copy, move, and delete operations

## Getting Started

If you're new to Butler, we recommend starting with:

1. [Getting Started Guide](/v17.0/getting-started/) - Basic setup and installation
2. [Failed Reload Notifications](/v17.0/concepts/reload-tasks/) - Most popular feature
3. [Configuration Reference](/v17.0/reference/config-file) - Understanding the config file

::: tip Next Steps
Each concept page includes practical examples and configuration details to help you implement Butler features in your Qlik Sense environment.
:::
