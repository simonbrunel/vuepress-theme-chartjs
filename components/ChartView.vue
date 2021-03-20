<template>
  <div class="chart-view">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import {Chart} from 'chart.js';

export default {
  props: {
    // IMPORTANT: Chart.js 2.9.4 doesn't support reactive config, so the passed object
    // must be frozen first using Object.freeze(), so Vue will not make it observable.
    // https://stackoverflow.com/a/66058308/8837887
    config: {
      type: Object,
      default: null,
    },
  },

  watch: {
    config: 'update',
  },

  mounted() {
    this.update();
  },

  methods: {
    chart() {
      return this._chart;
    },
    update() {
      const config = this.config;
      const canvas = this.$refs.canvas;
      if (!canvas || !this.config) {
        return;
      }

      if (!this._chart) {
        // Chart.js doesn't support frozen config, thus the {...config}.
        this._chart = new Chart(canvas, {...config});
        this.$emit('initialized');
      } else {
        this._chart.stop();
        this._chart.data = config.data || {};
        this._chart.options = config.options || {};
        this._chart.update();
      }
    },
  },
};
</script>
