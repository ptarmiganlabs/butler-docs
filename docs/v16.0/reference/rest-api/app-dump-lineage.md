# App dump lineage data

The REST endpoints that serialize a Qlik Sense app to JSON now also include lineage data sourced from the Qlik Sense Engine API `GetLineage` method.

## Affected endpoints

- `GET /v4/senseappdump/:appId`
- `GET /v4/app/:appId/dump`

## What changed

While serializing an app dump, Butler calls the Qlik Sense Engine API `GetLineage` method. If the connected Engine version supports `GetLineage`, the returned data is added to a new top-level `lineage` object in the app dump payload. If the Engine does not support `GetLineage`, the `lineage` property is omitted from the response.

## Response shape

The existing dump payload is unchanged except for the added (optional) `lineage` property and a root-level `appId`:

```json
{
  "appId": "210832b5-6174-4572-bd19-3e61eda675ef",
  "properties": {},
  "loadScript": "",
  "lineage": {
    "qLineage": []
  },
  "sheets": [],
  "stories": [],
  "masterobjects": [],
  "appprops": [],
  "dataconnections": [],
  "dimensions": [],
  "bookmarks": [],
  "embeddedmedia": [],
  "snapshots": [],
  "fields": [],
  "variables": [],
  "measures": []
}
```

## Lineage source

The `lineage` object is returned directly from the Qlik Sense Engine API `GetLineage` call for the app being dumped. In practice, the `qLineage` array contains lineage entries for statements such as `LOAD` and `STORE`, which can be used for governance, troubleshooting, and understanding app data dependencies.

## Lineage entries

Each `lineage.qLineage[]` item can include:

- `qDiscriminator` — the origin of the lineage entry.
- `qStatement` — the related `LOAD` or `SELECT` statement from the app script.

Qlik documents these `qDiscriminator` value categories:

- Local file path (`[filename]` in the Qlik docs is placeholder notation for any local file path), for example `\\10.11.12.13\testdata\tedtalk\ted_main.csv`
- `INLINE`
- `RESIDENT`
- `AUTOGENERATE`
- Connector provider name (`Provider` in the Qlik docs)
- Web file (`[webfile]`)
- `STORE`
- `EXTENSION`

In the API schema source code, the same Windows path example appears with escaped backslashes because it is written as a JSON/JavaScript string literal.

## See also

- [Sense app introspection and metadata](/v16.0/examples/sense-app-introspection) — Examples of using the app dump endpoints, including the new lineage data.
- [Task Management](/v16.0/reference/rest-api/tasks) — Reference page listing the app dump endpoints.
