import D3AxisX from "./D3AxisX.js";
import type { ChartOptions, TimestampedMeasurements } from "./types.js";
import * as d3 from 'd3'

export default class D3AxisY extends D3AxisX{

    #yPress: d3.ScaleLinear<number, number, never> | undefined
    #yTemp: d3.ScaleLinear<number, number, never> | undefined

    #pressPath: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined
    #tempPath: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined

    get temperature() {return this.subset('temp')}
    get pressure() {return this.subset('press')}

    get pressPath() {
        if(this.#pressPath) return this.#pressPath
        const {x, pressure, graphics} = this
        const yPress = this.#yPress
        if(!(yPress)) throw 'no x ypress'
        const valueLinePress = d3.line()
            .x(([ts]) => x(ts))
            .y(([_, v]) => yPress(v))
            .curve(d3.curveCardinal)
        this.#pressPath = graphics.append("path")
            .attr("class", "line")
            .attr("d", valueLinePress(pressure))
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");
        return this.#pressPath
    }

    get tempPath() {
        if(this.#tempPath) return this.#tempPath
        const {x, temperature, graphics} = this
        const yTemp = this.#yTemp
        if(!(yTemp)) throw 'no x ytemp'
        const valueLineTemp = d3.line()
            .x(([ts]) => x(ts))
            .y(([_, v]) => yTemp(v))
            .curve(d3.curveCardinal)
        this.#tempPath = graphics.append("path")
            .attr("class", "line")
            .attr("d", valueLineTemp(temperature))
            .style("fill", "none")
            .style("stroke", "red")
            .style("stroke-width", "2px");
        return this.#tempPath
    }
    
    setupDomainY(): void {
        
        const {pressure, temperature, height} = this

        let tempMin = temperature
            .map(([ts, value]) => value)
            .reduce((acc, value) => Math.min(acc, value), Number.MAX_SAFE_INTEGER)
        let pressMin = pressure
            .map(([ts, value]) => value)
            .reduce((acc, value) => Math.min(acc, value), Number.MAX_SAFE_INTEGER)
        let tempMax = temperature
            .map(([ts, value]) => value)
            .reduce((acc, value) => Math.max(acc, value), Number.MIN_SAFE_INTEGER)
        let pressMax = pressure
            .map(([ts, value]) => value)
            .reduce((acc, value) => Math.max(acc, value), Number.MIN_SAFE_INTEGER)
        
        const rangeYTemp = d3.scaleLinear().range([height, 0])
        const rangeYPress = d3.scaleLinear().range([height, 0])
        this.#yTemp = rangeYTemp.domain([tempMin, tempMax])
        this.#yPress = rangeYPress.domain([pressMin, pressMax])
    }
    
    setupAxisY(): void {
        if(!this.#yPress) throw 'no yPress'
        const axisYPress = d3.axisLeft
        const yPress = this.#yPress
        const g = this.graphics
        g.append("g").call(axisYPress(yPress))

        const {width} = this

        if(!this.#yTemp) throw 'no yTemp'
        const axisYTemp = d3.axisRight
        const yTemp = this.#yTemp
        g.append("g").call(axisYTemp(yTemp)).attr("transform", `translate(${width}, 0)`)
    }
    
    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
        this.setupDomainY()
        this.setupDomainY()
        const {pressPath, tempPath} = this
        if(!(pressPath && tempPath)) throw 'not ready'
    }
}