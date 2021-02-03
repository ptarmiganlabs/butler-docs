---
title: "Creating Sense data connections"
linkTitle: "Sense data connections"
weight: 230
description: >
  If you intend to call Butler's REST API from the load script of Sense apps, you must create a couple of data connections first.
---

{{% alert title="Mandatory" color="primary" %}}
These settings are mandatory if you plan to use Butler's REST API from the load scripts of Sense apps.
{{% /alert %}}

Two data connections must be created: Butler_GET and Butler_POST.

The latter is used both for POST calls and also PUT, DELETE and other HTTP operations.  
The `X-HTTP-Method-Override` HTTP header is used with the Butler_POST data connection to tell Butler which HTTP operation should be used.

This is a way to work around a limitation of Qlik's REST connector, as it only supports GET and POST operations.

## Butler_GET

With Butler running, create a new REST data connection called "Butler_GET".  
It's URL should point to Butler's host/port.

When createing REST data connections it's always a good idea to verify they work.  
Using the `/v4/butlerping` endpoint is an easy way to do this (assuming that endpoint is enabled in Butler's config file):

![Creating the Butler_GET data connection](butler_get-1.png "Creating the Butler_GET data connection")  

No special settings are needed - just make sure the REST connector finds Butler as it should.  
The actual URL of the data connection will be modified on the fly every time you call the Butler APIs, it's thus not really important which URL is entered during the setup phase. But the `/v4/butlerping` endpoint is a conveneint way to check that the data connection works.

Test the connection:

![Testing the Butler_GET data connection](butler_get-2.png "Testing the Butler_GET data connection")  

{{% alert title="Remember!" color="warning" %}}
As with all new data connections, Sense will change the name your new connection (adding your username as a suffix).  
**Use the QMC to change the name to "Butler_GET".**
{{% /alert %}}

## Butler_POST

The data connection used for POST, PUT, DELETE and all other HTTP operations beyond GET should be named "Butler_POST".  
Its configuration is similar to that of Butler_GET, except that a message body is also needed for the POST to work. 

Assuming Butler's [key-value store is enabled](/docs/getting-started/setup/key-value-store) in the main config file, the following should work:

![Creating the Butler_POST data connection](butler_post-1.png "Creating the Butler_POST data connection")  

... and test the connection...

![Testing the Butler_POST data connection](butler_post-3.png "Testing the Butler_POST data connection")  

{{% alert title="Remember!" color="warning" %}}
As with all new data connections, Sense will change the name your new connection (adding your username as a suffix).  
**Use the QMC to change the name to "Butler_POST".**
{{% /alert %}}
