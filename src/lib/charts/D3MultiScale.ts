import * as d3 from 'd3'
import D3SimpleLinearChart from './D3SimpleLinearChart.js'
import { tickFormat, timeFormat } from 'd3'

/**
 * Линейный график.
 * @class
 */
class D3MultiScale extends D3SimpleLinearChart {

    #scaleX = d3.scaleTime
    #scaleY = d3.scaleLinear
    #axisX = d3.axisBottom
    #axisYPress = d3.axisLeft
    #axisYTemp = d3.axisRight
    #offsetTop = .1
    #offsetBottom = .1
    #x: d3.ScaleTime<number, number, never> | undefined
    #yPress: d3.ScaleLinear<number, number, never> | undefined
    #yTemp: d3.ScaleLinear<number, number, never> | undefined

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

        //const dataYPress = data.map(([ts, {druck_p01}]) => druck_p01) 
        //const minPress = dataYPress.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        //const maxPress = dataYPress.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
        

        const dataYTemp = data.map(([ts, {temp_t01}]) => temp_t01) 
        const minTemp = dataYTemp.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        const maxTemp = dataYTemp.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)

        //const min = Math.min(minTemp, minPress)

        //console.log(dataYPress.sort())
        console.log(dataYTemp.sort())

        //this.#yTemp = rangeY.domain([minTemp * (1 - this.#offsetBottom), maxTemp * (1 + this.#offsetTop)])
        this.#yTemp = rangeY.domain([minTemp, maxTemp])

        //this.#yPress = rangeY.domain([minPress * (1 - this.#offsetBottom), maxPress * (1 + this.#offsetTop)])
        //this.#yPress = rangeY.domain([minPress, maxPress])
    }

    setDefaultXAxis(height: number){
        if(!this.#x) throw 'no x'
        const axisX = this.#axisX
        const x = this.#x
        const g = this.graphics //|| this.graphics
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            //.selectAll("text").attr("transform", "translate(-10,15)rotate(-45)"),
            .call(axisX<Date>(x)
                .tickFormat(d3.timeFormat("%H:%M:%S")) 
            );
    }

    setDefaultYAxis(){
        if(!this.#yPress) throw 'no yPress'
        const axisYPress = this.#axisYPress 
        const yPress = this.#yPress
        const g = this.graphics //|| this.graphics
        g.append("g").call(axisYPress(yPress))

        if(!this.#yTemp) throw 'no yTemp'
        const axisYTemp = this.#axisYTemp
        const yTemp = this.#yTemp
        //const g = this.graphics //|| this.graphics
        g.append("g").call(axisYTemp(yTemp)).attr("transform", `translate(500, 0)`)
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
    //const yPress = this.#yPress
    const yTemp = this.#yTemp
    if(!(x && yTemp)) throw 'no x y'

    //console.log(data)

    /*const valueLinePress = d3.line()
        .x(([ts]) => x(ts))
        .y(([_, v]) => yPress(v))
        .curve(d3.curveCardinal)*/

    const valueLineTemp = d3.line()
        .x(([ts]) => x(ts))
        .y(([_, v]) => yTemp(v))
        .curve(d3.curveCardinal)

    /*g.append("path")
        .attr("class", "line")
        .attr("d", valueLinePress(data.map(([ts, {druck_p01}]) => [ts, druck_p01])))
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "2px");*/

    g.append("path")
        .attr("class", "line")
        .attr("d", valueLineTemp(data.map(([ts, {temp_t01}]) => [ts, temp_t01])))
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", "2px");
}
}

export default D3MultiScale