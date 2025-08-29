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
    reactivityTransform: true
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
          collapsed: true,
          items: [
            { text: 'Butler', link: '/docs/about/butler' },
            { text: 'Butler Family', link: '/docs/about/butler-family' },
            { text: 'Use Cases', link: '/docs/about/use-cases/' },
            { text: 'Versioning', link: '/docs/about/versioning' },
            { text: 'Contributing', link: '/docs/about/contributing' },
            { text: 'Telemetry', link: '/docs/about/telemetry' }
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
          collapsed: false,
          items: [
            { text: 'Overview', link: '/docs/concepts/' },
            { text: 'Key-Value Store', link: '/docs/concepts/key-value/' },
            { text: 'File System Access', link: '/docs/concepts/file-system-access/' },
            { text: 'Reload Alerts', link: '/docs/concepts/failed-reloads/' },
            { text: 'Scheduler', link: '/docs/concepts/scheduler/' },
            { text: 'MQTT Integration', link: '/docs/concepts/mqtt/' }
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
          collapsed: true,
          items: [
            { text: 'Overview', link: '/docs/reference/' },
            { text: 'Config File', link: '/docs/reference/config-file/' },
            { text: 'REST API', link: '/docs/reference/rest-api/' }
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
