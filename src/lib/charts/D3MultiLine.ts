import * as d3 from 'd3'
import D3SimpleLinearChart from './D3SimpleLinearChart.js'

/**
 * Линейный график.
 * @class
 */
class D3LinearWithDates extends D3SimpleLinearChart {

    #scaleX = d3.scaleTime
    #scaleY = d3.scaleLinear
    #axisX = d3.axisBottom
    #axisY = d3.axisLeft
    #offsetTop = .1
    #offsetBottom = .1
    #x: d3.ScaleTime<number, number, never> | undefined
    #y: d3.ScaleLinear<number, number, never> | undefined

    constructor(figure: HTMLElement, height?: number, width?: number){
        super(figure, height, width)
        this.marginLeft = 40
        this.marginBottom = 20
    }

    setDefaultXDomain(data: any[], width: number){
        const rangeX = this.#scaleX().range([0, width])
        this.#x = rangeX.domain([data[0][0], data[data.length - 1][0]])
    }
 
    setDefaultYDomain(data: any[], height: number){
        const rangeY = this.#scaleY().range([height, 0])
        const dataY = data.map(([ts, {temp_t01, druck_p01}]) => [temp_t01, druck_p01]) 
            .flat().filter(val => typeof val === 'number')
        const min = dataY.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        const max = dataY.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
        this.#y = rangeY.domain([min * (1 - this.#offsetBottom), max * (1 + this.#offsetTop)])
    }

    setDefaultXAxis(height: number){
        if(!this.#x) throw 'no x'
        const axisX = this.#axisX
        const x = this.#x
        //axisX(x).tickFormat(d3.timeFormat("%H:%M:%S"))
        const g = this.graphics //|| this.graphics
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(axisX(x));
    }

    setDefaultYAxis(){
        if(!this.#y) throw 'no y'
        const axisY = this.#axisY 
        const y = this.#y
        const g = this.graphics //|| this.graphics
        g.append("g").call(axisY(y))
    }

    setupAxes(data: any[], width: number, height: number){
        if(!data || !width) return
        this.setDefaultXAxis(height)
        this.setDefaultYAxis()
    }

    setupDomains(data: any[], width: number, height: number){
        this.setDefaultXDomain(data, width)
        this.setDefaultYDomain(data, height)
    }

    setupData(data: any[]): any[] {
        return data.map((el) => {
            if(!(el && typeof el === "object")) throw 'no object'
            const {ts, druck_p01, temp_t01} = el
            if(!(typeof ts === "string" && typeof druck_p01 === "number" && 
                typeof temp_t01 === "number")) throw 'bad data'
            return [new Date(ts), {druck_p01, temp_t01}]
        })
    }

    adjust(g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, 
        height: number, data: any[]){
    if(!width || !height) throw 'no width height'
    const x = this.#x
    const y = this.#y
    if(!(x && y)) throw 'no x y'

    console.log(data)

    const valueLine = d3.line()
        .x(([ts]) => x(ts))
        .y(([_, v]) => y(v))
        .curve(d3.curveCardinal)

    g.append("path")
        .attr("class", "line")
        .attr("d", valueLine(data.map(([ts, {druck_p01}]) => [ts, druck_p01])))
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "2px");

    g.append("path")
        .attr("class", "line")
        .attr("d", valueLine(data.map(([ts, {temp_t01}]) => [ts, temp_t01])))
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", "2px");
}
}

export default D3LinearWithDates