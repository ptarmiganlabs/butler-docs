# Alert Template Fields for Preload Tasks

List of template fields available in Butler's preload task alert messages.

::: tip New in Butler 15.0.0
Email notifications for preload task success and failure were added in Butler 15.0.0.
:::

## Template fields

Butler uses the [Handlebars](https://handlebarsjs.com/) library for templating work.

Handlebars offers a lot of useful features (nested template fields, evaluation context, template comments) and it's recommended that you browse through at least the [language features](https://handlebarsjs.com/guide/#installation) section of their getting started guide to get a feeling for what's possible.

::: warning
Only email notifications currently support template files for preload tasks.
:::

If a template field is used for an alert type where that field is not supported, the field will simply be blank. No errors will occur, but it can still be tricky to debug if you're not aware of this.

The following template fields are available in preload task alert messages.

| Failed | Success | Field name                           | Description                                                                   |
| :----: | :-----: | ------------------------------------ | ----------------------------------------------------------------------------- |
|   ✅   |   ✅    | `hostName`                           | Server on which the preload task executed.                                    |
|   ✅   |   ✅    | `user`                               | User ID running the task. Typically `sa_scheduler` for scheduled tasks.       |
|   ✅   |   ✅    | `taskId`                             | ID of preload task.                                                           |
|   ✅   |   ✅    | `taskName`                           | Name of preload task.                                                         |
|   ✅   |   ✅    | `appId`                              | ID of Sense app associated with the preload task (if available).              |
|   ✅   |   ✅    | `appName`                            | Name of app (if available).                                                   |
|   ✅   |   ✅    | `taskCustomProperties`               | Custom properties that are present on the preload task.                       |
|   ✅   |   ✅    | `taskTags`                           | Tags that are present on the preload task.                                    |
|   ✅   |   ✅    | `taskNextExecution`                  | Next scheduled execution of the preload task.                                 |
|   ✅   |   ✅    | `logTimeStamp`                       | Timestamp as recorded in the Sense logs.                                      |
|   ✅   |   ✅    | `logLevel`                           | Log level of the Sense log file entry causing the alert.                      |
|   ✅   |   ✅    | `logMessage`                         | Log message from the Sense log files.                                         |
|   ✅   |   ✅    | `executingNodeName`                  | Name of the server where the preload task executed.                           |
|   ✅   |   ✅    | `executionDuration.hours`            | Duration of task execution (hours part).                                      |
|   ✅   |   ✅    | `executionDuration.minutes`          | Duration of task execution (minutes part).                                    |
|   ✅   |   ✅    | `executionDuration.seconds`          | Duration of task execution (seconds part).                                    |
|   ✅   |   ✅    | `executionStartTime.startTimeUTC`    | UTC timestamp for task start.                                                 |
|   ✅   |   ✅    | `executionStartTime.startTimeLocal1` | Task start timestamp, format 1.                                               |
|   ✅   |   ✅    | `executionStartTime.startTimeLocal2` | Task start timestamp, format 2.                                               |
|   ✅   |   ✅    | `executionStartTime.startTimeLocal3` | Task start timestamp, format 3.                                               |
|   ✅   |   ✅    | `executionStartTime.startTimeLocal4` | Task start timestamp, format 4.                                               |
|   ✅   |   ✅    | `executionStartTime.startTimeLocal5` | Task start timestamp, format 5.                                               |
|   ✅   |   ✅    | `executionStopTime.stopTimeUTC`      | UTC timestamp for task end.                                                   |
|   ✅   |   ✅    | `executionStopTime.stopTimeLocal1`   | Task end timestamp, format 1.                                                 |
|   ✅   |   ✅    | `executionStopTime.stopTimeLocal2`   | Task end timestamp, format 2.                                                 |
|   ✅   |   ✅    | `executionStopTime.stopTimeLocal3`   | Task end timestamp, format 3.                                                 |
|   ✅   |   ✅    | `executionStopTime.stopTimeLocal4`   | Task end timestamp, format 4.                                                 |
|   ✅   |   ✅    | `executionStopTime.stopTimeLocal5`   | Task end timestamp, format 5.                                                 |
|   ✅   |   ✅    | `executionStatusNum`                 | Final preload task status code.                                               |
|   ✅   |   ✅    | `executionStatusText`                | Final preload task status message.                                            |
|   ✅   |   ✅    | `qlikSenseQMC`                       | Link to QMC, as defined in main config file.                                  |
|   ✅   |   ✅    | `qlikSenseHub`                       | Link to Hub, as defined in main config file.                                  |
|   ✅   |   ✅    | `genericUrls`                        | Links to other systems, as defined in main config file.                       |

## Example template

Here's a simplified example of a Handlebars template for preload task failure emails:

```handlebars
<h1>Qlik Sense preload task failed</h1>

<table>
  <tr>
    <td><strong>Task name</strong><br>{{taskName}}</td>
    <td><strong>Task ID</strong><br>{{taskId}}</td>
  </tr>
  <tr>
    <td><strong>App name</strong><br>{{appName}}</td>
    <td><strong>App ID</strong><br>{{appId}}</td>
  </tr>
  <tr>
    <td><strong>Task started</strong><br>{{executionStartTime.startTimeLocal1}}</td>
    <td><strong>Task ended</strong><br>{{executionStopTime.stopTimeLocal1}}</td>
  </tr>
  <tr>
    <td>
      <strong>Duration</strong><br>
      {{executionDuration.hours}}h {{executionDuration.minutes}}m {{executionDuration.seconds}}s
    </td>
    <td><strong>Executing node</strong><br>{{executingNodeName}}</td>
  </tr>
  <tr>
    <td><strong>Result</strong><br>{{executionStatusText}}</td>
    <td><strong>Log message</strong><br>{{logMessage}}</td>
  </tr>
</table>

<p><a href="{{qlikSenseQMC}}">Open QMC</a> | <a href="{{qlikSenseHub}}">Open Hub</a></p>
```

See the sample templates in Butler's `src/config/email_templates` directory for complete examples.
