import * as d3 from 'd3'
import D3Canvas from './D3Canvas.js'
import type { MappedData } from './types.js'

const checkMap = (data: MappedData): Map<string | Date, {[key: string]: string | number}> => {
    if(Array.isArray(data)) throw new Error('only Map is allowed')
    return data
}

export default class D3MappedData extends D3Canvas {

    #x: d3.ScaleTime<number, number, never> | undefined

    setupDomains(data: MappedData, width: number, height: number): void {
        data = checkMap(data)
        const rangeX = d3.scaleTime().range([0, width])
        const timestamps = Array.from(data.keys()).map(ts => new Date(ts)).sort()
        const min = timestamps[0]
        const max = timestamps.slice(-1)[0]
        this.#x = rangeX.domain([min, max])
    }

    setupAxes(data: MappedData, width: number, height: number): void {
        data = checkMap(data)
    }

    adjust(g: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number, data: MappedData): void {
        data = checkMap(data)
    }

    constructor(figure: HTMLElement){
        super(figure)
    }
}