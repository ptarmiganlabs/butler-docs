import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Butler',
  description: 'Butler documentation',
  base: '/',
  
  head: [
    ['script', { 
      defer: '', 
      'data-domain': 'butler.ptarmiganlabs.com', 
      src: 'https://plausible.io/js/script.js' 
    }],
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
        text: 'v13.1.2',
        items: [
          {
            text: 'Releases',
            link: 'https://github.com/ptarmiganlabs/butler/releases'
          },
          {
            text: 'Issues',
            link: 'https://github.com/ptarmiganlabs/butler/issues'
          },
          {
            text: 'Discussions',
            link: 'https://github.com/ptarmiganlabs/butler/discussions'
          }
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
          collapsed: false,
          items: [
            { text: 'Overview', link: '/docs/' },
            { text: 'Installation', link: '/docs/getting-started/install/' },
            { text: 'Setup', link: '/docs/getting-started/setup/' },
            { text: 'Day 2 operations', link: '/docs/getting-started/day2-operations' },
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
              items: [
                {
                  text: 'Reload Monitoring',
                  items: [
                    { text: 'Failed Reloads', link: '/docs/concepts/failed-reloads/' },
                    { text: 'Client-Managed', link: '/docs/concepts/failed-reloads/client-managed/' },
                    { text: 'Alert Emails', link: '/docs/concepts/failed-reloads/client-managed/alert-emails/' },
                    { text: 'Slack & Teams Alerts', link: '/docs/concepts/failed-reloads/client-managed/alerts-slack-teams/' },
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
            },
            {
              text: 'Legacy Features',
              items: [
                { text: 'Real-time Metrics (Deprecated)', link: '/docs/concepts/real-time-metrics-deprecated' }
              ]
            }
          ]
        },
        {
          text: 'Examples',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/examples/' }
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/docs/reference/' },
            { text: 'Config File', link: '/docs/reference/config-file/' },
            { text: 'Command Line Options', link: '/docs/reference/command-line-options' },
            { 
              text: 'REST API', 
              link: '/docs/reference/rest-api/',
              items: [
                { text: 'Overview', link: '/docs/reference/rest-api/' },
                { text: 'System & Configuration', link: '/docs/reference/rest-api/system' },
                { text: 'File Operations', link: '/docs/reference/rest-api/files' },
                { text: 'Task Management', link: '/docs/reference/rest-api/tasks' },
                { text: 'Key-Value Store', link: '/docs/reference/rest-api/key-value' },
                { text: 'Messaging & Notifications', link: '/docs/reference/rest-api/messaging' }
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

  }
})
