---
title: Actions
---

# Chart Editor Actions

Actions allow users to manually trigger custom logic.

## Usage

*Actions* can be defined using: `module.exports.actions: object[]`.

````md
```js
module.exports = {
  actions: [
    {
      name: 'Action Name',        // Text to display on the associated button.
      handler(chart: Chart) {     // Function to call when the button is clicked.
        // ...
      }
    }
  ]
}
```
````

## Demo

```js chart-editor
// <block:init:1>
const DATA_COUNT = 10;

Utils.srand(2);
// </block:init>

const config = /* <block:config:0> */{
  type: 'line',
  data: {
    labels: new Array(DATA_COUNT).fill(0).map((_, i) => i),
    datasets: [
      {
        data: Utils.numbers({
          count: DATA_COUNT,
          max: 50,
          min: 0,
        })
      },
      {
        data: Utils.numbers({
          count: DATA_COUNT,
          max: 25,
          min: 75,
        })
      }
    ]
  },
  options: {
    elements: {
      line: {
        borderColor: (ctx) => Utils.color(ctx.datasetIndex),
      },
      point: {
        backgroundColor: (ctx) => Utils.color(ctx.datasetIndex),
      }
    }
  }
} /* </block:config> */;

const actions = /* <block:actions:2> */[
  {
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(function(value) {
          return Utils.rand(0, 100);
        });
      });

      chart.update();
    }
  },
  {
    name: 'Alert',
    handler: function(chart) {
      alert('Action clicked for chart ' + chart.id);
    }
  }
]/* </block:actions> */;

module.exports = {
  actions,
  config,
}
```