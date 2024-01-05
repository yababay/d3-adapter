<script lang="ts">
  import type { ChartData } from '$lib/types'
  import { DbFields } from '$lib/types'
  import * as d3 from 'd3'
  import { onMount } from 'svelte'
  import {chartWidth, chartHeight, chartMargin as margin,
    chartColors as colors, strokeWidth} from "../../app.json"
  
  export let measurements: Map<DbFields, ChartData[]>, reverse: boolean = false,
    width = chartWidth, height = chartHeight
   
  onMount(()=>{
      const getMinMax = (data:ChartData[] | undefined)=> {
        if(!data) throw 'no data'
        const max = data.reduce((acc, el)=> Math.max(acc, el.value), Number.MIN_VALUE)
        const min = data.reduce((acc, el)=> Math.min(acc, el.value), Number.MAX_VALUE)
        return {min, max}
      }
      const fields = Array.from(measurements.keys())
      const pressMinMax = (prefix : string) => fields.filter(field => field.startsWith(prefix))
        .map(field => measurements.get(field))
        .map(getMinMax)
      const globalMinMax = (values : {min : number, max : number}[]) => {
        const min = values.reduce((acc, el)=> Math.min(acc, el.min), Number.MAX_VALUE)
        const max = values.reduce((acc, el)=> Math.max(acc, el.max), Number.MIN_VALUE)
        return[min, max]
      }
        
      const pressValues = pressMinMax('druck_')
      const tempValues = pressMinMax('temp_')
      const [pressMin, pressMax] = globalMinMax(pressValues)
      const [tempMin, tempMax] = globalMinMax(tempValues)
      let anyRow = measurements.get(DbFields.PRESS_01)
      if(!anyRow) throw 'not anyrow'
      if(reverse) anyRow.reverse()
      const startDate = anyRow[0].date,
      endDate = anyRow[anyRow.length - 1].date;

      const xScale = d3.scaleTime()
        .domain([new Date (startDate), new Date (endDate)])
        .range([margin.left + 20, width - margin.right - 20])

      const yScalePress = d3.scaleLinear()
        .domain([pressMin - 10, pressMax + 30])
        .range([height - margin.bottom, margin.top])

      const yScaleTemp = d3.scaleLinear()
        .domain([tempMin - 10, tempMax + 30])
        .range([height - margin.bottom, margin.top])

      const linePress = d3.line<ChartData>()
        .x(d => xScale(d.date))
        .y(d => yScalePress(d.value));
      
      const lineTemp = d3.line<ChartData>()
        .x(d => xScale(d.date))
        .y(d => yScaleTemp(d.value));

      const dasende = measurements.get(DbFields.TEMP_04)
        console.log(dasende)

      const getField = (field : DbFields) => {
        const data = measurements.get(field)
        if(!data) throw 'not press01'
        return data 
      }

      const axisPress = d3.axisLeft(yScalePress)
        .tickSizeOuter(0)
      const axisTemp = d3.axisRight(yScaleTemp)
        .tickSizeOuter(0)
      const axisDate = d3.axisBottom<Date>(xScale)  
        .tickFormat(d3.timeFormat("%H:%M:%S"))
        .tickSizeOuter(0)

      const innerWidthPress = innerWidth - 920
      const axisPressGrid = d3.axisLeft(yScalePress)
        .tickFormat(function (d) { return ''; })
        .tickSizeOuter(0)
        .tickSizeInner(-innerWidthPress)

      const innerWidthTemp = innerWidth - 920
      const axisTempGrid = d3.axisRight(yScaleTemp)
        .tickFormat(function (d) { return ''; })
        .tickSizeOuter(0)
        .tickSizeInner(-innerWidthTemp)

      const innerHeightDate = innerHeight - 200
      const axisDateGrid = d3.axisBottom(xScale)
        .tickFormat(function (d) { return ''; })
        .tickSizeOuter(0)
        .tickSizeInner(-innerHeightDate)

      const svg = d3.select("#chart-holder")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

        svg.append("g")
          .attr("transform", `translate(${margin.left}, 0)`)
          .attr("color", colors.gridPress)
          .call(axisPressGrid)

        svg.append("g")
          .attr("transform", `translate(${width - margin.right}, 0)`)
          .attr("color", colors.gridTemp)
          .call(axisTempGrid)

        svg.append("g")
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .attr("color", colors.gridDate)
          .call(axisDateGrid)

        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", colors.press_01)
          .attr("stroke-width", strokeWidth)
          .attr("d", linePress(getField(DbFields.PRESS_01)))

        /*let lastPosition = linePress(getField(DbFields.PRESS_01))?.split("L", ).pop()?.split(",", )
        let xLastPosition = Number(lastPosition?.[0])
        let yLastPosition = Number(lastPosition?.[1])
          
        svg.append("text")
          .attr("stroke", colors.press_01)
          .attr("x", xLastPosition -30)
          .attr("y", yLastPosition)
          .text(function () { return 'P1'; })*/

        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", colors.press_02)
          .attr("stroke-width", strokeWidth)
          .attr("d", linePress(getField(DbFields.PRESS_02)))

        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", colors.press_03)
          .attr("stroke-width", strokeWidth)
          .attr("d", linePress(getField(DbFields.PRESS_03)))

        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", colors.temp_01)
          .attr("stroke-width", strokeWidth)
          .attr("d", lineTemp(getField(DbFields.TEMP_01)))

        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", colors.temp_02)
          .attr("stroke-width", strokeWidth)
          .attr("d", lineTemp(getField(DbFields.TEMP_02)))

        svg.append("path")
          .attr("fill", "none")
          .attr("stroke", colors.temp_03)
          .attr("stroke-width", strokeWidth)
          .attr("d", lineTemp(getField(DbFields.TEMP_03)))
        
        svg.append("g")
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(axisPress)

        svg.append("g")
          .attr("transform", `translate(${width - margin.right}, 0)`)
          .call(axisTemp)

        svg.append("g")
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(axisDate)
          .selectAll("text").attr("transform", "translate(-10,15)rotate(-45)")
  }) 
  //throw 'good'
</script>

<section id="chart-holder"></section>
 