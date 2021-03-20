function render({renderer}) {
  const fence = renderer.rules.fence;
  renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const lang = token.info.trim();

    return (/ chart-editor( |$)/).test(lang) ?
      `<chart-editor :code="\`${token.content}\`"/>` :
      fence(...args);
  };
}

function importsScripts(imports) {
  const names = imports.map(([, name]) => name).filter((name) => !!name);
  const lines = imports.map(([file, name]) => {
    const path = `@source/${file}`;
    return name ?
      `import * as ${name} from '${path}'` :
      `import '${path}'`;
  });

  return `
    import Vue from 'vue';
    ${lines.join(';\n')};

    const imports = {
      ${names.join(',\n')}
    }

    Vue.mixin({
      created() {
        this.$chart = this.$chart || {};
        this.$chart.imports = imports;
      }
    })
  `;
}

module.exports = (config) => {
  const imports = config.chart?.imports || [];

  return {
    extend: '@vuepress/theme-default',
    enhanceAppFiles: [
      {
        content: importsScripts(imports),
        name: 'chart-imports',
      },
    ],
    chainWebpack: (cfg) => {
      cfg.merge({
        externals: {
          moment: 'moment',
        },
      });
    },
    chainMarkdown: (cfg) => {
      cfg
        .plugin('chart-editor')
        .use(render)
        .end();
    },
  };
};
