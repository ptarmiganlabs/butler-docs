# Flexible scheduling of Sense reload tasks

Examples showing how to use the Butler scheduler using direct API calls.

There are many ways to call REST APIs. In this page curl is used, but the same tests can be done using [Insomnia](https://insomnia.rest), [Postman](https://www.postman.com/) and by using the [REST connector](https://help.qlik.com/en-US/connectors/Subsystems/REST_connector_help/Content/Connectors_REST/REST-connector.htm) from within Qlik Sense load scripts.

All the examples assume Butler is exposing it's API on 192.168.1.168:8080.

## List all defined schedules

Looks like there is currently one schedule:

```bash
➜  ~ curl "http://192.168.1.168:8080/v4/schedules" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   306  100   306    0     0  16498      0 --:--:-- --:--:-- --:--:-- 20400
[
   {
      "created" : "2021-10-08T07:24:38.373Z",
      "cronSchedule" : "* */2 * * *",
      "id" : "3702cec1-b6c8-463e-bda3-58d6a94dd9ac",
      "lastKnownState" : "started",
      "name" : "Every 2 hours",
      "qlikSenseTaskId" : "0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b",
      "startupState" : "started",
      "tags" : [
         "tag 3",
         "abc 123 åäö"
      ],
      "timezone" : "Europe/London"
   }
]
➜  ~
```

## Get a specific schedule

Let's try to get a schedule that doesn't exist:

```bash
➜  ~ curl "http://192.168.1.168:8080/v4/schedules?id=Manually-added-schedule-1" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   117  100   117    0     0  14563      0 --:--:-- --:--:-- --:--:-- 29250
{
   "error" : "Bad Request",
   "message" : "REST SCHEDULER: Schedule ID Manually-added-schedule-1 not found.",
   "statusCode" : 400
}
➜  ~
```

Here's a schedule that _does_ exist (as per the API call above):

```bash
➜  ~ curl "http://192.168.1.168:8080/v4/schedules?id=3702cec1-b6c8-463e-bda3-58d6a94dd9ac" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   354  100   354    0     0  50499      0 --:--:-- --:--:-- --:--:--  115k
{
   "created" : "2021-10-08T07:24:38.373Z",
   "cronSchedule" : "* */2 * * *",
   "id" : "3702cec1-b6c8-463e-bda3-58d6a94dd9ac",
   "lastKnownState" : "started",
   "name" : "Every 2 hours",
   "qlikSenseTaskId" : "0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b",
   "startupState" : "started",
   "tags" : [
      "tag 3",
      "abc 123 åäö"
   ],
   "timezone" : "Europe/London"
}
➜  ~
```

## Add new schedule

Note how we get back information about the newly created schedule. It's the same data that was sent to the API method, with the addition of schedule id, created timestamp and last known state.

```bash
➜  ~ curl -X "POST" "http://192.168.1.168:8080/v4/schedules" -H 'Content-Type: application/json' -d $'{
  "timezone": "Europe/Stockholm",
  "tags": [
    "tag 1",
    "abc 123 åäö"
  ],
  "qlikSenseTaskId": "0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b",
  "name": "Every 5 sec",
  "cronSchedule": "*/5 * * * * *",
  "startupState": "started"
}' | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   544  100   307  100   237  21470  16574 --:--:-- --:--:-- --:--:-- 49454
{
   "created" : "2021-10-27T05:15:28.580Z",
   "cronSchedule" : "*/5 * * * * *",
   "id" : "b028d0a2-7116-41bf-b15a-4f01bd126464",
   "lastKnownState" : "started",
   "name" : "Every 5 sec",
   "qlikSenseTaskId" : "0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b",
   "startupState" : "started",
   "tags" : [
      "tag 1",
      "abc 123 åäö"
   ],
   "timezone" : "Europe/Stockholm"
}
➜  ~
```

Looking in the Butler logs we see that the every-5-seconds schedule with an ID ending in ...a300 indeed fires every 5 seconds:

<ResponsiveImage 
  src="/img/examples/butler-logs-new-schedule-1.png" 
  alt="New schedule fires every 5 seconds"
  maxWidth="900px"
/>

## Starting and stopping a schedule

Let's stop the schedule we just created:

```bash
➜  ~ curl -X "PUT" "http://192.168.1.168:8080/v4/schedules/b028d0a2-7116-41bf-b15a-4f01bd126464/stop" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100     2  100     2    0     0    246      0 --:--:-- --:--:-- --:--:--   500
{}
➜  ~
```

If we get info about this schedule, it should have `lastKnownState`=stopped... Let's verify.

```bash
➜  ~ curl "http://192.168.1.168:8080/v4/schedules?id=fb9b16f1-e2cf-4291-8036-24ef90efa300" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   307  100   307    0     0    99k      0 --:--:-- --:--:-- --:--:--   99k
{
   "created" : "2020-10-16T15:23:36.957Z",
   "cronSchedule" : "*/5 * * * * *",
   "id" : "fb9b16f1-e2cf-4291-8036-24ef90efa300",
   "lastKnownState" : "stopped",
   "name" : "Every 5 sec",
   "qlikSenseTaskId" : "0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b",
   "startupState" : "started",
   "tags" : [
      "tag 1",
      "abc 123 åäö"
   ],
   "timezone" : "Europe/Stockholm"
}
➜  ~
```

Great!

As a final step, let's start the schedule again, as well as verifying it was successfully started:

```bash
➜  ~ curl -X "PUT" "http://192.168.1.168:8080/v4/schedules/fb9b16f1-e2cf-4291-8036-24ef90efa300/start" | json_pp
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   309  100   309    0     0  77250      0 --:--:-- --:--:-- --:--:-- 77250
[
   {
      "created" : "2020-10-16T15:23:36.957Z",
      "cronSchedule" : "*/5 * * * * *",
      "id" : "fb9b16f1-e2cf-4291-8036-24ef90efa300",
      "lastKnownState" : "started",
      "name" : "Every 5 sec",
      "qlikSenseTaskId" : "0fe447a9-ba1f-44a9-ac23-68c3a1d88d8b",
      "startupState" : "started",
      "tags" : [
         "tag 1",
         "abc 123 åäö"
      ],
      "timezone" : "Europe/Stockholm"
   }
]
```
