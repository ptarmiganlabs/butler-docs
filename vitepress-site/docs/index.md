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
  - icon: ✅
    title: Task Success Notifications
    details: Know when those important reloads have completed successfully. Nicely formatted emails with all the details you need.
  - icon: 🗂️
    title: Save Logs from Failed Reloads
    details: Butler can save logs from failed reloads, sorted by date. Finding what caused a reload to fail is now easier than ever!
  - icon: ⚙️
    title: Monitor Windows Services
    details: Make sure Qlik Sense services are always running. Start/stop alerts can be sent to multiple destinations with continuous metrics.
  - icon: 📅
    title: Advanced Scheduler
    details: Trigger reloads in a much more flexible way compared to the QMC scheduler. It's essentially Cron for Qlik Sense.
  - icon: 🗃️
    title: Key-Value Store
    details: Send parameters between reload tasks. Stash parameters in the first task and pull them in following tasks. Optional TTL support.
  - icon: 👥
    title: Monitor and Release User Licenses
    details: Monitor license usage in real time by license type and automatically release licenses that are no longer used.
  - icon: 🪪
    title: Monitor and Alert on Sense Server License
    details: Continuously track the server license and alert before it expires. Store metrics in InfluxDB or send to your alerting tool of choice.
  - icon: 🖥️
    title: Monitor Sense Server Version
    details: Record Sense server versions over time in InfluxDB to reduce the risk of running outdated, insecure releases.
  - icon: 🔗
    title: Task Chaining with Parameters
    details: Create chained app reloads and pass any number of parameters between apps.
  - icon: ▶️
    title: Start Tasks via REST API or MQTT
    details: Start reloads from scripts or upstream systems via REST or MQTT. Include key–value parameters, or target tasks by tag or custom property.
  - icon: 🔁
    title: Partial App Reloads
    details: Trigger full or partial app reloads using Butler’s REST API when only subsets of data need updating.
  - icon: 🧾
    title: App Metadata Extract
    details: Extract metadata for one or all apps in a cluster—useful for backups and operational checks.
  - icon: 📣
    title: Keep Your Users in the Know
    details: Automatically inform Slack or Teams channels when new data is available.
  - icon: 🌍
    title: Runs Anywhere
    details: Windows, Linux, Docker, Kubernetes, or macOS. Standalone binaries—no installation required.
  - icon: 🔌
    title: Integrations
    details: Send events to New Relic and Signl4. Monitor Butler itself with InfluxDB/Grafana or New Relic. MQTT and webhooks supported.
---
