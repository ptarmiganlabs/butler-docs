# Signl4 Integration

Modern cloud-based incident management and alert notification service designed for operational teams.

## What is Signl4?

Signl4 is a incident management platform focused on reliable alert delivery and collaboration within smaller teams.  
It excels at ensuring critical alerts reach the right people with mobile being the preferred delivery method, with escalation policies and persistent notifications.

### Key Capabilities

- **Multi-Channel Alerting**: Push notifications, SMS, email
- **Intelligent Escalation**: Automatic escalation based on acknowledgment status
- **Team Collaboration**: Shared incident management with role-based access
- **Mobile-First Design**: Native mobile apps for iOS and Android
- **Duty Scheduling**: Built-in on-call rotation management
- **Integration Hub**: Connects with monitoring tools, ITSM, and communication platforms

## How Butler Integrates with Signl4

### Integration Architecture

Butler sends incidents to Signl4 via webhooks, creating a robust alert management workflow:

1. **Webhook Delivery**: Butler sends structured alerts to Signl4 webhook endpoints
2. **Alert Processing**: Signl4 processes and categorizes incoming alerts
3. **Team Notification**: Alerts are distributed to appropriate team members
4. **Escalation Management**: Unacknowledged alerts follow escalation policies
5. **Incident Tracking**: All alerts and responses are tracked in Signl4 dashboard

## Integration Benefits

### Reliable Alert Delivery

- **Guaranteed Delivery**: Multiple delivery channels ensure alerts reach recipients
- **Persistent Notifications**: Alerts continue until acknowledged or escalated
- **Offline Handling**: SMS and voice calls work even without internet connectivity
- **Delivery Confirmation**: Real-time confirmation of alert delivery and acknowledgment

### Team Coordination

- **Shared Incidents**: Multiple team members can collaborate on incident resolution
- **Real-Time Updates**: Status changes are synchronized across all team members
- **Communication Thread**: Built-in chat for incident-related communication
- **Knowledge Base**: Link incidents to documentation and runbooks

### Operational Intelligence

- **Incident Analytics**: Detailed reporting on alert volume, response times, and patterns
- **Team Performance**: Track individual and team response metrics
- **Historical Trends**: Identify recurring issues and improvement opportunities
- **Custom Dashboards**: Visualize operational metrics and KPIs

## Mobile App Features

Signl4's mobile apps provide incident management capabilities:

### Real-Time Notifications

- **Push Notifications**: Instant delivery with rich content
- **Sound Profiles**: Custom notification sounds for different alert types
- **Vibration Patterns**: Haptic feedback for silent mode alerting
- **Badge Counters**: Visual indicators of pending incidents

### Incident Management

- **One-Tap Acknowledgment**: Quick response to incoming alerts
- **Status Updates**: Real-time incident status changes
- **Team Chat**: Collaborative communication within incidents
- **Escalation Control**: Manual escalation to senior team members

### Dashboard Views

- **Active Incidents**: Overview of all current incidents
- **Team Status**: See who's on-call and availability
- **Alert History**: Historical view of all incidents
- **Performance Metrics**: Personal and team statistics

## Configuration Requirements

### Signl4 Setup

1. **Account Creation**: Create Signl4 team account
2. **Team Configuration**: Add team members and define roles
3. **Webhook Endpoints**: Generate webhook URLs for Butler integration
4. **Escalation Policies**: Define alert escalation rules
5. **Mobile Apps**: Install and configure mobile apps for team members

## Troubleshooting

### Common Issues

**Alerts Not Delivered**:

- Verify webhook URL and team secret
- Check Butler logs for HTTP errors
- Validate JSON payload format
- Test webhook endpoint manually

**Mobile Notifications Missing**:

- Verify mobile app is updated
- Check notification permissions
- Ensure background refresh enabled
- Test push notification delivery

**Escalation Not Working**:

- Review escalation policy configuration
- Check team member availability status
- Verify contact information accuracy
- Test escalation rules manually

## Best Practices

### Alert Design

- **Clear Titles**: Use descriptive, actionable alert titles
- **Rich Context**: Include all necessary troubleshooting information
- **Consistent Categories**: Use standardized categorization across all alerts
- **Priority Mapping**: Align priorities with business impact

### Team Organization

- **Role Definition**: Clearly define team member roles and responsibilities
- **Escalation Paths**: Design escalation policies that match operational needs
- **On-Call Scheduling**: Balance workload and maintain coverage
- **Training**: Ensure all team members understand the incident management process

::: tip Getting Started

1. **Create Signl4 Team**: Set up team account and add initial members
2. **Install Mobile Apps**: Ensure all team members have mobile apps configured
3. **Generate Webhook**: Create webhook URL for Butler integration
4. **Configure Butler**: Enable Signl4 integration with basic settings
5. **Test Integration**: Send test alerts to verify delivery
6. **Setup Escalation**: Define escalation policies for different scenarios

:::

::: warning Webhook Security

Signl4 webhooks should be treated as sensitive endpoints:

- Use HTTPS for all webhook URLs
- Store team secrets securely
- Monitor webhook access logs
- Rotate team secrets regularly
- Validate webhook payload authenticity

:::

## Next Steps

- **[Setup Guide](/docs/getting-started/setup/incident-mgmt-tools/signl4/)** - Step-by-step configuration
- **[Alert Templates](/docs/reference/alert-template-fields/)** - Customize alert payloads
- **[Mobile App Guide](https://signl4.com/mobile-app/)** - Mobile app configuration and features
