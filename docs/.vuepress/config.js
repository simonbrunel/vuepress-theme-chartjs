module.exports = {
  theme: '../',
  dest: 'dist/docs',
  title: 'vuepress-theme-chartjs',
  description: 'VuePress theme for projects in the Chart.js organization',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
  ],
  themeConfig: {
    repo: 'simonbrunel/vuepress-theme-chartjs',
    logo: '/favicon.png',
    lastUpdated: 'Last Updated',
    editLinks: true,
    docsDir: 'docs',
    chart: {
      imports: [
        ['.imports/register.js'],
        ['.imports/utils.js', 'Utils'],
      ],
    },
    sidebar: [
      '',
      'getting-started',
      'configuration',
      {
        title: 'Chart Editor',
        sidebarDepth: 0,
        children: [
          'chart-editor-simple',
          'chart-editor-blocks',
          'chart-editor-output',
          'chart-editor-actions',
        ],
      },
    ],
  },
};
