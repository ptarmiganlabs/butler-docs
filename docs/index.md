---
layout: home

hero:
  name: "Butler"
  text: "Adding superpowers to Qlik Sense"
  tagline: "Great looking alerts, advanced scheduling, task chaining, key-value store, Sense license monitoring, MQTT integration and more. Open source and ready to use."
  actions:
    - theme: brand
      text: Documentation
      link: /docs/
    - theme: alt
      text: Download
      link: https://github.com/ptarmiganlabs/butler/releases
    - theme: alt
      text: Discussion Forum
      link: https://github.com/ptarmiganlabs/butler/discussions

features:
  - icon: 📧
    title: Task Failure Notifications
    details: Get notified when tasks fail or are stopped, with notifications sent to Slack, Microsoft Teams, email, InfluxDB, New Relic, and more. Full support for HTML/Markdown formatting.
    link: /docs/concepts/reload-tasks/client-managed/
  - icon: ✅
    title: Task Success Notifications
    details: Know when those important reloads have completed successfully. Nicely formatted emails with all the details you need.
    link: /docs/concepts/successful-reloads
  - icon: 🗂️
    title: Save Logs from Failed Reloads
    details: Butler can save logs from failed reloads, sorted by date. Finding what caused a reload to fail is now easier than ever!
    link: /docs/getting-started/setup/reload-script-logs/
  - icon: ⚙️
    title: Monitor Windows Services
    details: Make sure Qlik Sense services are always running. Start/stop alerts can be sent to multiple destinations with continuous metrics.
    link: /docs/concepts/windows-services
  - icon: 📅
    title: Advanced Scheduler
    details: Trigger reloads in a much more flexible way compared to the QMC scheduler. It's essentially Cron for Qlik Sense.
    link: /docs/concepts/scheduler/
  - icon: 🗃️
    title: Key-Value Store
    details: Send parameters between reload tasks. Stash parameters in the first task and pull them in following tasks. Optional TTL support.
    link: /docs/concepts/key-value
  - icon: 👥
    title: Monitor and Release User Licenses
    details: Monitor license usage in real time by license type and automatically release licenses that are no longer used.
    link: /docs/concepts/qlik-sense-licenses/access-licenses
  - icon: 🪪
    title: Monitor and Alert on Sense Server License
    details: Continuously track the server license and alert before it expires.
    link: /docs/concepts/qlik-sense-licenses/server-license
  - icon: 🖥️
    title: Monitor Sense Server Version
    details: Record Sense server versions over time in InfluxDB to reduce the risk of running outdated, insecure releases.
    link: /docs/concepts/server-version
  - icon: 🔗
    title: Task Chaining with Parameters
    details: Create chained app reloads and pass any number of parameters between apps.
    link: /docs/examples/reload-chaining
  - icon: ▶️
    title: Start Tasks via REST API or MQTT
    details: Start reloads from scripts or upstream systems via REST or MQTT. Include key–value parameters, or target tasks by tag or custom property.
    link: /docs/concepts/start-sense-tasks
  - icon: 🔁
    title: Partial App Reloads
    details: Trigger full or partial app reloads using Butler's REST API when only subsets of data need updating.
    link: /docs/concepts/start-sense-tasks
  - icon: 🧾
    title: App Metadata Extract
    details: Extract metadata for one or all apps in a cluster—useful for backups and operational checks.
    link: /docs/examples/sense-app-introspection
  - icon: 📣
    title: Keep Your Users in the Know
    details: Automatically inform Slack or Teams channels when new data is available.
    link: /docs/concepts/teams-messaging
  - icon: 🌍
    title: Runs Anywhere
    details: Windows, Linux, Docker, Kubernetes, or macOS. Standalone binaries—no installation required.
    link: /docs/getting-started/install/
  - icon: 🔌
    title: Integrations
    details: Send events to New Relic and Signl4. Monitor Butler itself with InfluxDB/Grafana or New Relic. MQTT and webhooks supported.
    link: /docs/examples/monitoring-butler
---
