# Sense app introspection and metadata

Examples of how to extract metadata and structural information from Qlik Sense apps using Butler's REST API.

These examples show how to:

- List all apps on a Sense server
- Serialize a Sense app's internal structure to JSON
- Analyze app data models from within other Sense apps

## List all Sense apps on the server

Get a list of all apps available on the Sense server, including their IDs and names.

This is useful for:

- Building app inventories
- Creating app monitoring dashboards
- Dynamically selecting apps for processing
- Automating app management tasks

### Setup

Create a data connection called "Sense list apps" using Qlik's standard REST connector, connected to:

```
http://<FQDN or IP of Butler server>:8080/senseListApps
```

### Load Script

The following script will load all app IDs and names into a table:

```text
// "Sense list apps" is a data connection using Qlik's standard REST connector, connected
// to http://<FQDN or IP of Butler server>:8080/senseListApps
// The Apps table will contain id and name of all apps on the server

LIB CONNECT TO 'Sense list apps';

RestConnectorMasterTable:
SQL SELECT
    "id",
    "name"
FROM JSON (wrap on) "root";

Apps:
LOAD
    [id] 	AS [App id],
    [name] 	AS [App name]
RESIDENT RestConnectorMasterTable;

DROP TABLE RestConnectorMasterTable;
```

## Serialize a Sense app to JSON and extract data model

Extract the complete internal structure of a Sense app as JSON, then load it into another Sense app for analysis.

This is useful for:

- Analyzing app structure and complexity
- Building app documentation automatically
- Comparing apps to identify differences
- Creating app templates or patterns
- Understanding relationships between objects in apps

### Setup

Create a data connection called "Sense app extract" using Qlik's REST connector, against:

```
http://<FQDN or IP of Butler server>:8080/senseAppDump
```

This will generate several thousand lines of code in the Sense script editor, modeling a Sense app's internal data model. The Butler endpoint returns JSON, which the REST connector then transforms into a Sense data model.

### Load Script

To dynamically control which app is serialized, use the "with connection" syntax:

```text
LIB CONNECT TO 'Sense app extract';

let vAppId = 'abcd1234-5678-abcd-1234-abcd1234abcd';

RestConnectorMasterTable:
SQL SELECT
"loadScript",
...
FROM JSON (wrap on) "root" PK "__KEY_root"
WITH CONNECTION (
QUERY "guid" "$(vAppId)");
...
```

### Result

Here is what the Sense data model can look like for a serialized Sense app:

<ResponsiveImage 
  src="/img/examples/data_model_of_a_qlik_sense_app.png" 
  alt="Qlik Sense app data model"
  caption="Data model visualization of a Qlik Sense app's internal structure"
  maxWidth="900px"
/>

The data model contains detailed information about:

- App properties and metadata
- Load script content
- Sheets and visualizations
- Dimensions and measures
- Variables and expressions
- Data connections
- And much more...

## Use Cases

### App Inventory and Monitoring

Load app metadata into a monitoring app to track:

- Total number of apps
- App sizes and complexity
- Last reload times
- App ownership and access

### App Analysis and Documentation

Use the serialized app structure to:

- Generate documentation automatically
- Identify unused objects or fields
- Find performance bottlenecks
- Create dependency maps between apps

### App Migration and Templating

Extract app structures to:

- Create reusable app templates
- Compare development vs. production apps
- Migrate apps between environments
- Standardize app structures across teams

## See Also

- [Sense demo apps](./sense-demo-apps/) - Example apps demonstrating Butler features
- [Butler API documentation](./openapi-docs) - Complete REST API reference
- [Butler helper functions](/docs/reference/sense-helper-subs/) - Load script helper functions
