# UDP Client

A basic UDP client tool for testing Butler's UDP servers and debugging message handling.

## What is the UDP Client?

Butler includes a simple command-line UDP client that can send test messages to Butler's UDP servers. This tool is valuable for:

- **Debugging**: Testing UDP server functionality during development
- **Development**: Creating new UDP message handlers
- **Troubleshooting**: Verifying network connectivity and message parsing
- **Testing**: Simulating Qlik Sense events without actual failures

The UDP client is built using Node.js and is located in the `src/udp_client` directory of the Butler repository.

## Installation and Usage

### Basic Usage

Run the client without arguments to see the help text:

```bash
$ node udp_client.js
Usage: node udp_client.js [options]

This app sends messages to the UDP server(s) built into Butler (or any other UDP
server)

Options:
  --version   Show version number                                      [boolean]
  -i, --ip    IP address of UDP server message will be sent to        [required]
  -p, --port  Port on UDP server                                      [required]
  -m, --msg   Message to send                          [default: "Test message"]
  -h, --help  Show help                                                [boolean]

Missing required arguments: i, p
```

### Command Structure

```bash
node udp_client.js --ip <server_ip> --port <port> --msg "<message>"
```

**Parameters:**

- **`--ip` or `-i`**: IP address of the Butler server (required)
- **`--port` or `-p`**: UDP port number (required)
- **`--msg` or `-m`**: Message content (optional, defaults to "Test message")

## Testing Butler's UDP Servers

Butler typically runs multiple UDP servers for different purposes:

### Failed Reload Task Server

Test the server that handles task failure notifications:

```bash
# Test failed reload UDP server (typically port 9998)
node udp_client.js --ip 192.168.1.100 --port 9998 --msg "Test failed reload message"
```

**Response:**

```bash
UDP message sent to 192.168.1.100:9998, 16 bytes.
```

### User Activity Events Server

Test the server that handles user session events:

```bash
# Test user activity UDP server (typically port 9997)
node udp_client.js --ip 192.168.1.100 --port 9997 --msg "Test session event"
```

## Message Formats

Different UDP servers expect different message formats. Understanding these formats helps create realistic test messages.

### Task Failure Message Format

For testing reload failure handling:

```bash
node udp_client.js --ip 192.168.1.100 --port 9998 --msg "App reload failed;MyApp;task-123;Error details"
```

**Format Components:**

- **Event Type**: "App reload failed"
- **App Name**: Name of the Qlik Sense app
- **Task ID**: Unique identifier for the reload task
- **Error Details**: Description of the failure

### User Session Message Format

For testing user activity monitoring:

```bash
node udp_client.js --ip 192.168.1.100 --port 9997 --msg "Session started;DOMAIN;username;server-01"
```

**Format Components:**

- **Event Type**: "Session started" or "Session ended"
- **User Directory**: Active Directory domain or user directory
- **Username**: User identifier
- **Server**: Qlik Sense server name

## Testing Scenarios

### Network Connectivity Testing

Verify that Butler can receive UDP messages from remote servers:

```bash
# Basic connectivity test
node udp_client.js --ip butler-server.company.com --port 9998 --msg "Connectivity test"
```

### Message Processing Testing

Test how Butler handles various message formats:

```bash
# Test malformed message handling
node udp_client.js --ip 192.168.1.100 --port 9998 --msg "Invalid;Format;Test"

# Test empty message handling
node udp_client.js --ip 192.168.1.100 --port 9998 --msg ""

# Test large message handling
node udp_client.js --ip 192.168.1.100 --port 9998 --msg "Very long message content that might test buffer limits..."
```

### Load Testing

Simulate multiple events for performance testing:

```bash
# Send multiple test messages (requires scripting)
for i in {1..10}; do
    node udp_client.js --ip 192.168.1.100 --port 9998 --msg "Test message $i"
done
```

## Integration with Butler Features

### Slack Integration Testing

When testing failed reload notifications with Slack enabled, you might see a result like this:

Sending a test message from a simple test script to Slack:

<ResponsiveImage 
  src="/img/slack_failed_task_1.jpg" 
  alt="Slack Test Message"
  maxWidth="600px"
  caption="Test message sent from UDP client displayed in Slack"
/>

The UDP client message triggers Butler's notification pipeline, resulting in formatted messages in your configured destinations.

### Teams and Email Testing

Similarly, test messages will trigger notifications in:

- **Microsoft Teams**: Formatted cards with reload failure details
- **Email**: HTML-formatted messages with task information
- **Webhooks**: JSON payloads sent to configured endpoints

## Development and Debugging

### Adding Custom Message Handlers

When developing new UDP message handlers in Butler:

1. **Define Message Format**: Determine the expected message structure
2. **Implement Parser**: Add parsing logic for the new message type
3. **Test with UDP Client**: Use the client to send test messages
4. **Verify Processing**: Check that Butler handles the messages correctly

### Troubleshooting Common Issues

#### No Response from Butler

```bash
# Check if Butler is running and listening
netstat -an | grep 9998

# Verify firewall settings
telnet butler-server 9998
```

#### Message Not Processed

```bash
# Check Butler logs for parsing errors
tail -f butler.log | grep UDP

# Send simple test message
node udp_client.js --ip 192.168.1.100 --port 9998 --msg "TEST"
```

#### Network Issues

```bash
# Test from same network as Qlik Sense servers
node udp_client.js --ip 192.168.1.100 --port 9998 --msg "Network test"

# Verify routing and DNS
ping butler-server.company.com
nslookup butler-server.company.com
```

## Configuration Verification

Use the UDP client to verify Butler's configuration:

### Port Configuration

Test each configured UDP port to ensure Butler is listening:

```yaml
# Butler config shows these ports
Butler:
  udpServerConfig:
    portTaskFailure: 9998
    portUserActivity: 9997
```

```bash
# Test each port
node udp_client.js --ip butler-server --port 9998 --msg "Task failure test"
node udp_client.js --ip butler-server --port 9997 --msg "User activity test"
```

### Destination Testing

Verify that test messages trigger notifications in configured destinations:

1. **Send Test Message**: Use UDP client to send a test message
2. **Check Destinations**: Verify messages appear in Slack, Teams, email, etc.
3. **Review Logs**: Check Butler logs for processing confirmation

## Security Considerations

### Network Security

- **Firewall Rules**: Ensure UDP ports are accessible from Qlik Sense servers
- **Network Segmentation**: Consider restricting UDP access to trusted networks
- **Message Validation**: Butler should validate all incoming UDP messages

### Message Content

- **Sensitive Data**: Avoid including sensitive information in test messages
- **Log Retention**: Test messages may appear in logs and monitoring systems
- **Rate Limiting**: Be mindful of message frequency during testing

## Best Practices

### Development Workflow

1. **Local Testing**: Start with local Butler instance and UDP client
2. **Message Validation**: Test various message formats and edge cases
3. **Integration Testing**: Verify end-to-end notification flow
4. **Production Testing**: Use UDP client to verify production deployment

### Troubleshooting Process

1. **Basic Connectivity**: Verify network connectivity and port accessibility
2. **Message Format**: Confirm message format matches Butler's expectations
3. **Butler Processing**: Check Butler logs for message reception and processing
4. **Destination Delivery**: Verify notifications reach configured destinations

### Documentation

When developing new features:

1. **Document Message Format**: Clearly specify expected message structure
2. **Provide Examples**: Include UDP client examples for testing
3. **Update Tests**: Add UDP client test cases to documentation
4. **Version Compatibility**: Note any changes to message format between versions

::: tip Getting Started

1. **Install Node.js**: Ensure Node.js is installed on your testing machine
2. **Clone Repository**: Get the Butler source code containing the UDP client
3. **Navigate to Client**: Change to the `src/udp_client` directory
4. **Run Tests**: Start with basic connectivity tests before complex scenarios

:::

::: warning Production Use

The UDP client is intended for testing and development only. In production environments, Qlik Sense servers should send UDP messages directly to Butler through the configured log appenders.

:::
