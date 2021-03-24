---
title: Output
---

# Chart Editor Output

Output can be enabled to show `console.log()` calls in a separate tab.

## Usage

The *output* can be enabled using: `module.exports.output: true | string`. If `output` is a
`string`, the text will be used as placeholder as long as there is no log. If `true`, a
default placeholder is used (i.e. `...`).

````md
```js
module.exports = {
  output: true,
}

// or

module.exports = {
  output: 'Text to display when there is no output',
}
```
````

## Demo

```js chart-editor
const DATA_COUNT = 24;

Utils.srand(4);

const config = {
  type: 'line',
  data: {
    labels: new Array(DATA_COUNT).fill(0).map((_, i) => i),
    datasets: [
      {
        data: Utils.numbers({
          count: DATA_COUNT,
          max: 10,
          min: 0,
        })
      },
      {
        data: Utils.numbers({
          count: DATA_COUNT,
          max: 30,
          min: 20,
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
        radius: (ctx) => (ctx.dataIndex / DATA_COUNT) * 6,
      }
    },
    onClick: (event) => {
      console.log('Click at x: ' + event.x + ', y: ' + event.y)
    }
  }
};

module.exports = {
  output: 'Click on chart elements...',
  config,
}
```