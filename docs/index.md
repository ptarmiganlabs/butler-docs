---
layout: home

hero:
  name: "Butler"
  text: "Adding superpowers to Qlik Sense"
  tagline: "Great looking alerts, advanced scheduling, task chaining, key-value store, Sense license monitoring, MQTT integration and more. Open source and ready to use."
  actions:
    - theme: brand
      text: Documentation
      link: /latest/
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
    link: /latest/concepts/reload-tasks/client-managed/
  - icon: ✅
    title: Task Success Notifications
    details: Know when those important reloads have completed successfully. Nicely formatted emails with all the details you need.
    link: /latest/concepts/successful-reloads
  - icon: 🗂️
    title: Save Logs from Failed Reloads
    details: Butler can save logs from failed reloads, sorted by date. Finding what caused a reload to fail is now easier than ever!
    link: /latest/getting-started/setup/reload-script-logs/
  - icon: ⚙️
    title: Monitor Windows Services
    details: Make sure Qlik Sense services are always running. Start/stop alerts can be sent to multiple destinations with continuous metrics.
    link: /latest/concepts/windows-services
  - icon: 📅
    title: Advanced Scheduler
    details: Trigger reloads in a much more flexible way compared to the QMC scheduler. It's essentially Cron for Qlik Sense.
    link: /latest/concepts/scheduler/
  - icon: 🗃️
    title: Key-Value Store
    details: Send parameters between reload tasks. Stash parameters in the first task and pull them in following tasks. Optional TTL support.
    link: /latest/concepts/key-value
  - icon: 👥
    title: Monitor and Release User Licenses
    details: Monitor license usage in real time by license type and automatically release licenses that are no longer used.
    link: /latest/concepts/qlik-sense-licenses/access-licenses
  - icon: 🪪
    title: Monitor and Alert on Sense Server License
    details: Continuously track the server license and alert before it expires.
    link: /latest/concepts/qlik-sense-licenses/server-license
  - icon: 🖥️
    title: Monitor Sense Server Version
    details: Record Sense server versions over time in InfluxDB to reduce the risk of running outdated, insecure releases.
    link: /latest/concepts/server-version
  - icon: 🔗
    title: Task Chaining with Parameters
    details: Create chained app reloads and pass any number of parameters between apps.
    link: /latest/examples/reload-chaining
  - icon: ▶️
    title: Start Tasks via REST API or MQTT
    details: Start reloads from scripts or upstream systems via REST or MQTT. Include key–value parameters, or target tasks by tag or custom property.
    link: /latest/concepts/start-sense-tasks
  - icon: 🔁
    title: Partial App Reloads
    details: Trigger full or partial app reloads using Butler's REST API when only subsets of data need updating.
    link: /latest/concepts/start-sense-tasks
  - icon: 🧾
    title: App Metadata Extract
    details: Extract metadata for one or all apps in a cluster—useful for backups and operational checks.
    link: /latest/examples/sense-app-introspection
  - icon: 📣
    title: Keep Your Users in the Know
    details: Automatically inform Slack or Teams channels when new data is available.
    link: /latest/concepts/teams-messaging
  - icon: 🌍
    title: Runs Anywhere
    details: Windows, Linux, Docker, Kubernetes, or macOS. Standalone binaries—no installation required.
    link: /latest/getting-started/install/
  - icon: 🔌
    title: Integrations
    details: Send events to New Relic and Signl4. Monitor Butler itself with InfluxDB/Grafana or New Relic. MQTT and webhooks supported.
    link: /latest/examples/monitoring-butler
---
