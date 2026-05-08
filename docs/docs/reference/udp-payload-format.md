---
outline: deep
---

# UDP Payload Format Reference

Butler receives real-time task events from client-managed Qlik Sense via a UDP server. This reference describes the message formats Butler accepts.

---

## Overview

Butler operates a single UDP server for receiving task-related messages from Qlik Sense.

| Setting | Default | Description |
|---------|---------|-------------|
| Port | 9998 | UDP port where Butler listens for task events |
| Host | 0.0.0.0 | IP address the UDP server binds to |

The UDP server receives messages sent by Qlik Sense log appenders. These appenders monitor Qlik Sense scheduler logs and send UDP messages to Butler when task events occur.

---

## Message Types

Butler accepts five distinct message types, each with a specific payload format.

### Message Type Identifiers

Each message begins with a type identifier:

| Identifier | Description |
|------------|-------------|
| `/engine-reload-failed/` | Reload failure from Qlik Sense engine (not scheduler) |
| `/scheduler-reload-failed/` | Reload task failed in scheduler |
| `/scheduler-task-failed/` | Generic task failed in scheduler |
| `/scheduler-reloadtask-failed/` | Alternate failed task identifier |
| `/scheduler-reload-aborted/` | Reload task aborted in scheduler |
| `/scheduler-task-aborted/` | Generic task aborted in scheduler |
| `/scheduler-reloadtask-success/` | Reload task completed successfully |
| `/scheduler-task-success/` | Generic task completed successfully |
| `/scheduler-distribute/` | Distribution task completed |

Message type identifiers are compared case-insensitively.

---

### 1. Engine Reload Failed

This message type comes directly from the Qlik Sense engine, not the scheduler. It is triggered when a reload fails during execution.

**Expected field count:** 9 fields

| Field # | Name | Description | Example |
|---------|------|-------------|---------|
| 1 | Message Type | Identifies the message type | `/engine-reload-failed/` |
| 2 | Host Name | Qlik Sense server hostname | `sense-server-01` |
| 3 | App ID | Qlik Sense app GUID | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| 4 | Session ID | Engine session identifier | `session-12345` |
| 5 | Active User Directory | User directory | `DOMAIN` |
| 6 | Active User ID | User ID | `jdoe` |
| 7 | Log Timestamp | Timestamp from log system | `2026-05-06 14:23:45.123` |
| 8 | Log Level | Log severity | `ERROR` |
| 9 | Log Message | The actual log message | `Script line 45: Field not found` |

---

### 2. Scheduler Reload Failed

This message is sent when a reload task fails in the Qlik Sense scheduler.

**Supported identifiers:**
- `/scheduler-reload-failed/`
- `/scheduler-task-failed/`
- `/scheduler-reloadtask-failed/`

**Expected field count:** 11 fields

| Field # | Name | Description | Example |
|---------|------|-------------|---------|
| 1 | Message Type | Identifies the message type | `/scheduler-reload-failed/` |
| 2 | Host Name | Qlik Sense server hostname | `sense-server-01` |
| 3 | Task Name | Name of the failed task | `Daily Sales Reload` |
| 4 | App Name | Name of the app being reloaded | `Sales Dashboard` |
| 5 | User | User who triggered the task | `DOMAIN\jdoe` |
| 6 | Task ID | GUID of the task | `f1e2d3c4-b5a6-7890-1234-567890abcdef` |
| 7 | App ID | GUID of the app | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| 8 | Log Timestamp | Timestamp from log system | `2026-05-06 14:23:45.123` |
| 9 | Log Level | Log severity | `ERROR` |
| 10 | Execution ID | GUID for this execution | `e9f8a7b6-c5d4-3210-fedc-ba0987654321` |
| 11 | Log Message | The actual log message | `Task failed after 3 retries` |

**Supported task types:**

| Task Type Code | Task Type |
|---------------|-----------|
| 0 | Reload |
| 1 | External Program |
| 2 | User Sync |
| 3 | Distribute |
| 4 | Preload |

---

### 3. Scheduler Reload Aborted

This message is sent when a task is aborted in the Qlik Sense scheduler.

**Supported identifiers:**
- `/scheduler-reload-aborted/`
- `/scheduler-task-aborted/`

**Expected field count:** 11 fields

| Field # | Name | Description | Example |
|---------|------|-------------|---------|
| 1 | Message Type | Identifies the message type | `/scheduler-reload-aborted/` |
| 2 | Host Name | Qlik Sense server hostname | `sense-server-01` |
| 3 | Task Name | Name of the aborted task | `Daily Sales Reload` |
| 4 | App Name | Name of the app | `Sales Dashboard` |
| 5 | User | User who triggered the task | `DOMAIN\jdoe` |
| 6 | Task ID | GUID of the task | `f1e2d3c4-b5a6-7890-1234-567890abcdef` |
| 7 | App ID | GUID of the app | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| 8 | Log Timestamp | Timestamp from log system | `2026-05-06 14:23:45.123` |
| 9 | Log Level | Log severity | `WARN` |
| 10 | Execution ID | GUID for this execution | `e9f8a7b6-c5d4-3210-fedc-ba0987654321` |
| 11 | Log Message | The actual log message | `Task aborted by user` |

---

### 4. Scheduler Reload Task Success

This message is sent when a task completes successfully in the Qlik Sense scheduler.

**Supported identifiers:**
- `/scheduler-reloadtask-success/`
- `/scheduler-task-success/`

**Expected field count:** 11 fields

| Field # | Name | Description | Example |
|---------|------|-------------|---------|
| 1 | Message Type | Identifies the message type | `/scheduler-reloadtask-success/` |
| 2 | Host Name | Qlik Sense server hostname | `sense-server-01` |
| 3 | Task Name | Name of the successful task | `Daily Sales Reload` |
| 4 | App Name | Name of the app being reloaded | `Sales Dashboard` |
| 5 | User | User who triggered the task | `DOMAIN\jdoe` |
| 6 | Task ID | GUID of the task | `f1e2d3c4-b5a6-7890-1234-567890abcdef` |
| 7 | App ID | GUID of the app | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| 8 | Log Timestamp | Timestamp from log system | `2026-05-06 14:23:45.123` |
| 9 | Log Level | Log severity | `INFO` |
| 10 | Execution ID | GUID for this execution | `e9f8a7b6-c5d4-3210-fedc-ba0987654321` |
| 11 | Log Message | The actual log message | `Task completed successfully` |

**Supported task types:**

| Task Type Code | Task Type | Script Log Retrieved |
|---------------|-----------|---------------------|
| 0 | Reload | Yes (if notifications enabled) |
| 1 | External Program | No |
| 2 | User Sync | No |
| 3 | Distribute | No |
| 4 | Preload | No |

---

### 5. Scheduler Distribute Task

This message is sent when a distribution task completes.

**Expected field count:** At least 11 fields

| Field # | Name | Description | Example |
|---------|------|-------------|---------|
| 1 | Message Type | Identifies the message type | `/scheduler-distribute/` |
| 2 | Host Name | Qlik Sense server hostname | `sense-server-01` |
| 3 | Task Name | Name of the distribution task | `Distribute Sales App` |
| 4 | App Name | (Not used for distribute tasks) | - |
| 5 | User | User who triggered the task | `DOMAIN\jdoe` |
| 6 | Task ID | GUID of the task | `f1e2d3c4-b5a6-7890-1234-567890abcdef` |
| 7 | App ID | (Not used for distribute tasks) | - |
| 8 | Log Timestamp | Timestamp from log system | `2026-05-06 14:23:45.123` |
| 9 | Log Level | Log severity | `INFO` |
| 10 | Execution ID | GUID for this execution | `e9f8a7b6-c5d4-3210-fedc-ba0987654321` |
| 11 | Log Message | Contains outcome information | `Distribution completed` |
| 12+ | Optional | Additional fields allowed | - |

**Distribution Task States:**

Distribution tasks may be in intermediate states that require monitoring:

| State Code | State Name | Butler Action |
|------------|------------|---------------|
| 0 | NeverStarted | - |
| 1 | Triggered | Add to monitoring queue |
| 2 | Started | Add to monitoring queue |
| 3 | Queued | Add to monitoring queue |
| 4 | AbortInitiated | Add to monitoring queue |
| 5 | Aborting | Add to monitoring queue |
| 6 | Aborted | Trigger failure handler |
| 7 | FinishedSuccess | Trigger success handler |
| 8 | FinishedFail | Trigger failure handler |
| 9 | Skipped | - |
| 10 | Retry | Add to monitoring queue |
| 11 | Error | Trigger failure handler |
| 12 | Reset | - |
| 13 | DistributionQueue | Add to monitoring queue |
| 14 | DistributionRunning | Add to monitoring queue |

---

## Validations

Butler performs several validations on incoming UDP messages:

### 1. Field Count Validation

| Message Type | Expected Fields | Validation |
|--------------|----------------|------------|
| `/engine-reload-failed/` | 9 | Exact match |
| `/scheduler-distribute/` | 11 | Minimum |
| `/scheduler-reload-failed/` | 11 | Exact match |
| `/scheduler-reload-aborted/` | 11 | Exact match |
| `/scheduler-reloadtask-success/` | 11 | Exact match |

If field count doesn't match expectations, the message is logged and discarded.

### 2. Task Existence Validation

Butler verifies that the task exists in Qlik Sense by querying the QRS API. If the task doesn't exist, processing is aborted and a warning is logged.

### 3. UUID Validation

Task ID (field 6) and App ID (field 7) are validated as proper UUIDs. Invalid UUIDs result in message rejection, reducing unnecessary API calls.

### 4. Input Sanitization

All string fields have control characters (ASCII 0x00-0x1F, 0x7F) removed and are truncated to 500 characters maximum. This prevents malformed input from causing issues.

---

## Configuration Reference

### UDP Server Configuration

```yaml
Butler:
  udpServerConfig:
    enable: false                        # Should the UDP server responsible for receiving task failure/aborted events be started?
    serverHost: 10.11.12.13              # FQDN or IP (or localhost) of server where Butler is running
    portTaskFailure: 9998
    maxMessageSize: 65507                # Max UDP message size in bytes (default: 65507 = IPv4 max, 65527 = IPv6 max)
    enableSourceValidation: false       # Enable source IP validation for incoming UDP messages
    allowedSources: []                   # List of allowed IPv4 addresses or hostnames (e.g., ["192.168.1.100", "sense-server-01"])

    # Queue settings for handling incoming UDP messages
    messageQueue:
      maxConcurrent: 10                  # Max concurrent message processing
      maxSize: 200                       # Max queue size before rejecting
      backpressureThreshold: 80          # Log warning when queue reaches this utilization percentage (0-100)

    # Rate limiting (optional)
    rateLimit:
      enable: false                      # Enable rate limiting to prevent message flooding
      maxMessagesPerMinute: 600          # Max messages per minute (~10/second)

    # Queue metrics (optional - requires InfluxDB)
    queueMetrics:
      influxdb:
        enable: false                    # Store queue metrics in InfluxDB
        writeFrequency: 20000            # Write interval (ms)
        measurementName: butler_udp_queue
        tags: []                         # Optional tags added to all queue metrics points
```

For detailed information about queue management, performance tuning, and troubleshooting, see the [UDP Queue](/docs/concepts/udp-queue) concepts page.

### Security Features

Butler includes several security features for UDP message handling:

1. **Source IP Validation**: When `enableSourceValidation` is true, only messages from IPs/hostnames listed in `allowedSources` are processed.

2. **Message Size Limits**: Messages larger than `maxMessageSize` are rejected before processing.

3. **UUID Validation**: Invalid Task ID or App ID formats result in message rejection.

4. **Input Sanitization**: Control characters are removed and field lengths are capped.

---

## Important Notes

### 1. UDP is Connectionless

UDP is an unreliable protocol. Messages may be lost, duplicated, or arrive out of order. Butler does not implement any deduplication or ordering logic.

### 2. Semicolon Delimiter

Fields are separated by semicolons (`;`). There is no escaping mechanism - fields cannot contain semicolons. A semicolon in any field will cause incorrect parsing.

### 3. No Authentication

By default, UDP messages are accepted without source validation. Enable `enableSourceValidation` and configure `allowedSources` for production deployments.

### 4. Message Size Limit

The default maximum message size is 65507 bytes (the IPv4 UDP maximum). This can be reduced via the `maxMessageSize` configuration option.

### 5. Log Appender Setup

Butler requires Qlik Sense log appenders to be configured to send UDP messages. See the [task alerts setup guide](/docs/getting-started/setup/task-alerts/client-managed/) for details on configuring log appenders.

---

## Notification Channels

Depending on message type and task type, Butler routes events to different notification destinations:

### For Failed Tasks

- Signl4 incident management
- New Relic (events and logs)
- InfluxDB metrics
- Slack messages
- Microsoft Teams messages
- Email notifications
- Webhook calls
- MQTT messages

### For Successful Tasks

- InfluxDB metrics (with execution duration)
- Email notifications (with script logs if enabled)

### For Aborted Tasks

- Signl4 incident management
- New Relic (events and logs)
- Slack messages
- Microsoft Teams messages
- Email notifications
- Webhook calls
- MQTT messages

### For Distribute Tasks

- InfluxDB metrics
- Email notifications (for success)

Each destination must be explicitly enabled in Butler's configuration file.