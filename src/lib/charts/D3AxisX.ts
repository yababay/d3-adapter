import * as d3 from 'd3'
import D3Canvas from './D3Canvas.js'
import type { ChartOptions, TimestampedMeasurements } from './types.js'

export default abstract class D3AxisX extends D3Canvas {

    #x: d3.ScaleTime<number, number, never>
    
    get x() {return this.#x} 

    setupDomains(): void {
        
        this.setupDomainY()
    }

    abstract setupDomainY(): void

    setupAxes(): void {  
        this.setupAxisY()
    }

    abstract setupAxisY(): void

    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)

        const {width} = this
        const rangeX = d3.scaleTime().range([0, width])
        const min = this.timestamps[0]
        const max = this.timestamps.slice(-1)[0]
        this.#x = rangeX.domain([min, max])
        
        const axisX = d3.axisBottom
        const {x, graphics} = this
        graphics.append("g")
            .attr("transform", `translate(0,${this.height})`)
            .call(axisX<Date>(x).tickFormat(d3.timeFormat("%H:%M:%S")))
    }
}
