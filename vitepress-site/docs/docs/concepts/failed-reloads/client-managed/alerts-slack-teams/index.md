# Alerts via Slack and Microsoft Teams

Sending alerts to IM services like Slack and Microsoft Teams can be a great way to quickly notify people about urgent issues.

## Teams, Slack and Email Notifications

Microsoft Teams, Slack and email are all notification **destinations**.

Alert messages/notifications come in two variants: "basic" and "formatted".

### Formatted Messages

These messages take full advantage of the formatting available in each notification destination.

Slack has its own way for creating messages with rich layout and formatting - as does Teams and email.

Formatted messages are created using template files. Each notification destination has its own set of template files. It's therefore possible to take advantage of each destination's specific features when it comes to formatting the messages sent by Butler.

Message templates can include "template fields". These are placeholders that are replaced with actual event values before the message is sent.

The GitHub repository includes fully functional template files for all destinations.

### Basic Messages

Basic message formats are available for all notification destinations.

This message type is useful if you only want a short, basic notification that a task failed or was aborted. The basic formats are pre-defined and are thus easy to set up.

## Microsoft Teams Notifications

Basic and formatted reload task failure notifications can look like this in Teams:

![Basic failed reload notification in Microsoft Teams](/img/failed-reload-teams-basic_1.png)

![Formatted failed reload notification in Microsoft Teams](/img/failed-reload-teams-formatted_1.png)

### Teams Configuration Example

```yaml
Butler:
  teamsNotification:
    enable: true

    # Webhook URLs for different Teams channels
    webhooks:
      critical: "https://company.webhook.office.com/webhookb2/critical-alerts"
      general: "https://company.webhook.office.com/webhookb2/general-ops"

    # Configure when to send Teams notifications
    reloadTaskFailure:
      enable: true
      webhook: "critical"
      messageCard: true
      includeScriptLog: true

    reloadTaskAborted:
      enable: true
      webhook: "general"
      messageCard: true
```

### Teams Message Features

- **Rich Cards**: Interactive message cards with structured information
- **Action Buttons**: Quick links to QMC, app dashboards, or runbooks
- **Threaded Conversations**: Maintain context around specific incidents
- **Mentions**: Notify specific team members or channels
- **Emojis**: Visual indicators for different severity levels

## Slack Notifications

Basic and formatted reload task failure notifications can look like this in Slack:

![Basic failed reload notification in Slack](/img/failed-reload-slack-basic_1.png)

![Formatted failed reload notification in Slack](/img/failed-reload-slack-formatted_1.png)

### Slack Configuration Example

```yaml
Butler:
  slackNotification:
    enable: true

    # Slack webhook URLs
    webhooks:
      ops-alerts: "https://hooks.slack.com/services/T00000000/B00000000/XXXX"
      dev-alerts: "https://hooks.slack.com/services/T00000000/B00000000/YYYY"

    # Message configuration
    reloadTaskFailure:
      enable: true
      webhook: "ops-alerts"
      channel: "#qlik-alerts"
      messageType: "formatted"
      iconEmoji: ":warning:"

    # Custom message templates
    templates:
      basic: "Reload failed for app: {{appName}} ({{taskName}})"
      formatted: "/path/to/slack-template.json"
```

### Slack Message Features

- **Rich Formatting**: Bold, italic, code blocks, and lists
- **Blocks and Attachments**: Structured message layouts
- **Interactive Elements**: Buttons and dropdown menus
- **Channel Routing**: Send different alerts to different channels
- **User Mentions**: Notify specific users or groups
- **Emoji Reactions**: Quick acknowledgment system

## Message Templates

### Handlebars Templating

Both Teams and Slack notifications use Handlebars templating for dynamic content:

```handlebars
{ "title": "🚨 Reload Failed:
{{appName}}", "text": "Reload task '{{taskName}}' failed on server
{{hostName}}", "facts": [ { "name": "App Name", "value": "{{appName}}" }, {
"name": "Error", "value": "{{errorMessage}}" }, { "name": "Duration", "value": "{{executionDuration}}"
} ] }
```

### Available Template Fields

Common template fields available for both platforms:

- `{{appName}}` - Application name
- `{{taskName}}` - Reload task name
- `{{errorMessage}}` - Failure error message
- `{{scriptLog}}` - Last lines of the reload script log
- `{{hostName}}` - Server where reload was attempted
- `{{timestamp}}` - When the failure occurred
- `{{executionDuration}}` - How long the reload ran before failing

For a complete list, see the [template fields reference](/docs/reference/alert-template-fields/).

## Advanced Configuration

### Environment-Specific Routing

```yaml
Butler:
  # Teams configuration
  teamsNotification:
    enable: true

    webhooks:
      prod-critical: "https://company.webhook.office.com/prod-critical"
      dev-general: "https://company.webhook.office.com/dev-general"

    # Route based on app environment
    routing:
      production:
        webhook: "prod-critical"
        appFilter: ["*-PROD", "Executive-*"]
      development:
        webhook: "dev-general"
        appFilter: ["*-DEV", "*-TEST"]

  # Slack configuration
  slackNotification:
    enable: true

    webhooks:
      production: "https://hooks.slack.com/services/PROD"
      development: "https://hooks.slack.com/services/DEV"

    # Business hours configuration
    businessHours:
      enable: true
      timezone: "America/New_York"
      weekdays:
        start: "08:00"
        end: "18:00"
      weekends: false
```

### Rate Limiting and Throttling

```yaml
Butler:
  teamsNotification:
    # Prevent alert flooding
    rateLimit:
      enable: true
      maxAlerts: 10
      timeWindow: 3600 # 1 hour

    # Group similar alerts
    alertGrouping:
      enable: true
      groupWindow: 300 # 5 minutes
      maxGroupSize: 5

  slackNotification:
    # Similar rate limiting for Slack
    rateLimit:
      enable: true
      maxAlerts: 15
      timeWindow: 3600
```

### Conditional Alerting

```yaml
Butler:
  teamsNotification:
    # Only alert for critical apps
    conditions:
      criticalAppsOnly:
        enable: true
        customProperty: "Butler_Critical"
        requiredValue: "Yes"

      # Skip alerts for test reloads
      excludeTestTasks:
        enable: true
        taskNameFilter: ["*test*", "*sandbox*"]
```

## Best Practices

### Channel Organization

**Teams Channels**:

- `#qlik-critical` - Production failures requiring immediate attention
- `#qlik-operations` - General operational notifications
- `#qlik-development` - Development environment alerts

**Slack Channels**:

- `#alerts-critical` - High-priority production issues
- `#alerts-general` - Standard operational notifications
- `#alerts-dev` - Development and testing alerts

### Message Design

**Clear Subject Lines**:

- Include severity indicator (🚨, ⚠️, ℹ️)
- Mention environment (PROD, DEV, TEST)
- Include app or system name

**Essential Information**:

- What failed (app name, task name)
- When it failed (timestamp)
- Where it failed (server, environment)
- Why it failed (error message)
- Next steps (runbook links, contact info)

### Escalation Integration

```yaml
Butler:
  # Integrate with incident management
  escalation:
    # Escalate to PagerDuty after repeated failures
    pagerDuty:
      enable: true
      trigger: "critical"
      webhook: "https://events.pagerduty.com/generic/2010-04-15/create"

    # Copy critical alerts to multiple channels
    criticalAlertRouting:
      teams: ["#qlik-critical", "#ops-managers"]
      slack: ["#alerts-critical", "#on-call"]
```

## Troubleshooting

### Common Issues

**Messages Not Appearing**:

- Verify webhook URLs are correct and active
- Check Butler logs for HTTP errors
- Validate message template JSON format
- Ensure Teams/Slack app permissions

**Formatting Problems**:

- Test message templates with sample data
- Validate Handlebars syntax
- Check for special character escaping
- Verify platform-specific formatting rules

**Rate Limiting**:

- Monitor webhook response codes
- Implement exponential backoff
- Use message grouping to reduce volume
- Consider multiple webhooks for high volume

### Debug Configuration

```yaml
Butler:
  teamsNotification:
    debug: true
    logLevel: "debug"
    logWebhookResponses: true

  slackNotification:
    debug: true
    logLevel: "debug"
    validateTemplates: true
```

The configuration needed for setting this up is described in the [setup documentation](/docs/getting-started/setup/reload-alerts/).

::: tip Quick Setup
Both Teams and Slack provide webhook URLs that make integration straightforward. Start with basic notifications and gradually enhance with formatted templates as your team's needs evolve.
:::

::: warning Webhook Security
Store webhook URLs securely and rotate them regularly. Monitor webhook access logs for unauthorized usage. Consider using dedicated service accounts for Butler integrations.
:::

## Next Steps

- **[Teams Setup Guide](/docs/getting-started/setup/reload-alerts/alert-teams/)** - Configure Microsoft Teams integration
- **[Slack Setup Guide](/docs/getting-started/setup/reload-alerts/alert-slack/)** - Configure Slack integration
- **[Template Fields](/docs/reference/alert-template-fields/)** - Complete template variable reference
- **[Email Alerts](/docs/concepts/failed-reloads/client-managed/alert-emails/)** - Alternative email notifications
