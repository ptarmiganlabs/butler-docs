# Messaging from Sense load scripts

Examples on how to send messages to various platforms from the Qlik Sense (or QlikView) load script using Butler's REST API.

While it is quite possible to call the Butler REST endpoints directly from a LOAD...FROM statement, it is usually more convenient to use the subroutine wrappers that are available as .qvs files in the sense_script folder in the Butler repository.

## Initialization

Before doing any calls to Butler, we should initialize things. Failing to do so might lead to errors and unpredictable responses from the Butler APIs.

```text
$(Must_Include=[lib://Butler scripts/butler_init.qvs]);
CALL ButlerInit;
```

Note:

- We first include the subroutine from a .qvs file, then call it. The same concept is used throughout Butler when it comes to making use of Butler features from the Sense load script.
- The Butler qvs files are stored in a folder on the Sense server, which is linked to a data connection called "Butler scripts".

With this taken care of, we can call any other Butler API.

## Posting to Slack

Post messages to Slack channels from your load script to notify users about reload progress, errors, or other events.

```text
$(Must_Include=[lib://Butler scripts/butler_init.qvs]);
$(Must_Include=[lib://Butler scripts/post_to_slack.qvs]);

CALL ButlerInit;
CALL PostToSlack('sense-reload-info', 'server: senseServer1', '*<App name>*: reload starting', ':ghost:');	// Post a starting message to Slack
CALL PostToSlack('sense-reload-info', subfield(OSUser(),'UserId=',2) & ' on server: ' & ComputerName(), '*Reloaded by: ' & subfield(OSUser(),'UserId=',2) & '* <App name>: Reload starting', ':test:');
```

This will result in the following Slack entries:

<ResponsiveImage 
  src="/img/examples/post_to_slack_1.png" 
  alt="Posting to Slack"
  maxWidth="700px"
/>

<ResponsiveImage 
  src="/img/examples/post_to_slack_2.png" 
  alt="Posting to Slack"
  maxWidth="700px"
/>

## Post a message to an MQTT topic

Publish messages to MQTT topics from your load script. This is useful for integrating with IoT systems, event-driven architectures, or other systems that subscribe to MQTT topics.

```text
$(Must_Include=[lib://Butler scripts/butler_init.qvs]);
$(Must_Include=[lib://Butler scripts/post_to_mqtt.qvs]);

CALL ButlerInit;
CALL PostToMQTT('qliksense/myapp/reload_status', 'starting');   // Posting message "starting" to topic "qliksense/myapp/reload_status"
```

You can use this to:

- Notify external systems about reload status
- Trigger downstream processes when data is ready
- Send metrics or monitoring data to MQTT-based monitoring systems
- Integrate with IoT platforms that use MQTT

## See Also

- [Reload chaining with parameters](./reload-chaining) - Pass data between apps using Butler's key-value store
- [Start Sense tasks](/docs/examples/start-task/start-task-from-script) - Trigger reload tasks programmatically
- [Butler helper functions](/docs/reference/sense-helper-subs) - Complete reference for all Butler load script functions
