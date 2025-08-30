# Qlik Sense Server License

Monitor and manage Qlik Sense server licenses to ensure compliance and optimal resource allocation.

## What are Qlik Sense Server Licenses?

Qlik Sense server licenses define the core capabilities and capacity of your Qlik Sense deployment. These licenses determine what features are available, how many users can access the system, and what types of applications can be deployed.

### License Types

**Professional License**:

- Enables full Qlik Sense capabilities
- Required for content creation and development
- Supports advanced analytics and self-service BI
- Includes collaboration and sharing features

**Analyzer License**:

- Provides consumption-only access
- Users can view and interact with existing applications
- No content creation capabilities
- Cost-effective for view-only users

**Login Access License**:

- Basic access for authenticated users
- Limited interaction capabilities
- Suitable for dashboard viewing
- Most economical option for read-only access

## Why Monitor Server Licenses?

### Compliance Management

**License Violations**: Prevent unauthorized usage that could result in:

- **Audit Failures**: Non-compliance with vendor license terms
- **Financial Penalties**: Unexpected costs from license overages
- **Legal Risks**: Contract violations and potential litigation
- **Service Interruptions**: Automatic shutdowns due to license violations

### Cost Optimization

**License Utilization**: Optimize license costs through monitoring:

- **Usage Patterns**: Identify underutilized licenses for reallocation
- **Peak Demand**: Plan license capacity for busy periods
- **User Behavior**: Understand actual vs. assigned license usage
- **License Mobility**: Track and optimize license assignments

### Capacity Planning

**Growth Management**: Plan for future license needs:

- **User Growth**: Anticipate new user license requirements
- **Feature Adoption**: Monitor usage of advanced features
- **Application Scaling**: Plan licenses for new application deployments
- **Department Expansion**: Allocate licenses for organizational growth

## How Butler Monitors Licenses

### Data Collection Methods

Butler collects license information through multiple channels:

**Qlik Sense Repository API**:

- Query current license allocations
- Monitor license usage statistics
- Track user assignments and access patterns
- Retrieve license expiration information

**License Service Monitoring**:

- Monitor Qlik Sense Licensing Service health
- Track license server connectivity
- Validate license file integrity
- Monitor license token availability

**User Session Analysis**:

- Track concurrent user sessions
- Monitor license utilization patterns
- Identify peak usage periods
- Analyze user access frequency

### License Information Collected

```json
{
  "timestamp": "2023-12-01T14:22:00Z",
  "licenseServer": "qlik-license-01",
  "totalLicenses": {
    "professional": 50,
    "analyzer": 200,
    "loginAccess": 1000
  },
  "allocatedLicenses": {
    "professional": 45,
    "analyzer": 180,
    "loginAccess": 750
  },
  "activeSessions": {
    "professional": 32,
    "analyzer": 145,
    "loginAccess": 420
  },
  "licenseExpiry": "2024-12-31T23:59:59Z",
  "complianceStatus": "compliant",
  "utilizationRate": 0.72,
  "peakUsage": {
    "professional": 48,
    "analyzer": 195,
    "loginAccess": 850
  }
}
```

## Integration with External Systems

### ITSM Integration

**ServiceNow Integration**:

- Create license request tickets automatically
- Track license assignments in CMDB
- Generate compliance reports
- Manage license renewal workflows

**Jira Integration**:

- Track license optimization projects
- Manage license violation remediation
- Link license costs to project budgets
- Coordinate license procurement activities

### Financial Systems

**ERP Integration**:

- Track license costs and allocations
- Generate departmental chargebacks
- Monitor license ROI and utilization
- Plan budget allocations for renewals

**Procurement Systems**:

- Automate license renewal requests
- Track vendor compliance and performance
- Manage license contract terms
- Coordinate multi-year license agreements

### Monitoring Platforms

**New Relic Integration**:

- Send license utilization as custom metrics
- Create dashboards for license trending
- Set up alerts for license threshold breaches
- Track historical usage patterns

**Signl4 Integration**:

- Alert on license compliance violations
- Notify teams of approaching expiration dates
- Escalate critical license issues
- Coordinate license resolution activities

## Configuration Options

### Basic Configuration

```yaml
Butler:
  qlikSenseLicense:
    enable: true
    pollingInterval: 3600 # Check every hour

    # License monitoring scope
    monitorTypes:
      - professional
      - analyzer
      - loginAccess

    # Threshold alerts
    thresholds:
      utilization:
        warning: 0.80 # 80% utilization
        critical: 0.95 # 95% utilization

      allocation:
        warning: 0.85 # 85% allocated
        critical: 0.95 # 95% allocated

    # Storage and reporting
    storage:
      logToFile: true
      sendToNewRelic: true
      generateReports: true
```

### Advanced Configuration

```yaml
Butler:
  qlikSenseLicense:
    enable: true
    pollingInterval: 1800 # 30 minutes

    # Detailed monitoring configuration
    monitoring:
      licenseServer:
        enable: true
        healthCheck: true
        connectivityMonitoring: true

      userSessions:
        enable: true
        trackConcurrentUsers: true
        sessionTimeouts: true
        peakUsageTracking: true

      compliance:
        enable: true
        violationDetection: true
        auditLogging: true
        complianceReporting: true

    # Advanced thresholds
    thresholds:
      professional:
        warning: 0.75
        critical: 0.90
        warningTime: "08:00-18:00" # Business hours
        criticalAnytime: true

      analyzer:
        warning: 0.80
        critical: 0.95
        peakHours: "09:00-17:00"

      loginAccess:
        warning: 0.85
        critical: 0.98
        gracePeriod: 300 # 5 minutes

    # Alerting configuration
    alerts:
      licenseViolation:
        enable: true
        severity: critical
        immediateNotification: true
        escalationPolicy: true

      expirationWarning:
        enable: true
        daysBeforeExpiry: [90, 60, 30, 14, 7, 1]
        severity: high

      utilizationTrend:
        enable: true
        trendAnalysis: true
        forecastingPeriod: 30 # Days
```

## Alerting and Notifications

### License Utilization Alerts

**Scenario**: License utilization approaching capacity

```yaml
Butler:
  qlikSenseLicense:
    alerts:
      utilizationThreshold:
        enable: true
        message: |
          ⚠️ Qlik Sense License Utilization Warning

          License Type: {{licenseType}}
          Current Utilization: {{currentUtilization}}% ({{activeUsers}}/{{totalLicenses}})
          Threshold: {{threshold}}%

          Peak Usage Today: {{peakUsage}}
          Trend: {{utilizationTrend}}

          Action Required: Review license allocation or consider additional licenses

        destinations:
          - email: license-admin@company.com
          - slack: "#qlik-operations"
          - newrelic: true
```

### License Compliance Alerts

**Scenario**: License violation detected

```yaml
Butler:
  qlikSenseLicense:
    alerts:
      complianceViolation:
        enable: true
        message: |
          🚨 CRITICAL: Qlik Sense License Violation Detected

          Violation Type: {{violationType}}
          License Type: {{licenseType}}
          Over-allocation: {{overAllocation}} users

          Current State:
          - Total Licenses: {{totalLicenses}}
          - Allocated: {{allocatedLicenses}}
          - Active Sessions: {{activeSessions}}

          Immediate action required to restore compliance!

        destinations:
          - signl4:
              priority: critical
              category: license-violation
          - email: compliance-team@company.com
          - jira: true
```

### License Expiration Alerts

**Scenario**: License approaching expiration

```yaml
Butler:
  qlikSenseLicense:
    alerts:
      expirationWarning:
        enable: true
        message: |
          📅 Qlik Sense License Expiration Notice

          Days Until Expiration: {{daysUntilExpiry}}
          Expiration Date: {{expirationDate}}

          License Details:
          - Professional: {{professionalCount}}
          - Analyzer: {{analyzerCount}}
          - Login Access: {{loginAccessCount}}

          Please coordinate license renewal to avoid service interruption.

        destinations:
          - email: procurement@company.com
          - serviceNow: true
          - teams: "#license-management"
```

## Dashboard and Reporting

### License Utilization Dashboard

Track license usage patterns and trends:

**Current Status**:

- Real-time utilization by license type
- Active vs. allocated licenses
- Compliance status indicator
- Peak usage metrics

**Historical Trends**:

- Monthly utilization patterns
- Growth trends by license type
- Seasonal usage variations
- Year-over-year comparisons

**Capacity Planning**:

- Forecasted license needs
- Recommended license additions
- Cost optimization opportunities
- Growth trajectory analysis

### Compliance Reports

**Monthly Compliance Report**:

- License allocation summary
- Violation incidents and resolutions
- Utilization efficiency metrics
- Compliance score trending

**Executive Summary**:

- Total license costs and utilization
- ROI analysis by license type
- Strategic recommendations
- Budget planning guidance

### Sample Dashboard Queries

**New Relic NRQL Queries**:

```sql
-- Current license utilization
SELECT latest(utilizationRate)
FROM ButlerLicenseMetrics
FACET licenseType
SINCE 1 hour ago

-- License compliance over time
SELECT average(complianceScore)
FROM ButlerLicenseMetrics
TIMESERIES 1 day
SINCE 30 days ago

-- Peak usage analysis
SELECT max(activeSessions),
       average(activeSessions)
FROM ButlerLicenseMetrics
FACET licenseType
SINCE 7 days ago
```

## License Optimization Strategies

### Usage Pattern Analysis

**Peak Hour Identification**:

- Identify daily usage peaks for capacity planning
- Understand user access patterns for optimization
- Plan maintenance windows during low usage
- Optimize license allocation timing

**User Behavior Tracking**:

- Monitor actual vs. assigned license usage
- Identify users who could use lower-tier licenses
- Track application usage to optimize license types
- Analyze collaboration patterns for shared licenses

### Cost Optimization

**License Right-Sizing**:

- Convert underutilized Professional to Analyzer licenses
- Identify candidates for Login Access licenses
- Optimize license mix based on actual usage
- Reduce unused license allocations

**Procurement Planning**:

- Plan license purchases based on growth projections
- Negotiate volume discounts for bulk purchases
- Align license terms with budget cycles
- Consider multi-year agreements for cost savings

## Best Practices

### Monitoring Strategy

**Polling Frequency**:

- **Production**: Every 30-60 minutes
- **Peak Hours**: Every 15 minutes
- **License Renewal Period**: Every 5 minutes
- **Post-Deployment**: Continuous monitoring

**Threshold Management**:

- Set warning thresholds at 80% utilization
- Set critical thresholds at 95% utilization
- Adjust thresholds based on license type
- Consider business hours for alerting

### Alert Management

**Severity Levels**:

- **Critical**: License violations, service interruptions
- **High**: Approaching capacity, expiration warnings
- **Medium**: Utilization trends, optimization opportunities
- **Low**: Informational updates, usage reports

**Escalation Policies**:

- Immediate notification for compliance violations
- Business hours alerts for utilization warnings
- Executive notifications for budget impacts
- Procurement alerts for renewal planning

### License Management

**Allocation Strategy**:

1. **Assessment**: Evaluate current license utilization
2. **Optimization**: Right-size license allocations
3. **Planning**: Forecast future license needs
4. **Procurement**: Plan and execute license purchases
5. **Monitoring**: Continuously track usage and compliance

**Documentation**:

- Maintain license inventory and assignments
- Document license policies and procedures
- Track license utilization history
- Record optimization decisions and outcomes

## Troubleshooting

### Common Issues

**Inaccurate License Counts**:

- **Cause**: Cached license information or API delays
- **Solution**: Clear cache and re-query license service
- **Prevention**: Use multiple data sources for validation

**False Compliance Alerts**:

- **Cause**: Temporary session spikes or license reassignments
- **Solution**: Implement grace periods and trend analysis
- **Prevention**: Use smart alerting with dampening logic

**Missing License Data**:

- **Cause**: License service connectivity issues
- **Solution**: Check license service health and network connectivity
- **Prevention**: Implement redundant monitoring methods

### Debug Configuration

```yaml
Butler:
  qlikSenseLicense:
    debug: true
    logLevel: debug

    # Enhanced logging
    detailedLogging:
      apiCalls: true
      licenseCalculations: true
      thresholdEvaluations: true
      complianceChecks: true
```

## Integration Examples

### Basic License Monitoring

```yaml
Butler:
  qlikSenseLicense:
    enable: true
    pollingInterval: 3600

    thresholds:
      utilization:
        warning: 0.80
        critical: 0.95

    alerts:
      utilizationThreshold:
        email: admin@company.com
```

### Enterprise License Management

```yaml
Butler:
  qlikSenseLicense:
    enable: true
    pollingInterval: 1800

    # Comprehensive monitoring
    monitoring:
      licenseServer: true
      userSessions: true
      compliance: true
      peakUsage: true

    # Environment-specific configuration
    environments:
      production:
        thresholds:
          utilization:
            warning: 0.75
            critical: 0.90
        alerts:
          complianceViolation:
            destinations:
              - signl4: true
              - email: prod-compliance@company.com
              - serviceNow: true

      development:
        thresholds:
          utilization:
            warning: 0.85
            critical: 0.95
        alerts:
          utilizationThreshold:
            destinations:
              - email: dev-ops@company.com

    # Financial integration
    integrations:
      erp:
        enable: true
        costAllocation: true
        chargebacks: true

      procurement:
        enable: true
        renewalWorkflows: true
        budgetPlanning: true

    # Advanced reporting
    reporting:
      monthlyCompliance: true
      executiveSummary: true
      costOptimization: true
      forecastingReports: true
```

::: tip License Management

1. **Monitor Continuously**: Set up automated monitoring with appropriate alerting
2. **Plan Capacity**: Use historical data to forecast license needs
3. **Optimize Regularly**: Review and optimize license allocations quarterly
4. **Track Compliance**: Maintain detailed compliance records for audits
5. **Budget Planning**: Use license data for accurate budget forecasting

:::

::: warning Compliance Risks

- Monitor license usage continuously to prevent violations
- Set conservative thresholds to avoid accidental overages
- Maintain detailed audit trails of all license activities
- Plan license renewals well in advance of expiration dates
- Implement automated alerts for critical compliance events

:::

## Next Steps

- **[Setup Guide](/docs/getting-started/setup/license-monitoring/)** - Configure license monitoring
- **[Alert Templates](/docs/reference/alert-template-fields/)** - Customize license alert formats
- **[Access License Monitoring](/docs/concepts/qlik-sense-licenses/access-licenses/)** - Monitor user access licenses
