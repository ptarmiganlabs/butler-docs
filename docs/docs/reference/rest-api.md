# REST API Documentation

Butler provides a REST API that allows you to interact with some of its features programmatically.

::: warning Remember
The "Try it out" feature of the API documentation below does not work when accessed from butler.ptarmiganlabs.com. This is only expected as this site does not know anything about where _your_ Butler instance is running.

The same feature is however also available from Butler itself, see [this page](/docs/examples/openapi-docs).
:::

## API Overview

Butler's REST API is documented using the OpenAPI 3.0 specification and provides endpoints for:

- **System Management**: Health checks, version information, configuration
- **File Operations**: Copy, move, delete files, create directories
- **Task Management**: Start Qlik Sense tasks, scheduling operations
- **Key-Value Store**: Data storage and retrieval operations
- **Messaging**: MQTT publishing, Slack notifications
- **Monitoring**: New Relic integration, app dumping
- **Utility Functions**: Base encoding conversions, app listings

## Interactive API Documentation

<OASpec />

## Additional Resources

- [Download OpenAPI JSON](/openapi/butler_latest.json) - Raw OpenAPI specification
- [Butler Examples](/docs/examples/) - Code examples and use cases
- [Configuration Guide](/docs/reference/config-file) - API configuration options

## Getting Started with the API

1. **Enable API endpoints** in your Butler configuration file
2. **Configure authentication** if required
3. **Test connectivity** using the `/v4/butlerping` endpoint
4. **Explore endpoints** using the interactive documentation above

The Butler API follows REST principles and returns JSON responses. All endpoints are prefixed with `/v4/` to indicate the API version.
