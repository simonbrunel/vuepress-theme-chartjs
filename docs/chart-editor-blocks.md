---
title: Blocks
---

# Chart Editor Blocks

Blocks provides a way to display specific parts of the code in separate tabs.

## Usage

````md
```js chart-editor
// <block:{name}:{order}>
  [ code ]
// </block:{name}>
```
````

For example:

````md
```js chart-editor
// <block:config:0>
const config = {
  foo: 'bar',
};
// </block:config>

const data = /* <block:data:1> */{
  foo: 'bar',
}/* </block:data> */;
```
````

## Demo

```js chart-editor
// <block:init:2>
const DATA_COUNT = 42;

Utils.srand(8);
// </block:init>

const config = /* <block:config:0> */{
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
          max: 20,
          min: 10,
        })
      }
    ]
  },
  options: {
    aspectRatio: 1.5,
    elements: {
      line: {
        borderColor: (ctx) => Utils.color(ctx.datasetIndex),
        tension: 0.4,
      },
      point: {
        backgroundColor: (ctx) => Utils.color(ctx.datasetIndex),
        radius: (ctx) => (ctx.dataIndex / DATA_COUNT) * 6,
      }
    }
  }
} /* </block:config> */;

module.exports = {
  config,
}
```
