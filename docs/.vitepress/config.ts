import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";


// Generated at build time by scripts/fetch-butler-version.mjs
import { version as butlerVersion } from "./version.js";



// https://vitepress.vuejs.org/config/app-configs
export default withMermaid({
// export default defineConfig({
  title: 'Butler',
  description: 'Butler documentation',
  base: '/',
  lang: "en-US",
  cleanUrls: true,
  sitemap: {
    hostname: "https://butler-sheet-icons.ptarmiganlabs.com",
  },
  ignoreDeadLinks: false, // Set to true to ignore dead links and build anyway. False will fail the build if there are any dead links.
  
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      { property: "og:title", content: "Butler Documentation" },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "Superpowers for Qlik Sense",
      },
    ],
    [
      "script",
      {
        defer: "",
        "data-domain": "butler.ptarmiganlabs.com",
        src: "https://plausible.io/js/script.file-downloads.outbound-links.js",
      },
    ],
    [
      "script",
      {},
      `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
    ],

    // Root-level favicons copied to docs/public
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    // Additional platform icons under /favicons
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon-180x180.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/pwa-192x192.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicons/pwa-512x512.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#aa0000' }]
  ],

  // Enable Vue component processing
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ['vitepress-openapi']
    }
  },

  themeConfig: {
    // https://vitepress.vuejs.org/config/theme-configs
  // Logo served from docs/public
  logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/docs/' },
      { 
        text: butlerVersion,
        items: [
          {
            text: "Downloads",
            link: "https://github.com/ptarmiganlabs/butler/releases",
          },
          {
            text: "Issues",
            link: "https://github.com/ptarmiganlabs/butler/issues",
          },
          {
            text: "Discussions",
            link: "https://github.com/ptarmiganlabs/butler/discussions",
          },
          {
            text: "Ptarmigan Labs main site",
            link: "https://ptarmiganlabs.com",
          },
        ]
      },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'About',
          collapsed: false,
          items: [
            { text: 'Butler', link: '/docs/about/butler' },
            { text: 'Butler Family', link: '/docs/about/butler-family' },
            { text: 'Use Cases', link: '/docs/about/use-cases/' },
            { text: 'Versioning', link: '/docs/about/versioning' },
            { text: 'Contributing', link: '/docs/about/contributing' },
            { text: 'Telemetry', link: '/docs/about/telemetry' },
            { text: 'Security Considerations', link: '/docs/security' }
          ]
        },
        {
          text: 'Getting Started',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/' },
            { text: 'Installation', link: '/docs/getting-started/install/' },
            { 
              text: 'Setup', 
              link: '/docs/getting-started/setup/',
              collapsed: true,
              items: [
                { text: 'Which config file?', link: '/docs/getting-started/setup/which-config-file/' },
                { text: 'Minimal config', link: '/docs/getting-started/setup/minimal-config/' },
                { text: 'REST API', link: '/docs/getting-started/setup/rest-api/' },
                { text: 'Scheduler', link: '/docs/getting-started/setup/scheduler/' },
                { text: 'Key-value store', link: '/docs/getting-started/setup/key-value-store/' },
                { text: 'File system access', link: '/docs/getting-started/setup/file-system-access/' },
                { text: 'MQTT', link: '/docs/getting-started/setup/mqtt/' },
                { 
                  text: 'Task alerts',
                  link: '/docs/getting-started/setup/task-alerts/',
                  collapsed: true,
                  items: [
                    { 
                      text: 'Client-managed', 
                      link: '/docs/getting-started/setup/task-alerts/client-managed/',
                      items: [
                        { text: 'Email alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-emails/' },
                        { text: 'Slack alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-slack/' },
                        { text: 'Teams alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-teams/' },
                        { text: 'MQTT alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-mqtt/' },
                        { text: 'InfluxDB alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-influxdb/' },
                        { text: 'New Relic alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-new-relic/' },
                        { text: 'Webhook alerts', link: '/docs/getting-started/setup/task-alerts/client-managed/alert-webhook-out/' }
                      ]
                    },
                    { 
                      text: 'Cloud', 
                      link: '/docs/getting-started/setup/task-alerts/cloud/',
                      items: [
                        { text: 'Email alerts', link: '/docs/getting-started/setup/task-alerts/cloud/alert-emails/' },
                        { text: 'Slack alerts', link: '/docs/getting-started/setup/task-alerts/cloud/alert-slack/' },
                        { text: 'Teams alerts', link: '/docs/getting-started/setup/task-alerts/cloud/alert-teams/' }
                      ]
                    }
                  ]
                },
                { text: 'Reload script logs', link: '/docs/getting-started/setup/reload-script-logs/' },
                { text: 'Heartbeats', link: '/docs/getting-started/setup/heartbeats/' },
                { text: 'Uptime monitor', link: '/docs/getting-started/setup/uptime-monitor/' },
                { text: 'Docker healthcheck', link: '/docs/getting-started/setup/docker-health-check/' },
                { text: 'Data connections', link: '/docs/getting-started/setup/data-connections/' },
                { 
                  text: 'Qlik Sense licenses',
                  collapsed: true,
                  items: [
                    { text: 'Server licenses', link: '/docs/getting-started/setup/qlik-sense-licenses/server-licenses/' },
                    { text: 'Access licenses', link: '/docs/getting-started/setup/qlik-sense-licenses/access-licenses/' }
                  ]
                },
                { 
                  text: 'Qlik Sense settings',
                  collapsed: true,
                  items: [
                    { text: 'Server settings', link: '/docs/getting-started/setup/qlik-sense-settings/server-settings/' },
                    { text: 'Cloud settings', link: '/docs/getting-started/setup/qlik-sense-settings/cloud-settings/' },
                    { text: 'Server version', link: '/docs/getting-started/setup/qlik-sense-settings/server-version/' }
                  ]
                },
                { 
                  text: 'Incident mgmt tools',
                  link: '/docs/getting-started/setup/incident-mgmt-tools/',
                  collapsed: true,
                  items: [
                    { text: 'New Relic', link: '/docs/getting-started/setup/incident-mgmt-tools/new-relic/' },
                    { text: 'Signl4', link: '/docs/getting-started/setup/incident-mgmt-tools/signl4/' }
                  ]
                },
                { 
                  text: 'Windows service monitor',
                  link: '/docs/getting-started/setup/windows-service-monitor/',
                  collapsed: true,
                  items: [
                    { text: 'Email', link: '/docs/getting-started/setup/windows-service-monitor/email/' },
                    { text: 'Slack', link: '/docs/getting-started/setup/windows-service-monitor/slack/' },
                    { text: 'Teams', link: '/docs/getting-started/setup/windows-service-monitor/teams/' },
                    { text: 'MQTT', link: '/docs/getting-started/setup/windows-service-monitor/mqtt/' },
                    { text: 'InfluxDB', link: '/docs/getting-started/setup/windows-service-monitor/influxdb/' },
                    { text: 'New Relic', link: '/docs/getting-started/setup/windows-service-monitor/new-relic/' },
                    { text: 'Webhook', link: '/docs/getting-started/setup/windows-service-monitor/webhook-out/' }
                  ]
                },
                { text: 'Start task filter', link: '/docs/getting-started/setup/start-task-filter/' },
                { text: 'System information', link: '/docs/getting-started/setup/system-info/' },
                { text: 'Telemetry', link: '/docs/getting-started/setup/telemetry/' },
                { text: 'Visualise config file', link: '/docs/getting-started/setup/visualise-config-file/' }
              ]
            },
            { 
              text: 'Day 2 operations', 
              link: '/docs/getting-started/operations/',
              collapsed: true,
              items: [
                { text: 'Standalone app', link: '/docs/getting-started/operations/standalone' },
                { text: 'Docker', link: '/docs/getting-started/operations/docker' },
                { text: 'Node.js app', link: '/docs/getting-started/operations/nodejs' }
              ]
            },
            { text: 'Upgrade', link: '/docs/getting-started/upgrade' }
          ]
        },
        {
          text: 'Concepts',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/concepts/' },
            {
              text: 'Monitoring & Alerting',
              collapsed: true,
              items: [
                {
                  text: 'Task Monitoring',
                  items: [
                    { text: 'Reloads Tasks', link: '/docs/concepts/reload-tasks/' },
                    { text: 'Client-Managed', link: '/docs/concepts/reload-tasks/client-managed/' },
                    { text: 'Alert Emails', link: '/docs/concepts/reload-tasks/client-managed/alert-emails/' },
                    { text: 'Slack & Teams Alerts', link: '/docs/concepts/reload-tasks/client-managed/alerts-slack-teams/' },
                    { text: 'Successful Reloads', link: '/docs/concepts/successful-reloads' }
                  ]
                },
                {
                  text: 'System Monitoring',
                  items: [
                    { text: 'Windows Services', link: '/docs/concepts/windows-services' },
                    { text: 'Server Version', link: '/docs/concepts/server-version' }
                  ]
                }
              ]
            },
            {
              text: 'Incident Management',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/docs/concepts/incident-management/' },
                {
                  text: 'Platforms',
                  items: [
                    { text: 'New Relic Integration', link: '/docs/concepts/incident-management/new-relic' },
                    { text: 'Signl4 Integration', link: '/docs/concepts/incident-management/signl4' }
                  ]
                }
              ]
            },
            {
              text: 'License Management',
              collapsed: true,
              items: [
                {
                  text: 'Qlik Sense Licenses',
                  items: [
                    { text: 'Server License', link: '/docs/concepts/qlik-sense-licenses/server-license' },
                    { text: 'Access Licenses', link: '/docs/concepts/qlik-sense-licenses/access-licenses' }
                  ]
                }
              ]
            },
            {
              text: 'Communication & Integration',
              collapsed: true,
              items: [
                {
                  text: 'Messaging Platforms',
                  items: [
                    { text: 'Teams Messaging', link: '/docs/concepts/teams-messaging' },
                    { text: 'MQTT Integration', link: '/docs/concepts/mqtt/' }
                  ]
                },
                {
                  text: 'Utilities',
                  items: [
                    { text: 'Custom Links', link: '/docs/concepts/custom-links' },
                    { text: 'UDP Client', link: '/docs/concepts/udp-client' }
                  ]
                }
              ]
            },
            {
              text: 'Task & File Operations',
              collapsed: true,
              items: [
                {
                  text: 'Task Management',
                  items: [
                    { text: 'Scheduler', link: '/docs/concepts/scheduler/' },
                    { text: 'Start Sense Tasks', link: '/docs/concepts/start-sense-tasks' },
                    { text: 'Key-Value Store', link: '/docs/concepts/key-value/' }
                  ]
                },
                {
                  text: 'File Operations',
                  items: [
                    { text: 'File System Access', link: '/docs/concepts/file-system-access' }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'Examples',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/examples/' },
            { text: 'File Operations', link: '/docs/examples/file-operations' },
            { text: 'Messaging from Load Script', link: '/docs/examples/messaging-from-load-script' },
            { text: 'Sense App Introspection', link: '/docs/examples/sense-app-introspection' },
            { text: 'Monitoring Butler', link: '/docs/examples/monitoring-butler' },
            { text: 'Reload Chaining', link: '/docs/examples/reload-chaining' },
            { text: 'Scheduling', link: '/docs/examples/scheduling' },
            { text: 'Troubleshooting', link: '/docs/examples/troubleshooting' },
            { text: 'OpenAPI Docs', link: '/docs/examples/openapi-docs' },
            { text: 'Windows Service', link: '/docs/examples/butler-windows-service' },
            { 
              text: 'Start Sense Tasks',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/docs/examples/start-task/' },
                { text: 'From REST API', link: '/docs/examples/start-task/start-task-from-rest' },
                { text: 'From MQTT', link: '/docs/examples/start-task/start-task-from-mqtt' },
                { text: 'From Load Script', link: '/docs/examples/start-task/start-task-from-script' }
              ]
            },
            { 
              text: 'Sense Demo Apps',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/docs/examples/sense-demo-apps/' },
                { text: 'Butler API Demo', link: '/docs/examples/sense-demo-apps/butler-api-demo' },
                { text: 'Partial App Reloads', link: '/docs/examples/sense-demo-apps/partial-loads' },
                { text: 'Post to Slack', link: '/docs/examples/sense-demo-apps/post-to-slack' },
                { text: 'Publish to MQTT', link: '/docs/examples/sense-demo-apps/publish-to-mqtt' }
              ]
            }
          ]
        },
        {
          text: 'Reference',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/reference/' },
            { text: 'Config File', link: '/docs/reference/config-file/' },
            { text: 'Command Line Options', link: '/docs/reference/command-line-options' },
            { 
              text: 'REST API', 
              link: '/docs/reference/rest-api/',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/docs/reference/rest-api/' },
                // { text: 'System & Configuration', link: '/docs/reference/rest-api/system' },
                // { text: 'File Operations', link: '/docs/reference/rest-api/files' },
                // { text: 'Task Management', link: '/docs/reference/rest-api/tasks' },
                // { text: 'Key-Value Store', link: '/docs/reference/rest-api/key-value' },
                // { text: 'Messaging & Notifications', link: '/docs/reference/rest-api/messaging' }
              ]
            },
            { text: 'Sense Helper Subs', link: '/docs/reference/sense-helper-subs' },
            { text: 'InfluxDB Information', link: '/docs/reference/influxdb' },
            { text: 'Key-Value Store', link: '/docs/reference/key-value-store' },
            { text: 'Scheduler', link: '/docs/reference/scheduler' },
            { text: 'Test Cases', link: '/docs/reference/test-cases' },
            {
              text: 'Alert Template Fields',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/docs/reference/alert-template-fields/' },
                {
                  text: 'Client-Managed',
                  items: [
                    { text: 'Overview', link: '/docs/reference/alert-template-fields/client-managed/' },
                    { text: 'Reload Tasks', link: '/docs/reference/alert-template-fields/client-managed/reload-tasks' },
                    { text: 'Windows Services', link: '/docs/reference/alert-template-fields/client-managed/windows-services' }
                  ]
                },
                {
                  text: 'Qlik Sense Cloud',
                  items: [
                    { text: 'Overview', link: '/docs/reference/alert-template-fields/qlik-sense-cloud/' },
                    { text: 'Failed App Reloads', link: '/docs/reference/alert-template-fields/qlik-sense-cloud/app-reload' }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'Legal Stuff',
          collapsed: true,
          items: [
            { text: 'Legal Information', link: '/docs/legal-stuff' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ptarmiganlabs/butler' }
    ],

  footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2018–2025 Ptarmigan Labs AB'
    },

    search: {
      provider: "local",
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },


  }
})
