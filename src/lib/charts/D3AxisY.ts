import D3AxisX from "./D3AxisX.js";
import type { ChartOptions, TimestampedMeasurements } from "./types.js";
import * as d3 from 'd3'

export default class D3AxisY extends D3AxisX{

    #lineYp: d3.Selection<SVGGElement, unknown, null, undefined> | undefined
    #lineYt: d3.Selection<SVGGElement, unknown, null, undefined> | undefined

    #yPress: d3.ScaleLinear<number, number, never> | undefined
    #yTemp: d3.ScaleLinear<number, number, never> | undefined

    #pressPath: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined
    #tempPath: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined

    set temperatureVisibility(yes: boolean){
        this.tempPath.style("visibility", yes ? "visible":"hidden")
    }

    set pressureVisibility(yes: boolean){
        this.pressPath.style("visibility", yes ? "visible":"hidden")
    }

    get temperature() {return this.subset('temp')}
    get pressure() {return this.subset('press')}
    get yTemp(){return this.#yTemp}
    get yPress(){return this.#yPress}
    
    get pressPath() {
        if(this.#pressPath) return this.#pressPath
        const {x, pressure, graphics} = this
        const yPress = this.#yPress
        if(!(yPress)) throw 'no x ypress'
        this.#pressPath = graphics.append("path")
            .attr("class", "line")
            .attr("d", this.valueLine(yPress, pressure))
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");
        return this.#pressPath
    }

    get tempPath() {
        if(this.#tempPath) return this.#tempPath
        const {x, temperature, graphics} = this
        const {yTemp} = this
        if(!(yTemp)) throw 'no x ytemp'
        this.#tempPath = graphics.append("path")
            .attr("class", "line")
            .attr("d", this.valueLine(yTemp,temperature))
            .style("fill", "none")
            .style("stroke", "red")
            .style("stroke-width", "2px");
        return this.#tempPath
    }

    valueLine(y: d3.ScaleLinear<number, number, never>, data: [number, number][]){
        const {x} = this
        const fn = d3.line()
            .x(([ts]) => x(ts))
            .y(([_, v]) => y(v))
            .curve(d3.curveCardinal)
            return fn(data)
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
        const {width, graphics} = this
        if(this.#lineYp) this.#lineYp.remove()
        this.#lineYp = graphics.append("g").call(axisYPress(yPress))

        if(!this.#yTemp) throw 'no yTemp'
        const axisYTemp = d3.axisRight
        const yTemp = this.#yTemp
        if(this.#lineYt) this.#lineYt.remove()
        this.#lineYt = graphics.append("g")
            .call(axisYTemp(yTemp)).attr("transform", `translate(${width}, 0)`)
    }
    
    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
        this.setupDomainY()
        this.setupAxisY()
        const {pressPath, tempPath} = this
        if(!(pressPath && tempPath)) throw 'not ready'
    }
}