# Real-time Metrics (Deprecated)

::: warning Deprecated Feature
This feature has been deprecated and is no longer actively maintained. While the functionality may still work in current Butler versions, it will be removed in future releases.

**Recommended Alternative**: Use InfluxDB integration with Grafana for real-time monitoring and metrics collection.
:::

## What was Real-time Metrics?

The real-time metrics feature allowed Butler to stream performance and operational metrics from Qlik Sense to external monitoring systems in real-time. This included:

- **Server Performance**: CPU, memory, and disk usage metrics
- **Application Metrics**: User sessions, reload performance, app usage statistics
- **Task Execution**: Real-time task status and duration tracking
- **User Activity**: Session counts, concurrent users, and activity patterns

## Why was it Deprecated?

Several factors led to the deprecation of this feature:

### 1. **Better Alternatives Available**

Modern monitoring solutions provide superior capabilities:

- **InfluxDB + Grafana**: More flexible and powerful metrics storage and visualization
- **Prometheus + Grafana**: Industry-standard monitoring stack
- **Native Qlik Monitoring**: Improved built-in monitoring in recent Qlik Sense versions

### 2. **Maintenance Overhead**

- Complex integration with multiple monitoring systems
- Difficult to maintain compatibility across different versions
- Limited adoption compared to other Butler features

### 3. **Performance Impact**

- Real-time streaming could impact Butler performance under high load
- Resource intensive when monitoring large Qlik Sense deployments
- Potential for data collection to interfere with normal operations

## Migration Path

If you were using the real-time metrics feature, here are recommended alternatives:

### Option 1: InfluxDB + Grafana (Recommended)

Butler's InfluxDB integration provides comprehensive metrics collection:

```yaml
Butler:
  influxDb:
    enable: true
    host: influxdb.company.com
    port: 8086
    # Collect reload task metrics
    reloadTaskSuccess:
      enable: true
    reloadTaskFailure:
      enable: true
    # Collect Windows service metrics
    serviceMonitor:
      enable: true
```

**Benefits:**

- Native Butler integration
- Powerful time-series database
- Rich Grafana visualization options
- Better performance and reliability

### Option 2: Native Qlik Monitoring

Recent Qlik Sense versions include improved monitoring capabilities:

- **Qlik Sense Monitoring Apps**: Built-in monitoring applications
- **Operations Monitor**: Real-time operational dashboards
- **Log Analytics**: Enhanced log analysis capabilities

### Option 3: Third-party Monitoring

Integrate with enterprise monitoring solutions:

- **New Relic**: Butler includes New Relic integration for key metrics
- **DataDog**: Custom webhook integration possible
- **Splunk**: Log forwarding and custom metrics

## Configuration Reference (Historical)

For reference, the deprecated real-time metrics configuration looked like:

```yaml
Butler:
  # DEPRECATED: Real-time metrics streaming
  realTimeMetrics:
    enable: false # Feature disabled by default
    destinations:
      influxdb:
        enable: false
        host: localhost
        port: 8086
        database: qlik_metrics
      prometheus:
        enable: false
        port: 9090
      elasticsearch:
        enable: false
        host: localhost
        port: 9200
    collection:
      serverMetrics:
        enable: false
        interval: 30 # seconds
      appMetrics:
        enable: false
        interval: 60
      userMetrics:
        enable: false
        interval: 10
```

## Current Monitoring Recommendations

For comprehensive Qlik Sense monitoring, we recommend this approach:

### 1. **Butler + InfluxDB + Grafana**

```yaml
Butler:
  influxDb:
    enable: true
    host: influxdb.company.com
    port: 8086
    database: butler_metrics

  # Monitor reload tasks
  reloadTaskSuccess:
    enable: true
  reloadTaskFailure:
    enable: true

  # Monitor Windows services
  serviceMonitor:
    enable: true
    frequency: every 2 minutes
```

### 2. **Key Metrics to Monitor**

- **Task Success/Failure Rates**: Track reload reliability
- **Task Duration Trends**: Monitor performance over time
- **Service Availability**: Ensure critical services stay running
- **User Activity**: Monitor session patterns and usage

### 3. **Alerting Strategy**

- **Failed Reloads**: Immediate notifications via Slack/Teams/Email
- **Service Outages**: Critical alerts for service failures
- **Performance Degradation**: Trend-based alerts for slow reloads
- **Capacity Planning**: Alerts for resource threshold breaches

## Sample Grafana Dashboard

With InfluxDB integration, you can create dashboards showing:

```sql
-- Butler reload task success rate
SELECT
  mean("duration") as avg_duration,
  count("task_id") as task_count
FROM "reload_task_success"
WHERE time >= now() - 24h
GROUP BY time(1h), "app_name"

-- Service availability
SELECT
  last("status") as current_status
FROM "windows_service_status"
WHERE time >= now() - 1h
GROUP BY "service_name", "host"
```

## Timeline for Removal

The real-time metrics feature will be removed according to this schedule:

- **Current Version**: Feature marked as deprecated, disabled by default
- **Next Major Release**: Configuration options removed, feature non-functional
- **Future Release**: All related code removed from Butler

## Questions and Support

If you have questions about migrating from real-time metrics:

1. **Review Documentation**: Check the [InfluxDB integration guide](/docs/concepts/influxdb/)
2. **Community Support**: Ask questions in the Butler community forums
3. **Professional Services**: Contact Ptarmigan Labs for migration assistance

::: tip Migration Priority

If you're currently using real-time metrics, plan your migration to InfluxDB + Grafana soon. The new approach provides better performance, more features, and long-term support.

:::
