---
title: "Sending messages to MS Teams"
linkTitle: "Sending messages to MS Teams"
weight: 210
description: >
  MS Teams have moved away from simple webhooks to a concept called "workflows", which are really MS Power Automate workflows.  


  This means that a Power Automate webhook is needed in order for Butler to send messages to Teams.  

  
  This page describes both how to create new channels in Teams and how to set up new webhooks that can be used to send messages to the new channel.
---

## Overview

The goal is to create a new Teams channel to which Butler will send alerts when monitored Windows services are stopped or started.

The same concept is used to create channels and/or webhooks for other Butler alert features, such as failed reload tasks (client-managed Qlik Sense) or failed app reloads (Qlik Sense Cloud).

All screen shots below are from Teams running on macOS.  
Should look more or less the same on Windows...

## Create a new channel

Creating a new channel is an easy two-step process:

![Open the new channel window](/img/butler-teams-create-channel-1.png "Open the new channel window")

Select which team the channel should belong to, the channel name/description and permissions.  
Click Create.

![Enter info about the new channel](/img/butler-teams-create-channel-2.png "Enter info about the new channel")

## Create a new, webhook triggered workflow

Now let's create a new workflow, with associated webhook that can be used to send messages to the channel.

Open the workflow view by clicking on the "Workflows" link in the menu on the left. It may be hidden under the three-button-link.

![Open the workflow view](/img/butler-teams-create-webhook-1.png "Open the workflow view")

Existing workflow are listed, for all channels the user has access to.

![Create new workflow](/img/butler-teams-create-webhook-2.png "Create new workflow")

Create a new workflow by clicking the "New flow" button in upper right corner.  

![Open the workflow view](/img/butler-teams-create-webhook-3.png "Open the workflow view")

Search for "webhook" in the "Search templates" text box.  
The one we need is called "Post to a channel when a webhook request is received".

![Search for workflow templates related to webhooks](/img/butler-teams-create-webhook-4.png "Search for workflow templates related to webhooks")

Give the workflow a name and sign in.  
In most cases you will already be signed in, which shows by the green checkmark to the right of the "Microsoft Teams" text.

![Give the workflow a name](/img/butler-teams-create-webhook-5.png "Give the workflow a name")

Select which team and channel post should be sent to.

![Select team and channel](/img/butler-teams-create-webhook-6.png "Select team and channel")

Workflow has been created.

Copy the shown URL - it should be pasted into the Butler config file.

![Workflow created, take note of the URL](/img/butler-teams-create-webhook-7.png "Workflow created, take note of the URL")

The new workflow shows up in the overview.

It may take a few minutes (5-10) until it starts working, so don't be worried if alerts messages from Butler don't show up right away.

![Workflow created and enabled](/img/butler-teams-create-webhook-8.png "Workflow created and enabled")

## Example messages in the new channel

Here the "Print Spooler" service was stopped and started again on a Windows server.

![Alert when Windows service stopped](/img/butler-teams-winservice-alert-1.png "Alert when Windows service stopped")

![Notificaion when Windows service started](/img/butler-teams-winservice-alert-2.png "Notificaion when Windows service started")