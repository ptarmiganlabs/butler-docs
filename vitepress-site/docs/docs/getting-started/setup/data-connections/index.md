---
title: "Creating Sense data connections"
linkTitle: "Sense data connections"
weight: 230
description: >
  If you intend to call Butler's REST API from the load script of Sense apps, you must create a few data connections first.

  A couple of them are mandatory, one is optional.
---

Two mandatory data connections must be created: `Butler_GET` and `Butler_POST`.

The latter is used both for POST calls and also PUT, DELETE and other HTTP operations.  
The `X-HTTP-Method-Override` HTTP header is used with the Butler_POST data connection to tell Butler which HTTP operation should be used.

This is a way to work around a limitation of Qlik's REST connector, as it only supports GET and POST operations.

One data connection is optional: `URL encode table`  
It is used to [URL encode strings](https://www.w3schools.com/tags/ref_urlencode.ASP), which is useful when passing strings to Butler's REST API (or other APIs!).

## URL encode table

::: info Optional
Creating this data connection is optional.

That said, if you plan to use the Slack, Teams, email, or webhook connectivity features of Butler, you should create this data connection.
:::

This is a basic "web file" connector pointing to `http://www.w3schools.com/tags/ref_urlencode.asp`:

![Creating the URL encode table data connection](/img/getting-started/setup/data-connections/url_encode-1.png Creating the URL encode table data connection)

::: warning Remember!
As with all new data connections, Sense will change the name your new connection (adding your username as a suffix).  
**Use the QMC to change the name to "URL encode table".**
:::

## Butler_GET

::: info Mandatory
These settings are mandatory if you plan to use Butler's REST API from the load scripts of Sense apps.
:::

With Butler running, create a new REST data connection called "Butler_GET".  
It's URL should point to Butler's host/port.

When creating REST data connections it's always a good idea to verify they work.  
Using the `/v4/butlerping` endpoint is an easy way to do this (assuming that endpoint is enabled in Butler's config file):

Creating the data connection can look like this:

|                                                                                                             |                                                                                                             |
| :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
| ![Creating the Butler_GET data connection](/img/butler_get-1.png "Creating the Butler_GET data connection") | ![Creating the Butler_GET data connection](/img/butler_get-2.png "Creating the Butler_GET data connection") |
| ![Creating the Butler_GET data connection](/img/butler_get-3.png "Creating the Butler_GET data connection") | ![Creating the Butler_GET data connection](/img/butler_get-4.png "Creating the Butler_GET data connection") |

No special settings are needed - just make sure the REST connector finds Butler as it should.  
The actual URL of the data connection will be modified on the fly every time you call the Butler APIs, it's thus not really important which URL is entered during the setup phase. But the `/v4/butlerping` endpoint is a convenient way to check that the data connection works.

Test the connection before creating it:

![Testing the Butler_GET data connection](/img/butler_get_connection-test-succeeded-1.png "Testing the Butler_GET data connection")

::: warning Remember!
As with all new data connections, Sense will change the name your new connection (adding your username as a suffix).  
**Use the QMC to change the name to "Butler_GET".**
:::

## Butler_POST

::: info Mandatory
These settings are mandatory if you plan to use Butler's REST API from the load scripts of Sense apps.
:::

The data connection used for POST, PUT, DELETE and all other HTTP operations beyond GET should be named "Butler_POST".  
Its configuration is similar to that of Butler_GET, except that a message body is also needed for the POST to work.

Assuming Butler's [key-value store is enabled](/docs/getting-started/setup/key-value-store) in the main config file, you can create a dummy key-value pair using a POST command with the following payload.

The effect is that the data connection is created and can be used for future POST/PUT/DELETE operations against Butler's API.  
The fact that is was created against the key-value store doesn't matter, the data connection details will be replaced each time it is used.

```json
{
  "key": "abc",
  "value": "123",
  "ttl": "5000"
}
```

Creating the data connection can look like this:

|                                                                                                                |                                                                                                                |
| :------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
| ![Creating the Butler_POST data connection](/img/butler_post-1.png "Creating the Butler_POST data connection") | ![Creating the Butler_POST data connection](/img/butler_post-2.png "Creating the Butler_POST data connection") |
| ![Creating the Butler_POST data connection](/img/butler_post-3.png "Creating the Butler_POST data connection") | ![Creating the Butler_POST data connection](/img/butler_post-4.png "Creating the Butler_POST data connection") |

... and test the connection before creating it.

![Testing the Butler_POST data connection](/img/butler_post_connection-test-succeeded-1.png "Testing the Butler_POST data connection")

::: warning Remember!
As with all new data connections, Sense will change the name your new connection (adding your username as a suffix).  
**Use the QMC to change the name to "Butler_POST".**
:::
