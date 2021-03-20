<template>
  <perfect-scrollbar
    class="editor-output"
    :options="scrollbars"
  >
    <div class="editor-output-content">
      <span
        v-for="(item, index) in items"
        :key="index"
        v-text="item"
      />
      <span
        v-if="!items.length && placeholder"
        class="text-muted"
        v-text="placeholder === true ? '...' : placeholder"
      />
    </div>
  </perfect-scrollbar>
</template>

<script>
import {PerfectScrollbar} from 'vue2-perfect-scrollbar';

export default {
  components: {
    PerfectScrollbar,
  },

  props: {
    placeholder: {
      type: [Boolean, String],
      default: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    scrollbars: {
      wheelPropagation: false,
    },
  }),

  computed: {
    items() {
      return [...this.value].reverse();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../styles/palette.styl'

.editor-output
  color $codeTextColor
  font-family $codeFontFamily
  font-size $codeFontSize
  line-height $codeLineHeight
  height inherit

.editor-output-content
  padding 16px 24px

  > span
    white-space pre-wrap
    position relative
    display block
    margin-left 5px
    opacity 0.25

    &:first-child:before
      content '>'
      font-weight bold
      position absolute
      opacity 0.5
      left -15px

    for i in (0..15)
      &:nth-child({i + 1})
        opacity (1 - (i / 20))
</style>
