# Successful Reloads

Track and monitor successful reload task completions for performance insights and operational awareness.

## What's this?

Butler can track successfully completed reload tasks.  
While most Sense admins focus on failed reloads, monitoring successful ones provides valuable insights for performance planning and operational awareness.

Tracking successful reloads helps you:

- Understand reload duration patterns and performance trends
- Plan server capacity and scheduling optimization
- Monitor overall system health and throughput
- Identify performance degradation over time

## Monitoring Options

Butler provides flexible options for tracking successful reloads:

### All Reload Tasks

- **Configuration**: Set `Butler.influxDb.reloadTaskSuccess.allReloadTasks.enable` to `true`
- **Behavior**: Tracks every successful reload task in your environment, storing data in InfluxDB
- **Use case**: Comprehensive monitoring for smaller environments or when you need complete visibility

### Selective Monitoring via Custom Property

- **Configuration**: Set `Butler.influxDb.reloadTaskSuccess.byCustomProperty.enable` to `true`
- **Custom Property**: Define the property name in `Butler.influxDb.reloadTaskSuccess.byCustomProperty.customPropertyName`
- **Trigger Value**: Set the enabling value in `Butler.influxDb.reloadTaskSuccess.byCustomProperty.enabledValue`
- **Use case**: Monitor only critical applications or specific app categories

::: info Priority Logic
If `allReloadTasks.enable` is set to `true`, the custom property setting is ignored and all tasks are monitored.
:::

## Using Tags for Enhanced Metadata

Both Sense apps and reload tasks can have tags attached (configured in the QMC). Butler can capture these tags and include them in data stored in InfluxDB. These tags are referred to as "dynamic" tags as their values can differ between different apps and tasks.

### Benefits of Tags

- **InfluxDB Integration**: Tags become InfluxDB tags for efficient filtering and querying
- **Grafana Dashboards**: Enable dynamic filtering and grouping in visualizations
- **Static Tags**: Static tags are defined in the YAML config file and added to each datapoint stored in InfluxDB

## Grafana Dashboards and Insights

The data stored in InfluxDB enables powerful Grafana visualizations:

### Performance Analysis

- **Duration Distribution**: Understand reload time variations and identify outliers
- **Performance Trends**: Track how reload times change over time
- **Server Load Analysis**: Identify optimal scheduling windows

### Operational Insights

- **Reload Frequency**: Monitor reload patterns across time periods
- **Success Rates**: Combine with failed reload data for comprehensive monitoring
- **Resource Planning**: Use historical data for capacity planning

### Sample Visualizations

<ResponsiveImage 
  src="/img/butler-grafana-successful-reloads-1.png" 
  alt="Successful Reload Analytics"
  maxWidth="900px"
  caption="Dashboard showing reload duration distribution and frequency patterns"
/>

<ResponsiveImage 
  src="/img/butler-grafana-successful-reloads-2.png" 
  alt="Reload Task Metadata"
  maxWidth="900px"
  caption="Detailed view showing available metadata for each reload task"
/>

## Email Notifications

Butler can send email notifications for successful reload completions, useful for:

- Confirming critical ETL processes completed
- Notifying stakeholders of data updates
- Creating audit trails for compliance

::: warning Note
Unlike failed reload notifications, successful reload emails are never automatically sent to app owners for security and spam prevention.
:::

### Email Example

<ResponsiveImage 
  src="/img/butler-qseow-reload-task-success-email-1.png" 
  alt="Successful Reload Email"
  maxWidth="800px"
  caption="Sample email notification for successful reload completion"
/>

## Technical Implementation

### UDP Server Architecture

Butler uses a UDP server to receive reload success messages from Qlik Sense's Log4Net framework:

1. **Message Reception**: UDP server listens on configured port
2. **Data Extraction**: Parse reload duration, app details, user information
3. **Distribution**: Forward to enabled destinations (InfluxDB, email)

### Required Setup

- Log4Net XML appenders must be deployed on Sense servers
- UDP server configuration in Butler config file
- Network connectivity between Sense servers and Butler

::: tip Setup Guide
See the [reload alerts setup guide](/docs/getting-started/setup/task-alerts/#adding-a-log-appender) for XML appender configuration details.
:::

::: tip Best Practices

1. **Start Small**: Begin with custom property-based monitoring for critical apps
2. **Use Tags Effectively**: Leverage both static and dynamic tags for rich metadata
3. **Rate Limiting**: Configure appropriate rate limits to prevent email flooding
4. **Template Customization**: Customize email templates to include relevant context

:::
