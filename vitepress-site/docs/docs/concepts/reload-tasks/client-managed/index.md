# Client-managed Qlik Sense

Below follows a list of destinations to which Butler can send notifications when a reload task fails or is aborted.

A comparison of the different alert destinations can be options can be found in the [setup documentation](/docs/getting-started/setup/reload-alerts/).

## Alert Destinations

Butler supports multiple notification channels for reload failures in client-managed Qlik Sense:

### Email Notifications

- **[Alert Emails](/docs/concepts/failed-reloads/client-managed/alert-emails/)** - Comprehensive HTML email alerts with script logs and custom formatting

### Messaging Platforms

- **[Slack & Teams Alerts](/docs/concepts/failed-reloads/client-managed/alerts-slack-teams/)** - Rich formatted messages to Slack channels and Microsoft Teams

### Incident Management

- **[New Relic](/docs/concepts/incident-management/new-relic)** - Send alerts to New Relic for incident tracking and analysis
- **[Signl4](/docs/concepts/incident-management/signl4)** - Mobile-first incident management with escalation policies

### Data Storage & Analytics

- **InfluxDB** - Store failed reload metrics for trending and analysis
- **MQTT** - Publish alerts to MQTT brokers for IoT integration
- **Webhooks** - Send HTTP callbacks to custom endpoints

### File System

- **Failed Logs Storage** - Automatically save failed reload script logs to disk for analysis

## Key Features

All alert destinations support:

- **Rich Context**: Include app metadata, error details, and script log excerpts
- **Custom Templates**: Handlebars-based templating for personalized alert content
- **Selective Alerting**: Configure alerts for specific tasks, apps, or environments
- **Multi-Channel**: Send the same alert to multiple destinations simultaneously
- **Rate Limiting**: Prevent alert flooding with configurable thresholds

## Configuration Overview

Each alert destination can be configured independently with:

- **Trigger Conditions**: When to send alerts (failed, aborted, or both)
- **Content Formatting**: What information to include in alerts
- **Recipient Targeting**: Who should receive alerts for different scenarios
- **Delivery Options**: How and when alerts are delivered

For detailed configuration instructions, see the [setup documentation](/docs/getting-started/setup/reload-alerts/).
