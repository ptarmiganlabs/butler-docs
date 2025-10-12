# Key-Value Store

Overview of the key-value database concept and how it is implemented in Butler.

## Storing key-value pairs in Butler

The key-value (=KV) feature in Butler is a basic variant of the more complex [KV databases available](https://en.wikipedia.org/wiki/Key%E2%80%93value_database) out there, with [etcd](https://etcd.io/), [Apache Ignite](https://ignite.apache.org/) and [memcached](https://memcached.org/) being popular open source options. All the major cloud providers also have their own KV database products.

Butler's KV features are basic, yet very useful in the context of Qlik Sense. The only assumptions are:

- You have a value you want to store for some time outside of your Sense app.
- There is a unique key for each value you want to store.

Put differently: Think of Butler's KV store as a way to stash away some values, then get them back later when they are needed again.

Each KV pair is associated with a _namespace_. Namespaces are simply a way to categorize KV pairs.

::: warning Remember
Both key and value are strings in Butler's KV store. You must thus make sure to convert your data to strings before creating or updating a KV pair.
:::

There is also an optional, per KV-pair Time To Live (TTL) feature. If used it will auto-delete the KV pair when a certain time has passed from the KV-pair's last update.

The [API docs](/docs/reference/rest-api) shows what methods are available to work with KV pairs.

## How can a key-value store be used in Sense apps?

As mentioned above - A KV store can be useful whenever you need to stash data away for a while and then get it back.  
I.e. keeping track of the state of something.

For example:

### Pass parameters between apps in a reload chain

Let's assume data is created when appA reloads as part of an hourly reload schedule. That data is needed in appB, which is triggered to reload when appA finishes its reload. But how do you get the data from appA to appB?

Historically you solve this by writing the data to a temporary QVD or CSV file. This still works of course, but if it's only some dimensional value that needs to be passed, a KV store might be a cleaner option.

### Keep a time limited state

The TTL feature is useful to keep things tidy. If you know for sure that your KV pair only needs to be stored for a limited time, it's good practice to either delete it when its no longer needed, or set a TTL when the KV pair is first created.

This way you keep the KV namespaces relevant and reasonable in size.

### Use app IDs as namespace names

If you need to keep state between successive reloads of a particular app, you can use the app ID as namespace. That way it will be very clear which a specific KV pair belongs to.

### Keep track of what users should be notified after an app reload is complete

Let's say you have a button in an app that when clicked kicks of a reload of the app (or some other app).
Let's also assume several users might be interested in triggering a refresh of this dataset.

By pushing each user's username to a KV namespace when they request the data refresh (by clicking that button in the app), it's possible to notify them using Teams, Slack, email etc as the last step of the app's reload script (i.e. when the app is just about done refreshing the data).

The effect is a solution where users can request a data refresh and be notified when the new data is available.

### Keeping state in visualization extensions

Extensions are built using Javascript, and they can thus also make use of the KV store.

There might be times when several extension instances in an app need to keep in sync or share some state - a KV store might be useful there.  
The KV store could even allow an extension to share state with its siblings in other Sense apps.

## Persistence of key-value data

KV pairs are not persisted to disk.  
Is this good or bad? It depends:

- **Good** as it reduces complexity in Butler.
- **Bad** as all KV pairs are lost when Butler is restarted. Now, Butler tends to be very stable, so spontaneous restarts are usually not a problem. But the flushing of all KV data is still something to consider when for example upgrading Butler to new versions.

## API Reference

The KV store can be accessed via Butler's REST API. Common operations include:

- `POST /v4/kvstore/{namespace}` - Create or update a key-value pair
- `GET /v4/kvstore/{namespace}?key={key}` - Retrieve a value by key
- `DELETE /v4/kvstore/{namespace}?key={key}` - Delete a specific key-value pair
- `GET /v4/kvstore/{namespace}` - List all keys in a namespace

---

::: tip Getting Started
Check out the examples section for practical demonstrations of using the key-value store in your Qlik Sense apps (coming soon).
:::
