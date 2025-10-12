# Partial loads in Qlik Sense

It's surprisingly difficult to do partial loads in Qlik Sense Enterprise on Windows.

In QlikView that feature was easily available, but in QSEoW it's currently not possible to create reload tasks that do partial app reloads.

Butler has an API for doing partial reloads of apps.
A couple of demo apps are also included in the GitHub repository.

## Partial reload API

The full API documentation is available in the [Reference section](/docs/reference/rest-api?operationsSorter=alpha), here we're interested in the PUT `/v4/app/{appId}/reload` endpoint.

## Demo apps for partial reloads

A couple of apps showing how to use Butler's partial load API are [included in the GitHub repository](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps).

- The first app's load script uses the Butler API to do full and partial reloads of the second app.
- The second app loads 10 rows of data during a full reload and 5 rows during a partial reload.

<ResponsiveImage 
  src="/img/examples/butler-demo-partial-reload-1.png" 
  alt="Partial app reloads using Butler"
  caption="Demo showing full and partial app reloads using Butler API"
  maxWidth="800px"
/>

## Video showing how to use demo apps

Available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler YouTube playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

<iframe width="560" height="315" src="https://www.youtube.com/embed/0xh10ErPy6c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
