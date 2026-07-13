import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/linyuhan-baby-guide/',
  lang: 'zh-CN',
  title: '小宇宙成长手册',
  description: '0-5岁循证育儿指南 — 基于AAP/WHO/CDC/NHS科学指南，拒绝智商税，拥抱高质感多巴胺',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.7.0/style.css' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap', rel: 'stylesheet' }],
    ['meta', { property: 'og:title', content: '小宇宙成长手册 — 0-5岁循证育儿指南' }],
    ['meta', { property: 'og:description', content: '基于AAP/WHO/CDC循证指南，拒绝智商税，拥抱高质感多巴胺。欢迎分享给即将迎来新生命的朋友。' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://linyuhancelia.github.io/linyuhan-baby-guide/og-cover.svg' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ],

  themeConfig: {
    siteTitle: '小宇宙成长手册',

    nav: [
      { text: '首页', link: '/' },
      { text: '阅读指南', link: '/guide/' },
      {
        text: '成长时间线',
        items: [
          { text: '🤰 孕期准备', link: '/stages/prenatal' },
          { text: '👶 0-3M 感官校准', link: '/stages/0-3m' },
          { text: '🙌 3-6M 运动萌芽', link: '/stages/3-6m' },
          { text: '🚀 6-12M 移动革命', link: '/stages/6-12m' },
          { text: '🗣️ 1-3Y 语言爆发', link: '/stages/1-3y' },
          { text: '🧩 3-5Y 执行功能', link: '/stages/3-5y' },
        ]
      },
      {
        text: '速查',
        items: [
          { text: '品牌速查', link: '/brands' },
          { text: '价格择时', link: '/pricing' },
        ]
      },
    ],

    sidebar: {
      '/stages/': [
        {
          text: '开始',
          items: [
            { text: '阅读指南', link: '/guide/' },
          ]
        },
        {
          text: '成长时间线',
          items: [
            { text: '🤰 孕期准备', link: '/stages/prenatal' },
            { text: '👶 0-3M 感官校准', link: '/stages/0-3m' },
            { text: '🙌 3-6M 运动萌芽', link: '/stages/3-6m' },
            { text: '🚀 6-12M 移动革命', link: '/stages/6-12m' },
            { text: '🗣️ 1-3Y 语言爆发', link: '/stages/1-3y' },
            { text: '🧩 3-5Y 执行功能', link: '/stages/3-5y' },
          ]
        },
        {
          text: '速查手册',
          items: [
            { text: '品牌速查', link: '/brands' },
            { text: '价格择时', link: '/pricing' },
            { text: 'Notion Schema', link: '/appendix' },
          ]
        },
      ],
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '阅读指南', link: '/guide/' },
          ]
        },
        {
          text: '成长时间线',
          items: [
            { text: '🤰 孕期准备', link: '/stages/prenatal' },
            { text: '👶 0-3M 感官校准', link: '/stages/0-3m' },
            { text: '🙌 3-6M 运动萌芽', link: '/stages/3-6m' },
            { text: '🚀 6-12M 移动革命', link: '/stages/6-12m' },
            { text: '🗣️ 1-3Y 语言爆发', link: '/stages/1-3y' },
            { text: '🧩 3-5Y 执行功能', link: '/stages/3-5y' },
          ]
        },
      ],
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一阶段',
      next: '下一阶段',
    },

    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除搜索',
            footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' },
          },
        },
      },
    },

    socialLinks: [],
  },

  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.text || function(tokens, idx) {
        return tokens[idx].content
      }
      md.renderer.rules.text = (tokens, idx, options, env, self) => {
        const content = tokens[idx].content
        if (content.includes('Essential') || content.includes('Conditional') || content.includes('Cognitive-Tax')) {
          return content
            .replaceAll('Cognitive-Tax', '<span class="verdict verdict-tax">Cognitive-Tax</span>')
            .replaceAll('Essential', '<span class="verdict verdict-essential">Essential</span>')
            .replaceAll('Conditional', '<span class="verdict verdict-conditional">Conditional</span>')
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  },
})
