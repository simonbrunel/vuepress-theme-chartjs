<template>
  <perfect-scrollbar
    class="editor-textarea"
    :options="scrollbars"
  >
    <div class="editor-textarea-content">
      <prism-editor
        :highlight="highlight"
        :value="value"
        @input="$emit('input', $event)"
      />
    </div>
  </perfect-scrollbar>
</template>

<script>
// prismjs comes with the 'vuepress' dependency.
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown/package.json#L31
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// Components
import {PerfectScrollbar} from 'vue2-perfect-scrollbar';
import {PrismEditor} from 'vue-prism-editor';

// Style
import 'vue-prism-editor/dist/prismeditor.min.css';

export default {
  components: {
    PerfectScrollbar,
    PrismEditor,
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    scrollbars: {
      wheelPropagation: false,
    },
  }),

  methods: {
    highlight(code) {
      return highlight(code, languages.js);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../styles/palette.styl'

.editor-textarea
  color $codeTextColor
  font-family $codeFontFamily
  font-size $codeFontSize
  line-height $codeLineHeight
  height inherit

  // Move the "js" indicator a bit further from the top/right sides
  // so we can display the vertical scrollbar without overlap it.
  &:before
    margin-right 8px
    margin-top 4px

  .prism-editor-wrapper
    overflow visible

.editor-textarea-content
  padding 16px 24px
</style>
