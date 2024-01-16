import * as d3 from 'd3'
import D3Canvas from './D3Canvas.js'
import type { ChartOptions, TimestampedMeasurements } from './types.js'

export default abstract class D3AxisX extends D3Canvas {

    #x: d3.ScaleTime<number, number, never> | undefined
    #axisX = d3.axisBottom
    
    get x() {return this.#x} 

    setupDomains(): void {
        const rangeX = d3.scaleTime().range([0, this.width])
        const min = this.timestamps[0]
        const max = this.timestamps.slice(-1)[0]
        this.#x = rangeX.domain([min, max])
        this.setupDomainY()
    }

    abstract setupDomainY(): void

    setupAxes(): void {
        if(!this.#x) throw 'no x'
        const axisX = this.#axisX
        const x = this.#x
        const g = this.graphics
        g.append("g")
            .attr("transform", `translate(0,${this.height})`)
            .call(axisX<Date>(x).tickFormat(d3.timeFormat("%H:%M:%S")))
        
        this.setupAxisY()
    }

    abstract setupAxisY(): void

    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
    }
}
