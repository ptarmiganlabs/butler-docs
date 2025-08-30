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

### Configuration Options

```yaml
Butler:
  licenseManagement:
    enable: true
    evaluation:
      frequency: at 2:00 am every day # When to run license evaluation

    release:
      professional:
        enable: true
        inactivityDays: 30 # Release after 30 days of inactivity
      analyzer:
        enable: true
        inactivityDays: 45 # Release analyzer licenses after 45 days

    quarantine:
      gracePeriod: 7 # Never release licenses assigned within 7 days

    exclusions: # Users exempt from automatic release
      users: # Specific users to protect
        - userDirectory: DOMAIN
          userId: admin.user
        - userDirectory: DOMAIN
          userId: critical.user

      tags: # Users with these tags are protected
        - "VIP-User"
        - "Always-Licensed"

      customProperties: # Users with these properties are protected
        - name: "LicenseProtection"
          value: "Keep"
        - name: "UserType"
          value: "Administrator"

      userDirectories: # Protect all users from specific directories
        - "ADMIN_DOMAIN"
        - "SERVICE_ACCOUNTS"

      userStatus: # Protect based on user status
        protectActiveUsers: true # Don't release licenses from active users
        protectNonBlockedUsers: false # Allow release from non-blocked users
        protectInternalUsers: true # Protect internal (non-external) users
```

## User Protection Rules

Butler provides multiple ways to exclude users from automatic license release:

### 1. Specific Users

Protect individual users by username:

```yaml
exclusions:
  users:
    - userDirectory: COMPANY
      userId: john.doe
    - userDirectory: COMPANY
      userId: jane.smith
```

### 2. User Tags

Protect users with specific tags set in the QMC:

```yaml
exclusions:
  tags:
    - "VIP-User" # Users tagged as VIP
    - "Executive" # Executive users
    - "Always-Licensed" # Users who must always have licenses
```

### 3. Custom Properties

Protect based on custom property values:

```yaml
exclusions:
  customProperties:
    - name: "Department"
      value: "IT" # Protect all IT department users
    - name: "Role"
      value: "Manager" # Protect all managers
```

### 4. User Directories

Protect all users from specific directories:

```yaml
exclusions:
  userDirectories:
    - "ADMIN_DOMAIN" # All admin users
    - "SERVICE_ACCOUNTS" # Service account users
    - "CONTRACTORS" # External contractor users
```

### 5. User Status

Protect based on QMC user status settings:

```yaml
exclusions:
  userStatus:
    protectActiveUsers: true # Protect users marked as active
    protectNonBlockedUsers: false # Allow release from non-blocked users
    protectInternalUsers: true # Protect internal users
```

## Safety Features

### Quarantine Period

Newly assigned licenses are protected during a quarantine period:

```yaml
quarantine:
  gracePeriod: 7 # Never release licenses assigned within 7 days
```

This prevents immediate release of licenses that were just assigned to new users.

### Audit Logging

All license operations are logged for compliance and troubleshooting:

```yaml
licenseManagement:
  auditLog:
    enable: true
    logLevel: info
    includeUserDetails: true
```

### Dry Run Mode

Test license release logic without actually releasing licenses:

```yaml
licenseManagement:
  dryRun: true # Log what would be released without taking action
```

## Integration with InfluxDB

Store license metrics in InfluxDB for analysis and alerting:

```yaml
Butler:
  influxDb:
    enable: true
    host: influxdb.company.com
    port: 8086
    database: butler_metrics

  licenseMonitoring:
    enable: true
    storeInInfluxDb: true
    collectInterval: every 1 hour
    metrics:
      - totalLicenses
      - allocatedLicenses
      - availableLicenses
      - userActivity
```

### Sample Grafana Queries

```sql
-- License utilization by type
SELECT
  last("allocated") as allocated,
  last("available") as available
FROM "license_usage"
WHERE time >= now() - 24h
GROUP BY "license_type"

-- Users at risk of license release
SELECT
  "user_id",
  "last_activity",
  "days_inactive"
FROM "user_license_activity"
WHERE "days_inactive" >= 25
```

## REST API Integration

Butler provides API endpoints for license management:

### Get License Status

```text
GET /v4/licenses/status
```

**Response:**

```json
{
  "professional": {
    "total": 100,
    "allocated": 85,
    "available": 15,
    "utilization": 85
  },
  "analyzer": {
    "total": 200,
    "allocated": 150,
    "available": 50,
    "utilization": 75
  }
}
```

### Release Specific License

```text
DELETE /v4/licenses/user/{userId}
```

### Get User License Info

```text
GET /v4/licenses/user/{userId}
```

## Compliance and Legal Considerations

::: warning Important Disclaimer
Before implementing automatic license release, ensure this approach complies with your specific Qlik license agreement. Review the terms with your legal team and Qlik account manager.
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

## Best Practices

### 1. Start Conservative

Begin with longer inactivity periods and gradually optimize:

```yaml
release:
  professional:
    inactivityDays: 60 # Start with 60 days
  analyzer:
    inactivityDays: 90 # Start with 90 days
```

### 2. Comprehensive Exclusions

Protect critical users and roles:

```yaml
exclusions:
  tags:
    - "Administrator"
    - "Power-User"
    - "Always-Licensed"
  customProperties:
    - name: "Department"
      value: "IT"
    - name: "Role"
      value: "Executive"
```

### 3. Monitor and Alert

Set up monitoring for license operations:

- **Release Activity**: Track which licenses are being released
- **Allocation Failures**: Alert when users can't get licenses
- **Utilization Trends**: Monitor license usage patterns

### 4. User Communication

- **Policy Documentation**: Clearly document license policies
- **User Training**: Educate users about license assignment and release
- **Notification System**: Inform users when their licenses are released

### 5. Regular Review

- **Monthly Reviews**: Analyze license utilization and release patterns
- **Quarterly Optimization**: Adjust inactivity periods based on usage data
- **Annual Planning**: Use historical data for license capacity planning

## Troubleshooting

### Common Issues

1. **Licenses Not Released**

   - Check exclusion rules aren't too broad
   - Verify inactivity calculation is correct
   - Review user activity logs

2. **Users Unexpectedly Lose Licenses**

   - Add appropriate exclusion rules
   - Extend inactivity periods
   - Check quarantine settings

3. **API Errors**
   - Verify Qlik Sense connectivity
   - Check authentication credentials
   - Review API permissions

### Debug Configuration

```yaml
licenseManagement:
  debug: true
  logLevel: debug
  dryRun: true # Test without making changes
```

::: tip Getting Started

1. **Enable Monitoring First**: Start with license monitoring before enabling automatic release
2. **Use Dry Run Mode**: Test release logic without actually releasing licenses
3. **Start with Conservative Settings**: Use longer inactivity periods initially
4. **Set Up Comprehensive Exclusions**: Protect critical users from day one
5. **Monitor Closely**: Watch license operations carefully during initial deployment

:::
