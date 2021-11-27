# Classes for simplifying d3-charts creations

It is just as simple as

```
import D3LinearChart from 'd3-adapter'

const figure = document.querySelector("figure")
const linearChart = new D3LinearChart(figure)
linearChart.bottom = 30
linearChart.caption = 'There is a <b>nice</b> chart!'
linearChart.inject([1, 3, 2, 5, 6, 4, 7, 8, 9])
```

That's all, folks!

