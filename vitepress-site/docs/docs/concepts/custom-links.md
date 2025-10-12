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
