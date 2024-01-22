import * as d3 from 'd3'
import D3Canvas from './D3Canvas.js'
import type { ChartOptions, TimestampedMeasurements } from './types.js'

export default abstract class D3AxisX extends D3Canvas {

    #lineX: d3.Selection<d3.BaseType, unknown, SVGGElement, unknown> | undefined
    
    get x() {
        const {width} = this
        const rangeX = d3.scaleTime().range([0, width])
        const min = this.timestamps[0]
        const max = this.timestamps.slice(-1)[0]
        return rangeX.domain([min, max])
    }
    
    drawAxisX(){
        const {height} = this
        const axisX = d3.axisBottom
        const {x, graphics} = this
        if(this.#lineX) this.#lineX.remove()
        this.#lineX = graphics.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(axisX<Date>(x).tickFormat(d3.timeFormat("%H:%M:%S")))
            .selectAll("text").attr("transform", "translate(-10,15)rotate(-45)")
    }

    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
        this.drawAxisX()
    }
}
