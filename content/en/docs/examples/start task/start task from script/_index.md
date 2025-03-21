---
title: "Start Sense tasks from load script of Sense apps"
linkTitle: "Load script"
weight: 20
description: >
---

## Helper functions included

It is very much possible to call Butler's REST API from the load script of Sense apps.  
Create a REST connector in the Sense editor, configure it for the endpoint you want to call and use it from the load script.

This works but is tedious and quickly leads to lots of script code - especially if you need to make many calls to the Butler API.

To make things a bit easier the Butler GitHub repository includes a set of helper .qvs files.  
These contain functions/subs that encapsulate various Butler APIs (include starting tasks) and make them easier to use.

Just include the [butler_subs.qvs](https://github.com/ptarmiganlabs/butler/blob/master/docs/sense_script/butler_subs.qvs) file from the GitHub release package and you get (among many other things) a helper function that's called `StartTask`.

## Requirements for starting tasks via REST API

These config file settings must be set up before Butler can use the REST API to start tasks:

- Connection to Qlik Sense:
  - Butler.configQRS.\*
- Configure Butler's REST server:
  - Butler.restServerConfig.enable: true
  - Butler.restServerConfig.serverHost: <IP or hostname where Butler's REST server is running>
  - Butler.restServerConfig.serverPort: <Port where Butler is exposing its REST server>
  - Butler.restServerConfig.backgroundServerPort: <Port used by Butler internally>
- Enable the start task API endpoint
  - Butler.restServerEndpointsEnable.senseStartTask: true
- Sense data connections as described in the [Getting started](/docs/getting-started/setup/data-connections) section.

## Helper functions

There are two helper functions/sub for starting tasks:

- `StartTask(...)` is a generic function that can be called with a single task ID, or with complex combinations of task IDs, tags, custom properties and key-value pairs.
- `StartTask_KeyValue(...)` makes it easy to start a single task and pass along one key-value pair as parameter. This function is essentially a specialized version of the more generic `StartTask` sub.

### Start a single task

The function(=sub in Sense lingo) `StartTask` takes a single `taskId` parameter, which means that starting a reload task from an app's load script is as simple as

    Call StartTask(<TaskId>)

The demo app `Butler 8.4 demo app.qvf` ([link](https://github.com/ptarmiganlabs/butler/tree/master/docs/sense_apps)) contains such a demo (and many others).

### Need to pass along parameters to a task? There's a Sub for that!

Sometimes you need to send parameters to a reload task (or rather to the load script of the app associated with the task).  
This can be done by using the `StartTask_KeyValue` helper function/Sub.

That Sub takes a taskId as parameter (similarly to its `StartTask` sibling), but it also takes parameters for a full key-value pair:

    Call StartTask_KeyValue('fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c', 'MyNamespace', 'An important key', 'The value', 3000)

The parameters are

- The namespace to store the key-value pair in (required).
- The key (required).
- The value (required).
- An time-to-live value in milliseconds (optional). When the ttl times out the key-value pair is automatically deleted.

Documentation about Butler's key-value store is available [here](/docs/concepts/key-value/).

An example showing how task chaining with parameters can be done using key-values is found [here](/docs/examples/reload-chaining/).

### Start several tasks using task IDs

If several tasks should be started using task IDs, those IDs need to be passed into the `StartTask` sub.  
This is done by storing the task IDs in a separate table whose name is passed as a parameter into `StartTask`:

These tables can be called anything as long as

1. They are qualified (i.e. keep the "Qualify \*;" statement!).
2. The table names are passed as parameters to the StartTask function.
3. The table MUST have a field called `TaskId` that contains the IDs of reload tasks to be started.

Regarding parameters to StartTask:

1. Trailing, unused parameters can be omitted.
2. Unused parameters that are followed by used parameters should be set to Null().

### Example 1

The script below will start tasks `fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c` (via the first parameter), `7552d9fc-d1bb-4975-9a38-18357de531ea` (via second parameter, i.e. a table) and `fb0f317d-da91-4b86-aafa-0174ae1e8c8f` (via second parameter too).

```
Qualify *;

ButlerTaskIDs:
Load * Inline [
TaskId
7552d9fc-d1bb-4975-9a38-18357de531ea
fb0f317d-da91-4b86-aafa-0174ae1e8c8f
];

Call StartTask('fbf645f0-0c92-40a4-af9a-6e3eb1d3c35c', 'ButlerTaskIDs')

Unqualify *;
```

### Example 2

Same as previous example, except that the first parameter is not used.  
It must still be specified though! Set to `Null()` to indicate it isn't used.

The script below will thus start tasks `7552d9fc-d1bb-4975-9a38-18357de531ea` and `fb0f317d-da91-4b86-aafa-0174ae1e8c8f`.

```
Qualify *;

ButlerTaskIDs:
Load * Inline [
TaskId
7552d9fc-d1bb-4975-9a38-18357de531ea
fb0f317d-da91-4b86-aafa-0174ae1e8c8f
];

Call StartTask(Null(), 'ButlerTaskIDs')

Unqualify *;
```

### Start tasks using tags

Similar to how multiple tasks can be started using a table of task IDs (see above), tasks can also be started using a table containing tag names.

### Example 1

The script below will start all reload tasks that have the `startTask1` or `startTask2` tag set.

```
Qualify *;

ButlerTags:
Load * Inline [
Tag
startTask1
startTask2
];

Call StartTask(, Null(), 'ButlerTags')

Unqualify *;
```

### Start tasks using custom properties

Similar to how multiple tasks can be started using a table of task IDs (see above), tasks can also be started using a table containing custom property names and values.

### Example 1

The script below will start all reload tasks that have the `taskGroup` custom property set to a value of `tasks1`.

```
Qualify *;

ButlerCustomProperties:
Load * Inline [
Name, Value
taskGroup, tasks1
];

Call StartTask(, Null(), Null(), 'ButlerKeyValues')

Unqualify *;
```

## Seeing is believing

The video below is available at [Ptarmigan Labs' YouTube channel](https://www.youtube.com/channel/UCpQblhippq-KfWkXEEYFHTQ) and also in the [Butler playlist](https://www.youtube.com/playlist?list=PLUuyY5OOOsz3XX5YT2QEwa7dzaBT1kOCP).

{{< youtube id="5m6FPRqhN14" modestbranding=true color="red">}}
