---
title: Butler
description: Add battle-proven admin and DevOps superpowers to Qlik Sense Enterprise on Windows and Qlik Sense Cloud.
---

## What is Butler?

Butler adds a suite of features to both Qlik Sense Enterprise on Windows (QSEoW) and Qlik Sense Cloud.  
Some features are used from load scripts, while others integrate Qlik with 3rd‑party systems (for example visualization tools, chat and alerting platforms - and more).

The general idea is to add battle‑proven admin and DevOps concepts and tools to Qlik Sense, making daily life easier for Qlik administrators and developers.

## Highlights

- Simple to adopt: turn individual features on/off as needed to match your security and resource profile.
- Integrations that matter: email, Slack, Microsoft Teams, New Relic, webhooks and more for actionable alerts and notifications.
- Admin‑friendly: log handling, health checks, and quality‑of‑life tools that reduce toil.
- Production ready: built using [Node.js](https://nodejs.org/en/); pre‑built binaries for Windows, macOS, Linux and Docker.

::: tip Quick start

- New to Butler? Start with [Getting started](/docs/getting-started/).
- Ready to install? Head over to [Install](/docs/getting-started/install/).
- Curious about related tools? Meet the [Butler family](/docs/about/butler-family).

:::

## Platform support at a glance

While Butler originated on QSEoW, more Qlik Sense Cloud capabilities are added continuously.

| Area                   | Example capabilities                 | QSEoW | Qlik Cloud |
| ---------------------- | ------------------------------------ | :---: | :--------: |
| Alerts & notifications | Reload failure to Email/Slack/Teams  |  ✅   |     ✅     |
| Script utilities       | Load‑script helpers and integrations |  ✅   |    ⚪︎     |
| Ops & admin            | Health checks, logs, automation      |  ✅   |    ⚪︎     |

Legend: ✅ available • ⚪︎ coming/limited

## Why Butler?

The goal is to integrate best‑of‑breed, open‑source tools into a focused utility that’s easy to operate. In some cases you could use those tools without Butler (for example, posting to Teams/Slack).

Butler lowers the barriers: consistent config, sensible defaults, and fewer moving parts compared to integrating with those tools individually.

## Configuration philosophy

Butler is designed to be very configurable.

Enable only the features you need to make configuration easier, as well as reduce attack surface and resource usage. This also makes it easier to introduce Butler in controlled steps.

## Running Butler

You can run Butler on the Qlik Sense server itself, in Docker on Linux, in Kubernetes, on macOS, and even on Raspberry Pi (proven to work, though not generally recommended for production).

## Architecture

Butler typically runs as a sidecar/companion service close to Qlik Sense, exposing API endpoints and utilities that can be called from reload tasks, external schedulers, or platform automation. It focuses on integrations and operational guardrails/monitoring rather than core data processing.

<ResponsiveImage
  src="/img/butler-system-overview-1.png"
  alt="Butler architecture"
  maxWidth="900px"
/>

## Related

- [Butler family](/docs/about/butler-family)
- [Getting started](/docs/getting-started/)
- [Reference](/docs/reference/)

<!-- System overview diagram can be added once an image is available in the public folder. -->
