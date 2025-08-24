---
layout: home

hero:
  name: "Butler"
  text: "Adding superpowers to Qlik Sense"
  tagline: "Great looking alerts, advanced scheduling, task chaining, key-value store, MQTT integration and more. Open source and ready to use."
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
---
