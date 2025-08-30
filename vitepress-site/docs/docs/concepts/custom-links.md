# Custom Links in Alerts

Include custom links to external systems in email, Slack, and Microsoft Teams alert messages.

## What are Custom Links?

Butler can include custom links in alert messages sent to email, Slack, and Microsoft Teams. These links provide quick access to related systems and information when alerts are triggered.

Common use cases include:

- **Ticketing Systems**: Direct links to create tickets for failed reloads
- **Monitoring Tools**: Quick access to system dashboards and metrics
- **Documentation**: Links to troubleshooting guides and runbooks
- **Management Consoles**: Direct access to QMC, Hub, or specific applications

The links are defined in Butler's configuration and are available as template variables in alert message templates.

## Link Categories

Butler supports two categories of links in alert messages:

### Qlik Sense System Links

Standardized links to core Qlik Sense interfaces:

- **QMC (Qlik Management Console)**: Administrative interface
- **Hub**: User interface for accessing applications
- **App URLs**: Direct links to specific Qlik Sense applications

### Generic Custom Links

Flexible links to any external system or resource:

- **Incident Management**: PagerDuty, ServiceNow, Jira Service Management
- **Monitoring**: Grafana dashboards, New Relic, DataDog
- **Documentation**: Confluence pages, internal wikis, troubleshooting guides
- **Communication**: Slack channels, Teams groups, email distribution lists

## Client-Managed vs Qlik Sense Cloud

The configuration approach differs slightly between client-managed Qlik Sense and Qlik Sense Cloud:

### Client-Managed Qlik Sense

For on-premises Qlik Sense deployments:

```yaml
Butler:
  qlikSenseUrls:
    qmc: https://qlik.company.com/qmc
    hub: https://qlik.company.com/hub
    appBaseUrl: https://qlik.company.com/sense/app
```

### Qlik Sense Cloud

For SaaS deployments:

```yaml
Butler:
  qlikSenseCloud:
    enable: true
    event:
      mqtt:
        tenant:
          tenantUrl: https://tenant.region.qlikcloud.com
          qlikSenseUrls:
            qmc: https://tenant.region.qlikcloud.com/qmc
            hub: https://tenant.region.qlikcloud.com/hub
```

::: info App URLs in Cloud
Qlik Sense Cloud doesn't use a fixed `appBaseUrl` setting. Instead, Butler automatically constructs app URLs using the tenant URL and app ID.
:::

## Custom Link Configuration

### Generic URL Configuration

Define reusable links that can be included in any alert:

```yaml
Butler:
  genericUrls:
    - id: company_monitoring
      linkText: Company Monitoring Dashboard
      comment: Primary monitoring dashboard for all systems
      url: https://monitoring.company.com/dashboard/qlik-sense

    - id: incident_management
      linkText: Create Incident Ticket
      comment: ServiceNow incident creation portal
      url: https://company.service-now.com/nav_to.do?uri=incident.do

    - id: troubleshooting_guide
      linkText: Qlik Sense Troubleshooting Guide
      comment: Internal documentation for common issues
      url: https://wiki.company.com/qlik-sense/troubleshooting

    - id: team_slack
      linkText: #qlik-support Slack Channel
      comment: Primary support channel for Qlik Sense issues
      url: https://company.slack.com/channels/qlik-support
```

### Link Properties

Each custom link includes:

- **`id`**: Unique identifier used in templates (required)
- **`linkText`**: Display text for the link (required)
- **`comment`**: Description for documentation purposes (optional)
- **`url`**: Target URL (required)

## Using Links in Templates

Custom links are available as template variables in alert messages. The exact usage depends on the destination format:

### Email Templates

In HTML email templates:

```html
<p>Useful links:</p>
<ul>
  <li><a href="{{qlikSenseUrls.qmc}}">Qlik Management Console</a></li>
  <li><a href="{{qlikSenseUrls.hub}}">Qlik Sense Hub</a></li>
  <li>
    <a href="{{genericUrls.company_monitoring.url}}"
      >{{genericUrls.company_monitoring.linkText}}</a
    >
  </li>
  <li>
    <a href="{{genericUrls.incident_management.url}}"
      >{{genericUrls.incident_management.linkText}}</a
    >
  </li>
</ul>
```

### Slack Templates

In Slack message templates:

```json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Quick actions:\n• <{{qlikSenseUrls.qmc}}|QMC>\n• <{{genericUrls.incident_management.url}}|Create Ticket>"
      }
    }
  ]
}
```

### Teams Templates

In Microsoft Teams adaptive cards:

```json
{
  "type": "ActionSet",
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "{{genericUrls.company_monitoring.linkText}}",
      "url": "{{genericUrls.company_monitoring.url}}"
    },
    {
      "type": "Action.OpenUrl",
      "title": "QMC",
      "url": "{{qlikSenseUrls.qmc}}"
    }
  ]
}
```

## Complete Configuration Example

Here's a comprehensive configuration showing both Qlik Sense and custom links:

```yaml
Butler:
  # Client-managed Qlik Sense URLs
  qlikSenseUrls:
    qmc: https://qlik.company.com/qmc
    hub: https://qlik.company.com/hub
    appBaseUrl: https://qlik.company.com/sense/app

  # Custom links for external systems
  genericUrls:
    # Monitoring and Dashboards
    - id: grafana_qlik
      linkText: Qlik Sense Grafana Dashboard
      comment: Real-time monitoring of Qlik Sense performance
      url: https://grafana.company.com/d/qlik-sense-overview

    - id: newrelic_apm
      linkText: New Relic APM
      comment: Application performance monitoring
      url: https://rpm.newrelic.com/accounts/123456/applications/789012

    # Incident Management
    - id: pagerduty_incident
      linkText: Create PagerDuty Incident
      comment: Escalate critical issues to on-call team
      url: https://company.pagerduty.com/incidents/new

    - id: servicenow_ticket
      linkText: Create ServiceNow Ticket
      comment: Standard ticketing system for IT issues
      url: https://company.service-now.com/nav_to.do?uri=incident.do

    # Documentation and Guides
    - id: runbook_reload_failures
      linkText: Reload Failure Runbook
      comment: Step-by-step troubleshooting guide
      url: https://wiki.company.com/qlik/troubleshooting/reload-failures

    - id: escalation_matrix
      linkText: Escalation Matrix
      comment: Contact information for different issue types
      url: https://wiki.company.com/qlik/support/escalation-matrix

    # Communication Channels
    - id: slack_qlik_alerts
      linkText: #qlik-alerts Slack Channel
      comment: Automated alerts and team discussion
      url: https://company.slack.com/channels/qlik-alerts

    - id: teams_ops_group
      linkText: Operations Team Channel
      comment: Operations team in Microsoft Teams
      url: https://teams.microsoft.com/l/team/19%3a...

  # Qlik Sense Cloud configuration (if applicable)
  qlikSenseCloud:
    enable: false
    event:
      mqtt:
        tenant:
          id: tenant.region.qlikcloud.com
          tenantUrl: https://tenant.region.qlikcloud.com
          qlikSenseUrls:
            qmc: https://tenant.region.qlikcloud.com/qmc
            hub: https://tenant.region.qlikcloud.com/hub
```

## Alert Template Integration

### Template Documentation

For detailed information on using links in alert templates, see the [Alert Template Fields](/docs/reference/alert-template-fields/) documentation.

### Template Variables Available

**Qlik Sense URLs:**

- `{{qlikSenseUrls.qmc}}` - QMC URL
- `{{qlikSenseUrls.hub}}` - Hub URL
- `{{qlikSenseUrls.appBaseUrl}}/{{appId}}` - Direct app URL (client-managed)

**Custom URLs:**

- `{{genericUrls.<id>.url}}` - Custom link URL
- `{{genericUrls.<id>.linkText}}` - Custom link display text
- `{{genericUrls.<id>.comment}}` - Custom link description

## Best Practices

### Link Organization

1. **Categorize by Purpose**: Group links by function (monitoring, incident management, documentation)
2. **Use Descriptive IDs**: Choose clear, consistent naming for link identifiers
3. **Include Comments**: Document the purpose and context of each link
4. **Regular Updates**: Keep URLs current and remove obsolete links

### Template Design

1. **Relevant Links Only**: Include only links that are useful for the specific alert type
2. **Clear Text**: Use descriptive link text that explains what the user will find
3. **Visual Grouping**: Organize links logically in email and Teams templates
4. **Mobile Friendly**: Ensure links work well on mobile devices

### Security Considerations

1. **Internal URLs**: Consider whether external notification systems can access internal links
2. **Authentication**: Ensure linked systems handle authentication appropriately
3. **Sensitive Information**: Avoid including sensitive data in URLs
4. **URL Validation**: Regularly verify that configured URLs are accessible

### Maintenance

1. **Test Links**: Regularly verify that all configured URLs are working
2. **Update Documentation**: Keep comments current when URLs change
3. **Version Control**: Track configuration changes in version control
4. **Environment Consistency**: Ensure links work across development, test, and production environments

::: tip Template Development

When developing alert templates:

1. **Start Simple**: Begin with basic Qlik Sense links before adding custom URLs
2. **Test Thoroughly**: Verify links work in all destination formats (email, Slack, Teams)
3. **Consider Context**: Include links that are most relevant to the specific alert scenario
4. **User Experience**: Design the link presentation for clarity and ease of use

:::
