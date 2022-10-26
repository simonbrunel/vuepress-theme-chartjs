<template>
  <div class="chart-editor">
    <chart-view
      ref="chart-view"
      :config="config"
    />
    <chart-actions
      v-if="!chartOnly"
      :actions="actions"
      @action="execute"
    />
    <code-editor
      v-if="!chartOnly"
      :error.sync="error"
      :messages="messages"
      :output="output"
      :value="code"
      @input="evaluate"
    />
  </div>
</template>

<script>
import {Chart} from 'chart.js';

// Components
import ChartActions from '../components/ChartActions.vue';
import ChartView from '../components/ChartView.vue';
import CodeEditor from '../components/CodeEditor.vue';

export default {
  components: {
    ChartActions,
    ChartView,
    CodeEditor,
  },

  props: {
    code: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    actions: null,
    config: null,
    error: null,
    messages: [],
    output: false,
    chartOnly: false
  }),

  watch: {
    code(code) {
      this.evaluate(code);
    },
  },

  mounted() {
    this.evaluate(this.code);
  },

  methods: {
    evaluate(code) {
      this.error = null;

      if (!code) {
        this.update(null);
        return;
      }

      const me = this;
      const logger = {
        log(...args) {
          me.messages = [...me.messages, args.join(' ')].slice(-50);
        },
      };

      const context = {
        ...(this.$chart || {}).imports,
        console: {
          ...console,
          ...logger,
        },
        Chart,
      };

      const keys = Object.keys(context);
      const lines = keys.map((key) => {
        return `const ${key} = arguments[0].${key}`;
      });

      const script = `
        'use strict';
        const module = {exports: {}};
        ${lines.join(';\n')};
        (function(){ ${code} })();
        return module.exports;
      `;

      try {
        // eslint-disable-next-line no-new-func
        const exports = new Function(script)(context);
        const config = exports.config || null;
        this.output = exports.output || false;
        this.chartOnly = exports.chartOnly || false;

        if (!this.actions) {
          this.actions = exports.actions || null;
        }

        this.config = Object.freeze(config);
      } catch (error) {
        this.error = error;
      }
    },
    execute(action) {
      action.handler(this.$refs['chart-view'].chart());
    },
  },
};
</script>

<style lang="stylus" scoped>
.chart-view,
.chart-actions
  margin 16px 0
</style>
