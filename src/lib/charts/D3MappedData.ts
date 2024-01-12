import * as d3 from 'd3'
import D3MappedCanvas from './D3MappedCanvas.js'
import type { MappedData } from './types.js'

export default abstract class D3MappedData extends D3MappedCanvas {

    #x: d3.ScaleTime<number, number, never> | undefined
    #axisX = d3.axisBottom

    setupDomains(data: MappedData, width: number, height: number): void {
        const rangeX = d3.scaleTime().range([0, width])
        const timestamps = Array.from(data.keys()).map(ts => new Date(ts)).sort()
        const min = timestamps[0]
        const max = timestamps.slice(-1)[0]
        this.#x = rangeX.domain([min, max])

        this.setupDomainY(data, width, height)
    }

    abstract setupDomainY(data: MappedData, width: number, height: number): void

    setupAxes(data: MappedData, width: number, height: number): void {
        if(!this.#x) throw 'no x'
        const axisX = this.#axisX
        const x = this.#x
        const g = this.graphics //|| this.graphics
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(axisX<Date>(x).tickFormat(d3.timeFormat("%H:%M:%S")))
            //.selectAll("text").attr("transform", "translate(-10,15)rotate(-45)")
        
        this.setupAxisY(data, width, height)
    }

    abstract setupAxisY(data: MappedData, width: number, height: number): void

    constructor(figure: HTMLElement){
        super(figure)
    }
}