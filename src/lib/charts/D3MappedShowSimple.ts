import * as d3 from 'd3'
import type { Selection } from "d3-selection";
import D3MappedData from "./D3MappedData.js";
import type { MappedData } from "./types.js";

export default class D3MappedShowSimple extends D3MappedData{

    #yPress: d3.ScaleLinear<number, number, never> | undefined
    #yTemp: d3.ScaleLinear<number, number, never> | undefined

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
        throw new Error("Method not implemented.");
    }
    adjust(g: Selection<SVGGElement, unknown, null, undefined>, width: number, height: number, data: MappedData): void {
        throw new Error("Method not implemented.");
    }

    constructor(figure: HTMLElement){
        super(figure)
    }
}