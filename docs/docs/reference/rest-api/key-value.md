# Key-Value Store

Butler's key-value store provides a simple data storage and retrieval mechanism with namespace support and TTL functionality.

## Namespace Management

### List Namespaces

<OAOperation operation-id="get-/v4/keyvaluesnamespaces" />

### Delete Namespace

<OAOperation operation-id="delete-/v4/keyvalues/{namespace}" />

## Key-Value Operations

### Get Value

<OAOperation operation-id="get-/v4/keyvalues/{namespace}" />

### Set Value

<OAOperation operation-id="post-/v4/keyvalues/{namespace}" />

### Delete Key

<OAOperation operation-id="delete-/v4/keyvalues/{namespace}/{key}" />

### Check Key Exists

<OAOperation operation-id="get-/v4/keyvalues/{namespace}/keyexists" />

### List Keys

<OAOperation operation-id="get-/v4/keylist/{namespace}" />
