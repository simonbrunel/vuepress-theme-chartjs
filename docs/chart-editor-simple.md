---
title: Editor
---

# Chart Editor

Simple chart editor that displays the entire JavaScript code.

## Usage

````md
```js chart-editor
  [ code ]
```
````

## Demo

```js chart-editor
const DATA_COUNT = 8;

Utils.srand(4);

const config = {
  type: 'bar',
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
      bar: {
        backgroundColor: (ctx) => Utils.color(ctx.datasetIndex),
      }
    }
  }
};

module.exports = {
  config,
}
```