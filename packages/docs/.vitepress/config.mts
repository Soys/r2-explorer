import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://r2-docs.101011.best'
  },
  title: 'R2 Explorer',
  description: '为你的Cloudflare R2存储桶打造的Google Drive风格管理界面',
  head: [['link', { rel: 'icon', href: '/assets/logo.svg' }]],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/logo.svg', // Assuming assets will be in public/assets
    outline: [2, 3],
        nav: [
      { text: '首页', link: '/' },
      { text: '开始使用', link: '/getting-started/creating-a-new-project' },
      { text: '指南', items: [
        { text: '邮件浏览器', link: '/guides/setup-email-explorer/' },
        { text: '分享链接', link: '/guides/sharable-links' },
      ]},
      { text: '在线演示', link: 'https://demo.r2explorer.com/' },
    ],
    sidebar:  [
        {
          text: '开始使用',
          items: [
            { text: '创建新项目', link: '/getting-started/creating-a-new-project' },
            { text: '添加 R2存储桶', link: '/getting-started/add-r2-buckets' },
            { text: '配置', link: '/getting-started/configuration' },
            { text: '安全', link: '/getting-started/security' },
            { text: '部署', link: '/getting-started/deploying' },
            { text: '更新你的项目', link: '/getting-started/updating-your-project' }
          ]
        },
        {
          text: '指南',
          items: [
            { text: '配置邮件浏览器', link: '/guides/setup-email-explorer' },
            { text: '分享链接', link: '/guides/sharable-links' },
          ]
        }
      ],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/G4brym/R2-Explorer'},
      {icon: 'x', link: 'https://x.com/G4brym'}
    ],
    footer: {
      message: '遵循 MIT 许可证条款发布。',
      copyright: 'Copyright © 2023-present Gabriel Massadas'
    },
    editLink: {
      pattern: 'https://github.com/G4brym/R2-Explorer/edit/main/packages/docs/:path',
      text: '在Github上编辑该页'
    }
  }
})
