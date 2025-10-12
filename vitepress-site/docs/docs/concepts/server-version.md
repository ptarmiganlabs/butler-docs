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

## Integration with External Systems

### TODO System Integration

- Automatically update CMDB with version information
- Create change requests for version mismatches
- Track software inventory across Qlik deployment
- Generate compliance reports
- Create tickets for version upgrade tasks

## Dashboard and Reporting

### Version Distribution Dashboard

Track version distribution across your environment:

- Current version on each server
- Total servers by version

### Compliance Reports

- Servers running vulnerable versions
- Patch compliance percentage

## Best Practices

### Monitoring Strategy

**Polling Frequency**:

- **Production**: Every 6-8 hours
- **Development**: Daily

**Documentation**:

- Maintain version inventory spreadsheets
- Document upgrade procedures and rollback plans
- Track compatibility matrices for integrations
- Record lessons learned from each upgrade

::: tip Version Planning

1. **Establish Baseline**: Document current versions across all servers
2. **Create Inventory**: Maintain a version tracking spreadsheet
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
