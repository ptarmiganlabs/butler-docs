# UDP Client

A basic UDP client tool for testing Butler's UDP servers and debugging message handling.

## What is the UDP Client?

Butler includes a simple command-line UDP client that can send test messages to Butler's UDP servers. This tool is valuable for:

- **Debugging**: Testing UDP server functionality during development
- **Development**: Creating new UDP message handlers
- **Troubleshooting**: Verifying network connectivity and message parsing
- **Testing**: Simulating Qlik Sense events without them actually occurring in Qlik Sense

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

Butler runs a single UDP server for receiving task-related messages.  
The default port is `9998` but this can be changed in Butler's configuration file.

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

Butler should log the received message with a warning as it does not conform to the expected format.

## Message Formats

The Sense log appenders send messages in specific formats where fields are separated by semicolons.

Please refer to the log appender files included in the ZIP distribution for exact formats.

## Testing Scenarios

### Network Connectivity Testing

Verify that Butler can receive UDP messages from remote servers:

```bash
# Basic connectivity test
node udp_client.js --ip butler-server.company.com --port 9998 --msg "Connectivity test"
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

---

::: tip Getting Started

1. **Install Node.js**: Ensure Node.js is installed on your testing machine
2. **Clone Repository**: Get the Butler source code containing the UDP client
3. **Navigate to Client**: Change to the `src/udp_client` directory
4. **Run Tests**: Start with basic connectivity tests before complex scenarios

:::
