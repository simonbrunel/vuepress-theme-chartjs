<template>
  <div class="tooltip">
    <div class="activator">
      <slot name="default" />
    </div>
    <perfect-scrollbar class="content">
      <slot name="content" />
    </perfect-scrollbar>
  </div>
</template>

<script>
import {PerfectScrollbar} from 'vue2-perfect-scrollbar';

export default {
  components: {
    PerfectScrollbar,
  },
};
</script>


<style lang="stylus" scoped>
@import '../styles/palette.styl'

.tooltip
  position relative

  .content
    background #eee
    color #444
    box-shadow 0 4px 8px 0px rgba(black, 0.15)
    border-radius $borderRadius
    display none
    font-size 0.8rem
    position absolute
    min-width 256px
    max-width 512px
    max-height 256px
    z-index 999
    right 0

  &:hover
    .content
      display block

  ::v-deep
    pre
      background none
      overflow visible
      padding 0 16px
</style>
