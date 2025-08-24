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
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // Enable Vue component processing
  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    // https://vitepress.vuejs.org/config/theme-configs
    nav: [
      { text: 'Documentation', link: '/docs/' },
      { text: 'GitHub', link: 'https://github.com/ptarmiganlabs/butler' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/docs/' },
            { text: 'Installation', link: '/docs/getting-started/install/' },
            { text: 'Setup', link: '/docs/getting-started/setup/' },
            { text: 'Upgrade', link: '/docs/getting-started/upgrade' }
          ]
        },
        {
          text: 'Concepts',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/docs/concepts/' },
            { text: 'Key-Value Store', link: '/docs/concepts/key-value/' },
            { text: 'File System Access', link: '/docs/concepts/file-system-access/' }
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

    search: {
      provider: 'local'
    }
  }
})
