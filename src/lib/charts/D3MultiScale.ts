import * as d3 from 'd3'
import D3SimpleLinearChart from './D3SimpleLinearChart.js'
import { tickFormat, timeFormat } from 'd3'

type ServerData = [Date | number, number][]

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
        if(!this.#dataTemp) throw 'bad thisdatatemp'
        this.#x = rangeX.domain([this.#dataTemp[0][0], this.#dataTemp[this.#dataTemp.length - 1][0]])
    }
 
    setDefaultYDomain(data: any[], height: number){
        const rangeYTemp = this.#scaleY().range([height, 0])
        const rangeYPress = this.#scaleY().range([height, 0])
        
        if(!this.#dataTemp) throw 'bad dataTemp'
        if(!this.#dataPress) throw 'bad dataPress'

        const getMinMax = (data: ServerData) => {
            const mapped = data.map(([ts, v]) => v)
            const min = mapped.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
            const max = mapped.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
            return [min, max]
        }
        console.log(this.#dataPress)
        console.log(getMinMax(this.#dataTemp))
        console.log(getMinMax(this.#dataPress))
        this.#yTemp = rangeYTemp.domain(getMinMax(this.#dataTemp))
        this.#yPress = rangeYPress.domain(getMinMax(this.#dataPress))

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

    #dataPress: ServerData | undefined = undefined
    #dataTemp: ServerData | undefined = undefined

    setupData(data: any[]): any[] {
        this.#dataTemp = data.map(({ts, temp_t01}) => [new Date(ts), temp_t01])
        this.#dataPress = data.map(({ts, druck_p01}) => [new Date(ts), druck_p01])
        /*return data.map((el) => {
            if(!(el && typeof el === "object")) throw 'no object'
            const {ts, druck_p01, temp_t01} = el
            if(!(typeof ts === "string" && typeof druck_p01 === "number" && 
                typeof temp_t01 === "number")) throw 'bad data'
            return [new Date(ts), {druck_p01, temp_t01}]
        })*/
        return data
    }

    adjust(g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, 
        height: number, data: any[]){
    if(!width || !height) throw 'no width height'
    if(!this.#dataTemp) throw 'no data temp'
    if(!this.#dataPress) throw 'no data press'
    const x = this.#x
    const yPress = this.#yPress
    const yTemp = this.#yTemp
    if(!(x && yPress && yTemp)) throw 'no x y'

    //console.log(data)

    const valueLinePress = d3.line()
        .x(([ts]) => x(ts))
        .y(([_, v]) => yPress(v))
        .curve(d3.curveCardinal)

    const valueLineTemp = d3.line()
        .x(([ts]) => x(ts))
        .y(([_, v]) => yTemp(v))
        .curve(d3.curveCardinal)

    g.append("path")
        .attr("class", "line")
        .attr("d", valueLinePress(this.#dataPress.map(([ts, v]) => [ts as number, v as number])))
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", "2px");

    g.append("path")
        .attr("class", "line")
        .attr("d", valueLineTemp(this.#dataTemp.map(([ts, v]) => [ts as number, v as number])))
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", "2px");
}
}

export default D3MultiScale