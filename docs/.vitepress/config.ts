import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// Generated at build time by scripts/fetch-butler-version.mjs
import { version as butlerVersion } from "./version.js";

function createSidebar(p: string, version: 'v16.0' | 'v17.0' | 'latest') {
  return [
    {
      text: 'About',
      collapsed: false,
      items: [
        { text: 'Butler', link: `${p}/about/butler` },
        { text: 'Butler Family', link: `${p}/about/butler-family` },
        { text: 'Use Cases', link: `${p}/about/use-cases/` },
        { text: 'Versioning', link: `${p}/about/versioning` },
        { text: 'Contributing', link: `${p}/about/contributing` },
        { text: 'Telemetry', link: `${p}/about/telemetry` },
        { text: 'Security Considerations', link: `${p}/security` }
      ]
    },
    {
      text: 'Getting Started',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${p}/` },
        { text: 'Installation', link: `${p}/getting-started/install/` },
        {
          text: 'Setup',
          link: `${p}/getting-started/setup/`,
          collapsed: true,
          items: [
            { text: 'Which config file?', link: `${p}/getting-started/setup/which-config-file/` },
            { text: 'Minimal config', link: `${p}/getting-started/setup/minimal-config/` },
            {
              text: 'REST API',
              link: `${p}/getting-started/setup/rest-api/`,
              collapsed: true,
              items: [
                { text: 'HTTPS/TLS', link: `${p}/getting-started/setup/rest-api/https-tls` }
              ]
            },
            { text: 'Scheduler', link: `${p}/getting-started/setup/scheduler/` },
            { text: 'Key-value store', link: `${p}/getting-started/setup/key-value-store/` },
            { text: 'File system access', link: `${p}/getting-started/setup/file-system-access/` },
            { text: 'MQTT', link: `${p}/getting-started/setup/mqtt/` },
            {
              text: 'Task alerts',
              link: `${p}/getting-started/setup/task-alerts/`,
              collapsed: true,
              items: [
                {
                  text: 'Client-managed',
                  link: `${p}/getting-started/setup/task-alerts/client-managed/`,
                  items: [
                    { text: 'Email alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-emails/` },
                    { text: 'Slack alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-slack/` },
                    { text: 'Teams alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-teams/` },
                    { text: 'MQTT alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-mqtt/` },
                    { text: 'InfluxDB alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-influxdb/` },
                    { text: 'New Relic alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-new-relic/` },
                    { text: 'Webhook alerts', link: `${p}/getting-started/setup/task-alerts/client-managed/alert-webhook-out/` }
                  ]
                },
                {
                  text: 'Cloud',
                  link: `${p}/getting-started/setup/task-alerts/cloud/`,
                  items: [
                    { text: 'Email alerts', link: `${p}/getting-started/setup/task-alerts/cloud/alert-emails/` },
                    { text: 'Slack alerts', link: `${p}/getting-started/setup/task-alerts/cloud/alert-slack/` },
                    { text: 'Teams alerts', link: `${p}/getting-started/setup/task-alerts/cloud/alert-teams/` }
                  ]
                }
              ]
            },
            { text: 'Reload script logs', link: `${p}/getting-started/setup/reload-script-logs/` },
            { text: 'Heartbeats', link: `${p}/getting-started/setup/heartbeats/` },
            { text: 'Uptime monitor', link: `${p}/getting-started/setup/uptime-monitor/` },
            { text: 'Docker healthcheck', link: `${p}/getting-started/setup/docker-health-check/` },
            { text: 'Data connections', link: `${p}/getting-started/setup/data-connections/` },
            {
              text: 'Qlik Sense licenses',
              collapsed: true,
              items: [
                { text: 'Server licenses', link: `${p}/getting-started/setup/qlik-sense-licenses/server-licenses/` },
                { text: 'Access licenses', link: `${p}/getting-started/setup/qlik-sense-licenses/access-licenses/` }
              ]
            },
            {
              text: 'Qlik Sense settings',
              collapsed: true,
              items: [
                { text: 'Server settings', link: `${p}/getting-started/setup/qlik-sense-settings/server-settings/` },
                { text: 'Cloud settings', link: `${p}/getting-started/setup/qlik-sense-settings/cloud-settings/` },
                { text: 'Server version', link: `${p}/getting-started/setup/qlik-sense-settings/server-version/` }
              ]
            },
            {
              text: 'Incident mgmt tools',
              link: `${p}/getting-started/setup/incident-mgmt-tools/`,
              collapsed: true,
              items: [
                { text: 'New Relic', link: `${p}/getting-started/setup/incident-mgmt-tools/new-relic/` },
                { text: 'Signl4', link: `${p}/getting-started/setup/incident-mgmt-tools/signl4/` }
              ]
            },
            {
              text: 'Windows service monitor',
              link: `${p}/getting-started/setup/windows-service-monitor/`,
              collapsed: true,
              items: [
                { text: 'Email', link: `${p}/getting-started/setup/windows-service-monitor/email/` },
                { text: 'Slack', link: `${p}/getting-started/setup/windows-service-monitor/slack/` },
                { text: 'Teams', link: `${p}/getting-started/setup/windows-service-monitor/teams/` },
                { text: 'MQTT', link: `${p}/getting-started/setup/windows-service-monitor/mqtt/` },
                { text: 'InfluxDB', link: `${p}/getting-started/setup/windows-service-monitor/influxdb/` },
                { text: 'New Relic', link: `${p}/getting-started/setup/windows-service-monitor/new-relic/` },
                { text: 'Webhook', link: `${p}/getting-started/setup/windows-service-monitor/webhook-out/` }
              ]
            },
            { text: 'Start task filter', link: `${p}/getting-started/setup/start-task-filter/` },
            { text: 'System information', link: `${p}/getting-started/setup/system-info/` },
            { text: 'Telemetry', link: `${p}/getting-started/setup/telemetry/` },
            { text: 'Visualise config file', link: `${p}/getting-started/setup/visualise-config-file/` }
          ]
        },
        {
          text: 'Day 2 operations',
          link: `${p}/getting-started/operations/`,
          collapsed: true,
          items: [
            { text: 'Standalone app', link: `${p}/getting-started/operations/standalone` },
            { text: 'Docker', link: `${p}/getting-started/operations/docker` },
            { text: 'Node.js app', link: `${p}/getting-started/operations/nodejs` }
          ]
        },
        { text: 'Upgrade', link: `${p}/getting-started/upgrade` }
      ]
    },
    {
      text: 'Concepts',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${p}/concepts/` },
        {
          text: 'Monitoring & Alerting',
          collapsed: true,
          items: [
            {
              text: 'Task Monitoring',
              items: [
                { text: 'Reloads Tasks', link: `${p}/concepts/reload-tasks/` },
                { text: 'Client-Managed', link: `${p}/concepts/reload-tasks/client-managed/` },
                { text: 'Alert Emails', link: `${p}/concepts/reload-tasks/client-managed/alert-emails/` },
                { text: 'Slack & Teams Alerts', link: `${p}/concepts/reload-tasks/client-managed/alerts-slack-teams/` },
                { text: 'Successful Reloads', link: `${p}/concepts/successful-reloads` }
              ]
            },
            {
              text: 'System Monitoring',
              items: [
                { text: 'Windows Services', link: `${p}/concepts/windows-services` },
                { text: 'Server Version', link: `${p}/concepts/server-version` },
                { text: 'UDP Queue', link: `${p}/concepts/udp-queue` },
                version !== 'v16.0' && {
                  text: 'UDP Deduplication',
                  link: `${p}/concepts/udp-deduplication`,
                },
              ].filter(Boolean) as { text: string; link: string }[]
            }
          ]
        },
        {
          text: 'Incident Management',
          collapsed: true,
          items: [
            { text: 'Overview', link: `${p}/concepts/incident-management/` },
            {
              text: 'Platforms',
              items: [
                { text: 'New Relic Integration', link: `${p}/concepts/incident-management/new-relic` },
                { text: 'Signl4 Integration', link: `${p}/concepts/incident-management/signl4` }
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
                { text: 'Server License', link: `${p}/concepts/qlik-sense-licenses/server-license` },
                { text: 'Access Licenses', link: `${p}/concepts/qlik-sense-licenses/access-licenses` }
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
                { text: 'Teams Messaging', link: `${p}/concepts/teams-messaging` },
                { text: 'MQTT Integration', link: `${p}/concepts/mqtt/` }
              ]
            },
            {
              text: 'Utilities',
              items: [
                { text: 'Custom Links', link: `${p}/concepts/custom-links` },
                { text: 'UDP Client', link: `${p}/concepts/udp-client` }
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
                { text: 'Scheduler', link: `${p}/concepts/scheduler/` },
                { text: 'Start Sense Tasks', link: `${p}/concepts/start-sense-tasks` },
                { text: 'Key-Value Store', link: `${p}/concepts/key-value` }
              ]
            },
            {
              text: 'File Operations',
              items: [
                { text: 'File System Access', link: `${p}/concepts/file-system-access` }
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
        { text: 'Overview', link: `${p}/examples/` },
        { text: 'File Operations', link: `${p}/examples/file-operations` },
        { text: 'Messaging from Load Script', link: `${p}/examples/messaging-from-load-script` },
        { text: 'Sense App Introspection', link: `${p}/examples/sense-app-introspection` },
        { text: 'Monitoring Butler', link: `${p}/examples/monitoring-butler` },
        { text: 'Reload Chaining', link: `${p}/examples/reload-chaining` },
        { text: 'Scheduling', link: `${p}/examples/scheduling` },
        { text: 'Troubleshooting', link: `${p}/examples/troubleshooting` },
        { text: 'OpenAPI Docs', link: `${p}/examples/openapi-docs` },
        { text: 'Windows Service', link: `${p}/examples/butler-windows-service` },
    {
      text: 'Monitoring & Alerting',
      collapsed: true,
      items: [
        { text: 'Failed Reloads', link: `${p}/concepts/reload-tasks/` },
        { text: 'Successful Reloads', link: `${p}/concepts/successful-reloads` },
        { text: 'Windows Services', link: `${p}/concepts/windows-services` },
        { text: 'Server Version', link: `${p}/concepts/server-version` },
        version !== 'v16.0' && {
          text: 'QRS API Error Messages',
          link: `${p}/concepts/qrs-error-messages`,
        },
      ].filter(Boolean) as { text: string; link: string }[]
    },
        {
          text: 'Sense Demo Apps',
          collapsed: true,
          items: [
            { text: 'Overview', link: `${p}/examples/sense-demo-apps/` },
            { text: 'Butler API Demo', link: `${p}/examples/sense-demo-apps/butler-api-demo` },
            { text: 'Partial App Reloads', link: `${p}/examples/sense-demo-apps/partial-loads` },
            { text: 'Post to Slack', link: `${p}/examples/sense-demo-apps/post-to-slack` },
            { text: 'Publish to MQTT', link: `${p}/examples/sense-demo-apps/publish-to-mqtt` }
          ]
        }
      ]
    },
    {
      text: 'Reference',
      collapsed: true,
      items: [
        { text: 'Overview', link: `${p}/reference/` },
        { text: 'Config File', link: `${p}/reference/config-file` },
        { text: 'Command Line Options', link: `${p}/reference/command-line-options` },
        {
          text: 'REST API',
          link: `${p}/reference/rest-api`,
          collapsed: true,
          items: [
            { text: 'Overview', link: `${p}/reference/rest-api` }
          ]
        },
        { text: 'Sense Helper Subs', link: `${p}/reference/sense-helper-subs` },
        { text: 'InfluxDB Information', link: `${p}/reference/influxdb` },
        { text: 'UDP Payload Format', link: `${p}/reference/udp-payload-format` },
        { text: 'Key-Value Store', link: `${p}/reference/key-value-store` },
        { text: 'Scheduler', link: `${p}/reference/scheduler` },
        { text: 'Test Cases', link: `${p}/reference/test-cases` },
        {
          text: 'Alert Template Fields',
          collapsed: true,
          items: [
            { text: 'Overview', link: `${p}/reference/alert-template-fields/` },
            {
              text: 'Client-Managed',
              items: [
                { text: 'Overview', link: `${p}/reference/alert-template-fields/client-managed/` },
                { text: 'Reload Tasks', link: `${p}/reference/alert-template-fields/client-managed/reload-tasks` },
                { text: 'Distribute Tasks', link: `${p}/reference/alert-template-fields/client-managed/distribute-tasks` },
                { text: 'Preload Tasks', link: `${p}/reference/alert-template-fields/client-managed/preload-tasks` },
                { text: 'Windows Services', link: `${p}/reference/alert-template-fields/client-managed/windows-services` }
              ]
            },
            {
              text: 'Qlik Sense Cloud',
              items: [
                { text: 'Overview', link: `${p}/reference/alert-template-fields/qlik-sense-cloud/` },
                { text: 'Failed App Reloads', link: `${p}/reference/alert-template-fields/qlik-sense-cloud/app-reload` }
              ]
            }
          ]
        },
        { text: 'Task Type Constants', link: `${p}/reference/task-type-constants` }
      ]
    },
    {
      text: 'Legal Stuff',
      collapsed: true,
      items: [
        { text: 'Legal Information', link: `${p}/legal-stuff` }
      ]
    }
  ];
}


// https://vitepress.vuejs.org/config/app-configs
export default withMermaid({
  title: 'Butler',
  description: 'Butler documentation',
  base: '/',
  lang: "en-US",
  cleanUrls: true,
  sitemap: {
    hostname: "https://butler.ptarmiganlabs.com",
  },
  ignoreDeadLinks: false, // Set to true to ignore dead links and build anyway. False will fail the build if there are any dead links.

  // Transform page data to handle trailing slash redirects
  transformPageData(pageData, context) {
    // Ensure consistent URL patterns for SEO
    const canonicalUrl = `https://butler.ptarmiganlabs.com/${pageData.relativePath
      .replace(/\/index\.md$/, '/')
      .replace(/\.md$/, '')}`

    pageData.frontmatter = pageData.frontmatter || {}
    pageData.frontmatter.head = pageData.frontmatter.head || []

    // Add canonical URL to prevent duplicate content issues
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  },

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
      { text: 'Guide', link: '/latest/about/butler' },
      {
        text: 'Version',
        items: [
          { text: 'latest', link: '/latest/' },
          { text: 'v17.0', link: '/v17.0/' },
          { text: 'v16.0', link: '/v16.0/' },
        ]
      },
      {
        text: 'Resources',
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
      '/v16.0/': createSidebar('/v16.0', 'v16.0'),
      '/v17.0/': createSidebar('/v17.0', 'v17.0'),
      '/latest/': createSidebar('/latest', 'latest'),
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
