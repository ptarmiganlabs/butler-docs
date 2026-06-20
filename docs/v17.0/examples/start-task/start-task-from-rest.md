# Start Sense tasks using REST API

Use Butler's REST API to start Sense tasks from any system that can make HTTP requests.

## Overview

If the Butler config file is properly set up it's possible to start Sense tasks by doing a PUT or POST call to `/v4/reloadtask/{taskId}/start` endpoint.

A great use case is to have upstream systems that feed Qlik Sense with data trigger a Sense task when new data is available.  
That way Sense doesn't have to poll for new data, with less system resources used in both upstream system and in Sense.

**_AND_** users get the new data as quickly as possible!

::: tip General principles
The API docs contain the best info for how the API works, a few things to keep in mind though:

- Butler will verify that all specified task IDs exist before trying to start them. Invalid task IDs will be reported in the http response.
- If the `allTaskIdsMustExist` URL parameter is set to `true` it means that **all** specified task IDs must be valid for **any** of them to be started.
  - Tasks associated with tags and custom properties are not affected by the `allTaskIdsMustExist` flag.

:::

## Requirements

These config file settings must be set up before Butler can use the REST API to start tasks:

- Configure Butler's REST server:
  - Butler.restServerConfig.enable: true
  - Butler.restServerConfig.serverHost: `<IP or hostname where Butler's REST server is running>`
  - Butler.restServerConfig.serverPort: `<Port where Butler is exposing its REST server>`
  - Butler.restServerConfig.backgroundServerPort: `<Port used by Butler internally>`
- Enable the start task API endpoint
  - Butler.restServerEndpointsEnable.senseStartTask: true

## Demo

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

<iframe width="560" height="315" src="https://www.youtube.com/embed/5m6FPRqhN14" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Examples

In the examples below we keep it simple and just use curl to call the API.

::: warning Note

- This API requires an empty array to be passed in the body even when no tags, custom properties or similar are used.
- In the examples Butler is exposing its API on 192.168.1.168:8080

:::

### Start a single task using task ID

Using a `PUT` call to start task with ID `e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e`:

```bash
➜  ~ curl -X "PUT" "http://192.168.1.168:8080/v4/reloadtask/e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e/start" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'[]'
{
  "tasksId": {
    "started": [
      {
        "taskId": "e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e",
        "taskName": "Reload task of App1"
      }
    ],
    "invalid": [],
    "denied": []
  },
  "tasksTag": [],
  "tasksTagDenied": [],
  "tasksCP": [],
  "tasksCPDenied": []
}
➜  ~
```

The response tells us:

- One task was started.
- No task IDs were invalid.
- No task IDs were denied based on task filtering.
- No tasks were started or denied using tags or custom properties.

### Start a single task using an invalid task ID

The task ID `abc123` is invalid. This will be detected and reported in the response:

```bash
➜  ~ curl -X "PUT" "http://192.168.1.168:8080/v4/reloadtask/abc123/start" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'[]'
{
  "tasksId": {
    "started": [],
    "invalid": [
      {
        "taskId": "abc123"
      }
    ],
    "denied": []
  },
  "tasksTag": [],
  "tasksTagDenied": [],
  "tasksCP": [],
  "tasksCPDenied": []
}
➜  ~
```

### Start multiple tasks using valid task IDs

In this example all task IDs are valid. Two are passed in the message body:

```bash
➜  ~ curl -X "PUT" "http://192.168.1.168:8080/v4/reloadtask/-/start" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'[
  {
    "type": "starttaskid",
    "payload": {
      "taskId": "7552d9fc-d1bb-4975-9a38-18357de531ea"
    }
  },
  {
    "type": "starttaskid",
    "payload": {
      "taskId": "fb0f317d-da91-4b86-aafa-0174ae1e8c8f"
    }
  }
]'
{
  "tasksId": {
    "started": [
      {
        "taskId": "7552d9fc-d1bb-4975-9a38-18357de531ea",
        "taskName": "Reload task of App2"
      },
      {
        "taskId": "fb0f317d-da91-4b86-aafa-0174ae1e8c8f",
        "taskName": "Reload task of App3"
      }
    ],
    "invalid": [],
    "denied": []
  },
  "tasksTag": [],
  "tasksTagDenied": [],
  "tasksCP": [],
  "tasksCPDenied": []
}
➜  ~
```

The response tells us:

- The magic task ID "-" will be ignored.
- Two tasks, specified in the request body, were started.

### Start multiple tasks with task filtering

Here two task IDs are valid and on the list of approved task IDs. One task ID is invalid (too short).  
As `allTaskIdsMustExist=true` we expect that no task is started (_all_ task IDs must exist for _any_ task to be started based on task ID!).
Task filtering is turned on in the config file's `Butler.startTaskFilter.enable` entry.

```bash
➜  ~ curl -X "PUT" "http://192.168.1.168:8080/v4/reloadtask/e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e/start?allTaskIdsMustExist=true" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'[
  {
    "type": "starttaskid",
    "payload": {
      "taskId": "7552d9fc-d1bb-4975-9a38-18357de531ea"
    }
  },
  {
    "type": "starttaskid",
    "payload": {
      "taskId": "fb0f317d-da91-4b86-aafa-0174ae1e8c8"
    }
  }
]'
{
  "tasksId": {
    "started": [],
    "invalid": [
      {
        "taskId": "fb0f317d-da91-4b86-aafa-0174ae1e8c8"
      }
    ],
    "denied": [
      {
        "taskId": "e3b27f50-b1c0-4879-88fc-c7cdd9c1cf3e"
      },
      {
        "taskId": "7552d9fc-d1bb-4975-9a38-18357de531ea"
      }
    ]
  },
  "tasksTag": [],
  "tasksTagDenied": [],
  "tasksCP": [],
  "tasksCPDenied": []
}
➜  ~
```

The response tells us:

- No tasks were started based on task IDs.
- One invalid (too short!) task is returned in the response.
- As there was one or more invalid task IDs, the two valid and approved task IDs were not started.
  Their task IDs are returned in the denied array in the response.

## Advanced Usage

The REST API also supports:

- Starting tasks using tags
- Starting tasks using custom properties
- Combining task IDs, tags, and custom properties
- Passing key-value pairs as parameters to tasks

See the full API documentation for complete details on these advanced features.
