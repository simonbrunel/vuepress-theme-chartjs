# Configuration

This theme is based on the VuePress default theme and support the [same configuration](https://vuepress.vuejs.org/theme/default-theme-config.html).

Additionally, the following options are available:

```js
// docs/.vuepress/config.js

module.exports = {
  themeConfig: {
    // Chart views options.
    chart: {
      // Files to import (and optionally expose) when evaluating code in a
      // ```chart-editor fenced code block. The first value is the path to
      // the file to import, relative to the docs folder. The second value
      // allows to expose the file exports as a global variable with the
      // given name. If omitted, the import is used for side-effects.
      imports: [
        ['foo.js'],           // Side-effect (e.g. register plugins).
        ['bar.js', 'Bar'],    // Bar will contains the bar.js exports.
      ]
    },
  }
}

```
