import * as d3 from 'd3'
import type { Selection } from "d3-selection";
import D3MappedData from "./D3MappedData.js";
import type { MappedData, Measurements } from "./types.js";

export default class D3MappedShowSimple extends D3MappedData{

    #yPress: d3.ScaleLinear<number, number, never> | undefined
    #yTemp: d3.ScaleLinear<number, number, never> | undefined
    #axisYPress = d3.axisLeft
    #axisYTemp = d3.axisRight

    setupDomainY(data: MappedData, width: number, height: number): void {
        const measurements = Array.from( data.values()).map(({measurements}) => measurements)
        let tempMin = Number.MAX_SAFE_INTEGER
        let pressMin = Number.MAX_SAFE_INTEGER
        let tempMax = Number.MIN_SAFE_INTEGER
        let pressMax = Number.MIN_SAFE_INTEGER
        for(const measurement of measurements){
            tempMin = Math.min(tempMin, measurement['temp'])
            tempMax = Math.max(tempMax, measurement['temp'])
            pressMin = Math.min(pressMin, measurement['press'])
            pressMax = Math.max(pressMax, measurement['press'])
        }
        const rangeYTemp = d3.scaleLinear().range([height, 0])
        const rangeYPress = d3.scaleLinear().range([height, 0])
        this.#yTemp = rangeYTemp.domain([tempMin, tempMax])
        this.#yPress = rangeYPress.domain([pressMin, pressMax])
    }
    setupAxisY(data: MappedData, width: number, height: number): void {
        if(!this.#yPress) throw 'no yPress'
        const axisYPress = this.#axisYPress 
        const yPress = this.#yPress
        const g = this.graphics
        g.append("g").call(axisYPress(yPress))

        if(!this.#yTemp) throw 'no yTemp'
        const axisYTemp = this.#axisYTemp
        const yTemp = this.#yTemp
        g.append("g").call(axisYTemp(yTemp)).attr("transform", `translate(${width}, 0)`)
    }

    /*#dataTemp: 

    setupData(data: MappedData){
        return data
    }*/

    #pressPath: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined = undefined 
    #tempPath: d3.Selection<SVGPathElement, unknown, null, undefined> | undefined = undefined 

    get pressPath(){return this.#pressPath}
    
    adjust(g: Selection<SVGGElement, unknown, null, undefined>, width: number, 
            height: number, data: MappedData): void {
        if(!width || !height) throw 'no width height'
        const {x, timestamps, measurements} = this
        const yPress = this.#yPress
        const yTemp = this.#yTemp
        if(!(x && yPress && yTemp)) throw 'no x y'

        const dataTemp: [number, number][] = timestamps.map((ts, i) => {
            const values = measurements[i]
            if(!values) throw 'no values'
            if(typeof ts === "string") throw 'no ts string'
            const temp = values["temp"]
            return [ts.getTime(), temp] as [number, number]
        })

        const dataPress: [number, number][] = timestamps.map((ts, i) => {
            const values = measurements[i]
            if(!values) throw 'no values'
            if(typeof ts === "string") throw 'no ts string'
            const press = values["press"]
            return [ts.getTime(), press] as [number, number]
        })

        if(!Array.isArray(dataTemp)) throw 'no data temp'

        const valueLinePress = d3.line()
            .x(([ts]) => x(ts))
            .y(([_, v]) => yPress(v))
            .curve(d3.curveCardinal)

        const valueLineTemp = d3.line()
            .x(([ts]) => x(ts))
            .y(([_, v]) => yTemp(v))
            .curve(d3.curveCardinal)


        this.#pressPath = g.append("path")
            .attr("class", "line")
            .attr("d", valueLinePress(dataPress))
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");

        g.append("path")
            .attr("class", "line")
            .attr("d", valueLineTemp(dataTemp))
            //timestamps.map((ts, i) => [i, i])
            //)
            .style("fill", "none")
            .style("stroke", "red")
            .style("stroke-width", "2px");
    }

    constructor(figure: HTMLElement){
        super(figure)
    }
}