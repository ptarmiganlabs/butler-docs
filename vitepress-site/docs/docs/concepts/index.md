# Concepts

Deep dive into the various components that make up Butler.

## Core Concepts

Butler provides several key features that extend Qlik Sense Enterprise capabilities:

### Monitoring & Alerting
- **Failed Reloads** - Get notified when reload tasks fail (coming soon)
- **Successful Reloads** - Track successful task completions (coming soon)
- **Windows Services** - Monitor critical Qlik Sense services (coming soon)

### Task Management
- **Scheduler** - Advanced Cron-like scheduling (coming soon)
- **Start Sense Tasks** - Programmatically trigger reload tasks (coming soon)
- **[Key-Value Store](/docs/concepts/key-value)** - Pass parameters between tasks

### Integration & Communication
- **MQTT** - Connect to IoT and automation systems (coming soon)
- **Session Events** - Monitor user session activity (coming soon)
- **Real-time Metrics** - Stream metrics to external systems (coming soon)

### File Operations
- **File System Access** - Secure file operations (coming soon)

### External Services
- **Incident Management Tools** - Integration with alerting platforms (coming soon)

## Architecture

Butler acts as a bridge between Qlik Sense Enterprise and external systems, providing:

1. **Event-driven architecture** - React to Qlik Sense events in real-time
2. **REST API** - Programmatic access to Butler features
3. **Secure communication** - Certificate-based authentication with Qlik Sense
4. **Flexible configuration** - YAML-based configuration for all features

## Getting Started

If you're new to Butler, we recommend starting with:

1. [Getting Started Guide](/docs/getting-started/) - Basic setup and installation
2. Failed Reload Notifications - Most popular feature (coming soon)
3. Configuration Reference - Understanding the config file (coming soon)

::: tip Next Steps
Each concept page includes practical examples and configuration details to help you implement Butler features in your Qlik Sense environment.
:::