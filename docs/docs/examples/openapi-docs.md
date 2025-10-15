# Swagger UI: Try out the Butler API using the API docs

Assuming Butler is properly configured and running, it's easy to try out Butler's API.

This page shows some examples of interactions with the Butler API.

Below are some examples of how Butler's built-in Swagger docs can be used to test-drive the Butler API.

Note: Some of the videos below were created with older Butler versions.  
Details may have changed (for example what API parameters are available), the general concepts remain the same though.

## OpenAPI documentation built into Butler

The complete documentation for Butler's REST API is built into Butler itself.
This means that its very easy to try out and get familiar with the various API endpoints, without having to create Sense apps for everything you want to try out.

If Butler's config file contains the settings below, the API will be available at `http://192.168.1.168:8080`.

```yaml
restServerConfig:
  enable: true
  serverHost: 192.168.1.168
  serverPort: 8080
  backgroundServerPort: 8083
```

In addition to the API endpoints, the API documentation will be available at `http://192.168.1.168:8080/documentation`.  
The beauty of the Swagger docs is that you can also test drive the API itself. If you have Butler running it's thus super easy to test the various REST API endpoints.

The API doc page looks like this:

<ResponsiveImage 
  src="/img/examples/openapi-latest-1.png" 
  alt="Butler OpenAPI documentation interface"
  maxWidth="900px"
/>

::: info Other tools for exploring APIs
If the OpenAPI interface to Butler's API feels limited, there are lots of tools dedicated to this task.  
Two good ones are:

- [Insomnia](https://insomnia.rest) is cross platform and has an excellent free version.
- [Postman](https://www.postman.com/) is also good and cross platform.
  :::

### Butler ping

This is the most basic API endpoint of them all. Can be used to verify that Butler is actually running and responding as expected.

Looks like this. Note the response we get from Butler's API.

<iframe width="560" height="315" src="https://www.youtube.com/embed/K_1f_hSZ-4k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### List all enabled API endpoints

Let's take a look at which API endpoints are [enabled in the restServerEndpointsEnable section of the config file](/docs/reference/config-file):

<iframe width="560" height="315" src="https://www.youtube.com/embed/JdOt1aQj9Hw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Key-value pairs, demo 1

Create and query key-value pairs.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Vx9MVODo38E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Schedules, demo 1

Create, query, edit and delete task reload schedules using Butler's scheduling API.

When watching the video below, you will notice there are two pre-defined schedules.  
One of them fires every 30 seconds and this is also visible in the Butler logs:

<ResponsiveImage 
  src="/img/examples/butler-running-schedules-firing-1.png" 
  alt="Active user sessions"
  maxWidth="900px"
/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/f-ZSUvXeFmw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### List available Sense apps and extract them as JSON

List existing apps on Sense server, then export one of them to JSON.

<iframe width="560" height="315" src="https://www.youtube.com/embed/vFB0u_eLsJs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
