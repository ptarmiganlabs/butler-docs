# Alerts via Slack and Microsoft Teams

Sending alerts to IM services like Slack and Microsoft Teams can be a great way to quickly notify people about urgent issues.

## Teams, Slack and Email Notifications

Microsoft Teams, Slack and email are all notification **destinations**.

Alert messages/notifications come in two variants: "basic" and "formatted".

### Formatted Messages

These messages take full advantage of the formatting and customization options available in each notification destination.

Slack has its own way for creating messages with rich layout and formatting - as does Teams and email.

Formatted messages are created using template files. Each notification destination has its own set of template files. It's therefore possible to take advantage of each destination's specific features when it comes to formatting the messages sent by Butler.

Message templates can include "template fields". These are placeholders that are replaced with actual event values before the message is sent.

The GitHub repository includes fully functional template files for all destinations that suppoert formatted messages.

### Basic Messages

Basic message formats are simple, pre-defined text messages that include essential information about the event that triggered the alert.

This message type is useful if you only want a short, basic notification that a task failed or was aborted. The basic formats are pre-defined and are thus easy to set up.

## Microsoft Teams Notifications

Basic and formatted reload task failure notifications can look like this in Teams:

<ResponsiveImage 
  src="/img/failed-reload-teams-basic_1.png" 
  alt="Basic failed reload notification in Microsoft Teams"
  maxWidth="700px"
  caption="Basic reload failure alert in Teams showing essential information"
/>

<ResponsiveImage 
  src="/img/failed-reload-teams-formatted_1.png" 
  alt="Formatted failed reload notification in Microsoft Teams"
  maxWidth="700px"
  caption="Formatted reload failure alert with rich card layout and detailed information"
/>

### Teams Message Features

- **Rich Cards**: Interactive message cards with structured information
- **Action Buttons**: Quick links to QMC, app dashboards, or runbooks
- **Threaded Conversations**: Maintain context around specific incidents
- **Mentions**: Notify specific team members or channels
- **Emojis**: Visual indicators for different severity levels

## Slack Notifications

Basic and formatted reload task failure notifications can look like this in Slack:

<ResponsiveImage 
  src="/img/failed-reload-slack-basic_1.png" 
  alt="Basic failed reload notification in Slack"
  maxWidth="700px"
  caption="Basic reload failure alert in Slack"
/>

<ResponsiveImage 
  src="/img/failed-reload-slack-formatted_1.png" 
  alt="Formatted failed reload notification in Slack"
  maxWidth="700px"
  caption="Formatted reload failure alert with rich formatting and script log"
/>

### Slack Message Features

- **Rich Formatting**: Bold, italic, code blocks, and lists
- **Blocks and Attachments**: Structured message layouts
- **Interactive Elements**: Buttons and dropdown menus
- **Channel Routing**: Send different alerts to different channels
- **User Mentions**: Notify specific users or groups
- **Emoji Reactions**: Quick acknowledgment system

## Message Templates

### Handlebars Templating

Both Teams and Slack notifications use Handlebars templating for dynamic content.  
Sample (but fully functional) templates are included in the distribution ZIP files as well as in the [GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/src/config/).

### Available Template Fields

Common template fields available for both Teams and Slack include:

| Field                                | Description                            |
| ------------------------------------ | -------------------------------------- |
| <code v-pre>{{appName}}</code>       | Application name                       |
| <code v-pre>{{appId}}</code>         | Application ID                         |
| <code v-pre>{{taskName}}</code>      | Reload task name                       |
| <code v-pre>{{taskId}}</code>        | Reload task ID                         |
| <code v-pre>{{taskType}}</code>      | Reload task type                       |
| <code v-pre>{{scriptLogHead}}</code> | First x lines of the reload script log |
| <code v-pre>{{scriptLogTail}}</code> | Last y lines of the reload script log  |

For a complete list, see the [template fields reference](/docs/reference/alert-template-fields/).

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

The configuration needed for setting this up is described in the [setup documentation](/docs/getting-started/setup/task-alerts/).

::: tip Quick Setup
Both Teams and Slack provide webhook URLs that make integration straightforward. Start with basic notifications and gradually enhance with formatted templates as your team's needs evolve.
:::

::: warning Webhook Security
Store webhook URLs securely and rotate them regularly. Monitor webhook access logs for unauthorized usage. Consider using dedicated service accounts for Butler integrations.
:::

## Next Steps

- **[Teams Setup Guide](/docs/getting-started/setup/task-alerts/client-managed/alert-teams/)** - Configure Microsoft Teams integration
- **[Slack Setup Guide](/docs/getting-started/setup/task-alerts/client-managed/alert-slack/)** - Configure Slack integration
- **[Template Fields](/docs/reference/alert-template-fields/)** - Complete template variable reference
- **[Email Alerts](/docs/concepts/reload-tasks/client-managed/alert-emails/)** - Alternative email notifications
