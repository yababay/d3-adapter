import * as d3 from 'd3'
import D3Canvas from './D3Canvas.js'

/**
 * Линейный график.
 * @class
 */
class D3SimpleLinearChart extends D3Canvas {

    #scaleX = d3.scaleLinear
    #scaleY = d3.scaleLinear
    #axisX = d3.axisBottom
    #axisY = d3.axisLeft
    #offsetTop = .1
    #offsetBottom = .1
    #x: d3.ScaleLinear<number, number, never> | undefined
    #y: d3.ScaleLinear<number, number, never> | undefined

    constructor(figure: HTMLElement, height?: number, width?: number){
        super(figure, height, width)
        this.marginLeft = 40
        this.marginBottom = 20
    }

    setDefaultXDomain(data: any[], width: number){
        const rangeX = this.#scaleX().range([0, width])
        this.#x = rangeX.domain([0, data.length - 1])
    }

    setDefaultYDomain(data: any[], height: number){
        const rangeY = this.#scaleY().range([height, 0])
        const min = data.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        const max = data.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
        this.#y = rangeY.domain([min * (1 - this.#offsetBottom), max * (1 + this.#offsetTop)])
    }

    setDefaultXAxis(height: number){
        if(!this.#x) throw 'no x'
        const axisX = this.#axisX 
        const x = this.#x
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

    adjust(g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, 
            height: number, data: any[]){
        if(!width || !height) throw 'no width height'
        const x = this.#x
        const y = this.#y
        if(!(x && y)) throw 'no x y'
        console.log(data)

        const valueLine = d3.line()
            .x(([i, _]) => x(i))
            .y(([_, v]) => y(v))
            .curve(d3.curveCardinal)

        g.append("path")
            //.data(data.map((el, i) => [i, el]))
            .attr("class", "line")
            .attr("d", valueLine(data.map((el, i) => [i, el])))
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");
    }
}

export default D3SimpleLinearChart

