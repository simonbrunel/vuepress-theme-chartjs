import {Chart, defaults, registerables} from 'chart.js';

Chart.register(...registerables);

defaults.set('plugins', {
  legend: {
    display: false,
  },
  title: {
    display: false,
  },
  tooltip: {
    enabled: false,
  },
});
