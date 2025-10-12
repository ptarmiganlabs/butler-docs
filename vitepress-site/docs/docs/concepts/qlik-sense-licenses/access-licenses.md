# Qlik Sense Access Licenses

Monitor and automatically manage Qlik Sense end user access licenses to optimize license utilization.

## Overview

Qlik Sense requires end users to be assigned access licenses to use the platform. Different license types serve different user needs:

- **Professional**: Full access for content creators and advanced users
- **Analyzer**: Consumption-focused access for business users
- **Analyzer Capacity**: Token-based consumption licensing

Butler provides comprehensive license management capabilities:

1. **License Monitoring**: Track usage metrics for different license types
2. **Automatic Release**: Free up inactive licenses for reallocation
3. **Usage Analytics**: Store license data in InfluxDB for visualization and alerting

## License Monitoring

Butler can monitor license usage and store detailed metrics in InfluxDB, enabling powerful analytics and alerting.

### Metrics Collected

- **Total Licenses**: Number of licenses available by type
- **Allocated Licenses**: Currently assigned licenses
- **Available Licenses**: Unassigned licenses ready for allocation
- **Usage Patterns**: Historical license assignment and release data
- **User Activity**: License usage by individual users

### Grafana Dashboards

With license data in InfluxDB, you can create comprehensive Grafana dashboards showing:

- **License Utilization**: Real-time usage across license types
- **Capacity Planning**: Trends to predict when additional licenses are needed
- **Cost Optimization**: Identify opportunities to optimize license allocation
- **User Activity**: Track which users are actively using their licenses

### Alerting

Set up proactive alerts for:

- **Low License Availability**: Alert when license pools are running low
- **High Utilization**: Notify when usage approaches capacity
- **Cost Thresholds**: Alert when license costs exceed budgets
- **Compliance Issues**: Monitor for license agreement compliance

## Automatic License Release

Butler can automatically release Professional and Analyzer licenses that haven't been used for a specified period, making them available for other users.

### Why Automatic Release?

**Common Scenario**: Seasonal or infrequent users

- Users who no longer need access (left the company, changed roles, etc.)
- Users who only access Sense during specific business cycles
- Temporary project team members
- Users who switch between different analytics tools

**Without Automatic Release**:

- Licenses remain allocated to inactive users
- New users can't access Qlik Sense due to license exhaustion
- Organizations must purchase additional licenses unnecessarily

**With Automatic Release**:

- Inactive licenses are freed for reallocation
- Better license utilization and cost efficiency
- More users can access the platform when needed

### How It Works

1. **Scheduled Evaluation**: Butler evaluates license allocations on a configurable schedule (e.g., daily)
2. **Inactivity Detection**: Identifies licenses unused for a specified period (e.g., 30 days)
3. **Safe Release**: Applies exclusion rules to protect critical users
4. **Automatic Reallocation**: Released licenses become available for new assignments

## Compliance and Legal Considerations

::: warning Important Disclaimer
Before implementing automatic license release, ensure this approach complies with your specific Qlik license agreement.

Review the terms with your legal team and Qlik account manager.
:::

### Key Considerations

1. **License Agreement Terms**: Verify that automatic license management is permitted
2. **Usage Tracking**: Maintain audit logs for compliance reporting
3. **User Communication**: Inform users about automatic license policies
4. **Fallback Plans**: Have procedures for manual license management if needed

### Qlik API Usage

Butler uses publicly documented Qlik APIs for license management:

- [Repository Service API](https://help.qlik.com/en-US/sense-developer/February2024/Subsystems/RepositoryServiceAPI/Content/Sense_RepositoryServiceAPI/RepositoryServiceAPI-Reference-Redirect.htm)
- [License Management APIs](https://help.qlik.com/en-US/sense-developer/February2024/APIs/RepositoryServiceAPI/index.html?page=126)

These are the same APIs used by the QMC for manual license operations.

---

::: tip Getting Started

1. **Enable Monitoring First**: Start with license monitoring before enabling automatic release
2. **Use Dry Run Mode**: Test release logic without actually releasing licenses
3. **Start with Conservative Settings**: Use longer inactivity periods initially
4. **Set Up Comprehensive Exclusions**: Protect critical users from day one
5. **Monitor Closely**: Watch license operations carefully during initial deployment

:::
