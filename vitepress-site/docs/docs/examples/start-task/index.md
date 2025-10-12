# Start Sense tasks using Butler APIs

Butler provides multiple ways to start Qlik Sense reload tasks, giving you flexibility in how you integrate task execution into your workflows.

## Available Methods

Butler supports starting tasks through three different interfaces:

### [REST API](./start-task-from-rest)

Start tasks by making HTTP calls to Butler's REST API. Perfect for integration with external systems, web applications, or any tool that can make HTTP requests.

### [MQTT](./start-task-from-mqtt)

Use MQTT messages to trigger task execution. Ideal for IoT scenarios, event-driven architectures, or when you need to decouple task triggering from the source system.

### [Load Script](./start-task-from-script)

Start tasks directly from the load script of Qlik Sense apps using helper functions. Great for creating reload chains and passing parameters between apps.

## Use Cases

- **Event-driven reloads**: Trigger Sense task execution when data becomes available in source systems
- **Reload chains**: Orchestrate complex reload sequences across multiple apps
- **External system integration**: Allow upstream systems to trigger Sense reloads without polling
- **Real-time data updates**: Provide users with the most current data as soon as it's available

## Common Requirements

All methods require:

- Butler properly configured and running
- Connection to Qlik Sense Enterprise on Windows (QSEoW)
- Appropriate Butler configuration settings enabled

See the individual pages for specific requirements and examples.
