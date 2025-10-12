# Task Management

Endpoints for managing Qlik Sense tasks and scheduling operations.

## Task Operations

### Start Task

<OAOperation operation-id="put-/v4/reloadtask/{taskId}/start" />

<OAOperation operation-id="post-/v4/reloadtask/{taskId}/start" />

## App Operations

### Reload App

<OAOperation operation-id="put-/v4/app/{appId}/reload" />

### Dump App

<OAOperation operation-id="get-/v4/app/{appId}/dump" />

<OAOperation operation-id="get-/v4/senseappdump/{appId}" />

### List Apps

<OAOperation operation-id="get-/v4/apps/list" />

<OAOperation operation-id="get-/v4/senselistapps" />

## Scheduling

### Get Schedules

<OAOperation operation-id="get-/v4/schedules" />

### Create Schedule

<OAOperation operation-id="post-/v4/schedules" />

### Delete Schedule

<OAOperation operation-id="delete-/v4/schedules/{scheduleId}" />

### Start Schedule

<OAOperation operation-id="put-/v4/schedules/{scheduleId}/start" />

### Stop Schedule

<OAOperation operation-id="put-/v4/schedules/{scheduleId}/stop" />

### Start All Schedules

<OAOperation operation-id="put-/v4/schedules/startall" />

### Stop All Schedules

<OAOperation operation-id="put-/v4/schedules/stopall" />

### Schedule Status

<OAOperation operation-id="get-/v4/schedules/status" />
