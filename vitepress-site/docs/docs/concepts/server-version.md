# Server Version

Monitor and track Qlik Sense server versions across your environment for compatibility, security, and planning purposes.

## What is Server Version Monitoring?

Server version monitoring in Butler provides automated tracking of Qlik Sense server versions across your entire deployment. This capability helps ensure version consistency, plan upgrades, and maintain security compliance by continuously monitoring the software versions running on your Qlik Sense servers.

## Why Monitor Server Versions?

### Version Consistency

**Multi-Server Deployments**: In enterprise environments with multiple Qlik Sense servers, maintaining version consistency is critical for:

- **Application Compatibility**: Ensuring apps work consistently across all servers
- **Feature Availability**: Confirming new features are available on all nodes
- **Bug Fix Coverage**: Verifying security patches are applied uniformly
- **Load Balancing**: Ensuring identical behavior across load-balanced servers

### Security Compliance

**Vulnerability Management**: Track server versions to identify security risks:

- **CVE Tracking**: Map known vulnerabilities to specific Qlik Sense versions
- **Patch Level Monitoring**: Ensure security patches are applied consistently
- **Compliance Reporting**: Generate reports for security audits
- **Risk Assessment**: Identify servers running outdated versions

### Upgrade Planning

**Strategic Planning**: Use version data for upgrade planning:

- **Impact Analysis**: Understand which servers need updates
- **Rollout Coordination**: Plan phased upgrade approaches
- **Compatibility Testing**: Identify test scenarios based on version differences
- **Downtime Planning**: Schedule maintenance windows appropriately

## How Butler Tracks Versions

### Data Collection Methods

Butler uses multiple approaches to collect version information:

**Qlik Sense Repository API**:

- Query server node information
- Retrieve version details from central repository
- Access deployment topology data
- Monitor server registration status

**Windows Service Queries**:

- Check Qlik Sense service executable versions
- Monitor service file timestamps
- Track Windows service metadata
- Validate service installation integrity

**Direct File System Access**:

- Read version information from executable files
- Check installation directory timestamps
- Monitor configuration file versions
- Validate installation completeness

### Version Information Collected

```json
{
  "serverName": "qlik-server-01",
  "serverRole": "central",
  "qlikSenseVersion": "14.67.0.0",
  "buildVersion": "14.67.0",
  "releaseVersion": "November 2023",
  "servicePackLevel": "SP1",
  "hotfixLevel": "HF2",
  "installationDate": "2023-11-15T10:30:00Z",
  "lastUpdated": "2023-12-01T14:22:00Z",
  "serverStatus": "active",
  "nodeType": "engine",
  "operatingSystem": "Windows Server 2022",
  "architecture": "x64"
}
```

## Integration with External Systems

### ITSM Integration

**ServiceNow Integration**:

- Automatically update CMDB with version information
- Create change requests for version mismatches
- Track software inventory across Qlik deployment
- Generate compliance reports

**Jira Integration**:

- Create tickets for version upgrade tasks
- Track upgrade project progress
- Link version information to bug reports
- Manage upgrade documentation

### Monitoring Platforms

**New Relic Integration**:

- Send version data as custom events
- Create dashboards showing version distribution
- Set up alerts for version inconsistencies
- Track version change history

**Signl4 Integration**:

- Alert on critical version mismatches
- Notify teams of security vulnerabilities
- Escalate compliance violations
- Coordinate upgrade communications

### Vulnerability Databases

**CVE Integration**:

- Map Qlik Sense versions to known CVEs
- Automatically identify vulnerable installations
- Prioritize upgrades based on severity
- Generate security risk reports

## Configuration Options

### Basic Configuration

```yaml
Butler:
  serverVersion:
    enable: true
    pollingInterval: 3600 # Check every hour

    # Data collection methods
    methods:
      repositoryAPI: true
      windowsServices: true
      fileSystem: false

    # Which servers to monitor
    servers:
      - qlik-server-01
      - qlik-server-02
      - qlik-server-03

    # Storage options
    storage:
      logToFile: true
      sendToNewRelic: true
      updateCMDB: false
```

### Advanced Configuration

```yaml
Butler:
  serverVersion:
    enable: true
    pollingInterval: 1800 # 30 minutes

    # Detailed collection methods
    methods:
      repositoryAPI:
        enable: true
        timeout: 30
        retryAttempts: 3

      windowsServices:
        enable: true
        services:
          - QlikSenseRepositoryService
          - QlikSenseEngineService
          - QlikSenseProxyService
          - QlikSenseSchedulerService

      fileSystem:
        enable: true
        paths:
          - "C:\\Program Files\\Qlik\\Sense\\Repository\\Repository.exe"
          - "C:\\Program Files\\Qlik\\Sense\\Engine\\Engine.exe"
          - "C:\\Program Files\\Qlik\\Sense\\Proxy\\Proxy.exe"

    # Filtering and selection
    serverFilter:
      includeRoles: ["central", "rim"]
      excludeRoles: ["development", "test"]
      activeOnly: true

    # Alert conditions
    alerts:
      versionMismatch:
        enable: true
        severity: "medium"
        threshold: 1 # Alert if any server differs

      outdatedVersion:
        enable: true
        severity: "high"
        maxAge: 90 # Days since release

      securityVulnerability:
        enable: true
        severity: "critical"
        cveDatabase: true
```

## Alerting and Notifications

### Version Mismatch Alerts

**Scenario**: Different server versions detected

```yaml
Butler:
  serverVersion:
    alerts:
      versionMismatch:
        enable: true
        message: |
          Version inconsistency detected in Qlik Sense deployment:

          Expected Version: {{expectedVersion}}
          Servers with Different Versions:
          {{#each mismatchedServers}}
          - {{serverName}}: {{version}} ({{role}})
          {{/each}}

          This may cause compatibility issues or unexpected behavior.

        destinations:
          - email: ops-team@company.com
          - slack: "#qlik-alerts"
          - newrelic: true
```

### Security Vulnerability Alerts

**Scenario**: Known CVE affects current version

```yaml
Butler:
  serverVersion:
    alerts:
      securityVulnerability:
        enable: true
        message: |
          🚨 SECURITY ALERT: Qlik Sense Vulnerability Detected

          CVE: {{cveId}}
          Severity: {{cveSeverity}}
          Description: {{cveDescription}}

          Affected Servers:
          {{#each affectedServers}}
          - {{serverName}}: {{version}}
          {{/each}}

          Recommended Action: Upgrade to version {{recommendedVersion}}

        destinations:
          - signl4:
              priority: critical
              category: security-vulnerability
          - email: security-team@company.com
```

## Dashboard and Reporting

### Version Distribution Dashboard

Track version distribution across your environment:

**Server Overview**:

- Current version on each server
- Last update timestamp
- Server role and status
- Operating system version

**Version Summary**:

- Total servers by version
- Percentage distribution
- Upgrade completion status
- Historical version trends

### Compliance Reports

**Security Compliance**:

- Servers running vulnerable versions
- Patch compliance percentage
- Outstanding security updates
- Time since last security update

**Version Consistency**:

- Servers with mismatched versions
- Upgrade completion percentage
- Rollback requirements
- Testing environment alignment

### Sample Dashboard Queries

**New Relic NRQL Queries**:

```sql
-- Version distribution
SELECT count(*)
FROM ButlerServerVersion
FACET qlikSenseVersion
SINCE 1 day ago

-- Servers needing updates
SELECT serverName, qlikSenseVersion, daysSinceUpdate
FROM ButlerServerVersion
WHERE isLatestVersion = false

-- Security vulnerability exposure
SELECT count(*)
FROM ButlerServerVersion
WHERE hasKnownVulnerabilities = true
FACET cveSeverity
```

## Version History Tracking

### Change Detection

Butler automatically detects and logs version changes:

```json
{
  "eventType": "ButlerVersionChange",
  "timestamp": "2023-12-01T14:22:00Z",
  "serverName": "qlik-server-01",
  "previousVersion": "14.59.4.0",
  "newVersion": "14.67.0.0",
  "changeType": "upgrade",
  "upgradeCategory": "major",
  "downtime": 45,
  "upgradeMethod": "manual",
  "changeWindow": "2023-12-01T14:00:00Z-2023-12-01T15:00:00Z"
}
```

### Historical Analysis

**Upgrade Patterns**:

- Average time between upgrades
- Typical upgrade windows
- Rollback frequency
- Success rate by upgrade type

**Performance Impact**:

- Performance changes after upgrades
- User satisfaction metrics
- Issue frequency by version
- Resource utilization changes

## Best Practices

### Monitoring Strategy

**Polling Frequency**:

- **Production**: Every 4-6 hours
- **Development**: Daily
- **Critical Systems**: Hourly
- **Post-Upgrade**: Every 15 minutes

**Data Retention**:

- **Current Data**: Real-time access
- **Historical Data**: 2+ years
- **Change Events**: 5+ years
- **Compliance Data**: Per regulatory requirements

### Alert Management

**Severity Levels**:

- **Critical**: Security vulnerabilities, complete version mismatches
- **High**: Significant version differences, unsupported versions
- **Medium**: Minor version differences, approaching EOL
- **Low**: Informational updates, planned maintenance

**Notification Channels**:

- **Critical**: Immediate (Signl4, SMS, voice)
- **High**: Standard (email, Slack, Teams)
- **Medium**: Batched (daily digest)
- **Low**: Dashboard only

### Version Management

**Upgrade Planning**:

1. **Assessment**: Identify current versions and required updates
2. **Testing**: Validate upgrades in non-production environments
3. **Scheduling**: Plan maintenance windows and rollout phases
4. **Execution**: Implement upgrades with monitoring
5. **Validation**: Confirm successful upgrades and functionality

**Documentation**:

- Maintain version inventory spreadsheets
- Document upgrade procedures and rollback plans
- Track compatibility matrices for integrations
- Record lessons learned from each upgrade

## Troubleshooting

### Common Issues

**Version Detection Failures**:

- **Cause**: Insufficient permissions to query Repository API
- **Solution**: Verify Butler service account has appropriate rights
- **Prevention**: Use dedicated service account with minimal required permissions

**Inconsistent Data**:

- **Cause**: Caching issues or timing differences
- **Solution**: Clear cache and re-poll server information
- **Prevention**: Implement cache invalidation on version changes

**False Positives**:

- **Cause**: Test servers included in production monitoring
- **Solution**: Refine server filtering and role-based selection
- **Prevention**: Use environment-specific configurations

### Debug Configuration

```yaml
Butler:
  serverVersion:
    debug: true
    logLevel: debug
    logCollection: true

    # Enhanced logging
    detailedLogging:
      apiCalls: true
      versionComparison: true
      changeDetection: true
      alertTriggers: true
```

## Integration Examples

### Basic Version Monitoring

```yaml
Butler:
  serverVersion:
    enable: true
    pollingInterval: 3600

    storage:
      logToFile: true
      logPath: "/var/log/butler/server-versions.log"

    alerts:
      versionMismatch:
        enable: true
        email: ops-team@company.com
```

### Comprehensive Enterprise Setup

```yaml
Butler:
  serverVersion:
    enable: true
    pollingInterval: 1800

    # Multi-method collection
    methods:
      repositoryAPI: true
      windowsServices: true
      fileSystem: true

    # Environment-specific filtering
    environments:
      production:
        servers: ["qlik-prod-01", "qlik-prod-02"]
        alerts:
          versionMismatch:
            severity: critical
            destinations:
              - signl4: true
              - email: prod-ops@company.com

      staging:
        servers: ["qlik-stage-01"]
        alerts:
          versionMismatch:
            severity: medium
            destinations:
              - email: dev-ops@company.com

    # External integrations
    integrations:
      newRelic:
        enable: true
        customAttributes:
          environment: "{{environment}}"
          datacenter: "{{datacenter}}"

      serviceNow:
        enable: true
        cmdbUpdate: true
        changeRequests: true
```

::: tip Version Planning

1. **Establish Baseline**: Document current versions across all servers
2. **Create Inventory**: Maintain comprehensive version tracking spreadsheet
3. **Monitor Regularly**: Set up automated monitoring with appropriate alerting
4. **Plan Upgrades**: Use version data to plan and coordinate upgrade activities
5. **Track Changes**: Maintain historical records of all version changes

:::

::: warning Security Considerations

- Monitor for security vulnerabilities in current versions
- Prioritize security updates over feature updates
- Maintain separate upgrade schedules for security vs. feature releases
- Test security patches in non-production environments first
- Document rollback procedures for each upgrade

:::

## Next Steps

- **[Setup Guide](/docs/getting-started/setup/server-version-monitoring/)** - Configure server version monitoring
- **[Alert Templates](/docs/reference/alert-template-fields/)** - Customize version alert formats
- **[Security Monitoring](/docs/concepts/security/)** - Integrate with security monitoring tools
