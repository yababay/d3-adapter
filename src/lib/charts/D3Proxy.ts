import D3AxisX from "./D3AxisX.js";
import type { ChartOptions, Druckable, TimestampedMeasurements } from "./types.js";
import * as d3 from 'd3'

const DELTA = .1

const withDelta = (min: number, max: number) => {
    const delta = (max - min) * DELTA
    return [min - delta, max + delta]
}

const getColor = (temp: boolean = true) => {
    const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]

    let hexColorRep = ""

    for (let position = 0; position < 4; position++){
        const randomPosition = Math.floor ( Math.random() * hexCharacters.length )
        hexColorRep += hexCharacters[position]
    }
  
    return temp ? `#FF${hexColorRep}` : `#${hexColorRep}FF`
}

class D3WithProxy extends D3AxisX {

    #axisPress: d3.Selection<SVGGElement, unknown, null, undefined> | undefined
    #axisTemp: d3.Selection<SVGGElement, unknown, null, undefined> | undefined
    #pathes = new Map<string, d3.Selection<SVGPathElement, unknown, null, undefined>>()

    drawPath(param: string, visibility: boolean = true): 
        d3.Selection<SVGPathElement, unknown, null, undefined>{
        let path = this.#pathes.get(param)
        const {yPress, yTemp} = this.setupDomainY()
        if(path){
            const data = this.subset(param)
            path.attr("d", this.valueLine(param.startsWith("temp_") ? yTemp : yPress, data))
            path.style("visibility", visibility ? "visible":"hidden")
            return path
        }
        path = this.graphics.append("path")
            .attr("class", "line")
            .style("fill", "none")
            .style("stroke", getColor(param.startsWith("temp_")))
            .style("stroke-width", "2px"); 
        this.#pathes.set(param, path)
        return this.drawPath(param)
    }

    valueLine(y: d3.ScaleLinear<number, number, never>, data: [number, number][]){
        const {x} = this
        const fn = d3.line()
            .x(([ts]) => x(ts))
            .y(([_, v]) => y(v))
            .curve(d3.curveCardinal)
            return fn(data)
    }

    get limits(): [number, number, number, number] {
        const {data} = this
        return Array.from(data.values()).reduce((acc, el) => {
            const [TEMP_MIN, PRESS_MIN, TEMP_MAX, PRESS_MAX] = acc
            let tempMin = TEMP_MIN, tempMax = TEMP_MAX, pressMin = PRESS_MIN, pressMax = PRESS_MAX
            for(const key of Reflect.ownKeys(el)){
                if(typeof key !== "string") continue
                const value = Reflect.get(el, key)
                if(key.startsWith("temp") && value <= tempMin) tempMin = value
                if(key.startsWith("press") && value <= pressMin) pressMin = value
                if(key.startsWith("temp") && value >= tempMax) tempMax = value
                if(key.startsWith("press") && value >= pressMax) pressMax = value
            }
            return [tempMin, pressMin, tempMax, pressMax]

        }, [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
    }

    setupDomainY() {
        const {height, limits} = this
        const [tempMin, tempMax] = withDelta(limits[0], limits[2])
        const [pressMin, pressMax] = withDelta(limits[1], limits[3])
        const rangeYTemp = d3.scaleLinear().range([height, 0])
        const rangeYPress = d3.scaleLinear().range([height, 0])
        const yTemp = rangeYTemp.domain([tempMin - tempMin * .1, tempMax + tempMax * .15])
        const yPress = rangeYPress.domain([pressMin - pressMin * .1, pressMax + pressMax * .15])
        return {yTemp, yPress}
    }

    setupAxisY(): void {
        const {yPress, yTemp} = this.setupDomainY()
        const {width, graphics} = this
        if(this.#axisPress) this.#axisPress.remove()
        this.#axisPress = graphics.append("g").call(d3.axisLeft(yPress))

        if(this.#axisTemp) this.#axisTemp.remove()
        this.#axisTemp = graphics.append("g")
            .call(d3.axisRight(yTemp)).attr("transform", `translate(${width}, 0)`)
    }

    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
        this.setupDomainY()
        this.setupAxisY()
    }
}

export default (figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions) => {
    let chart = new D3WithProxy(figure, data, options)
    return new Proxy({}, {
        /*get: function (target: Druckable, name: string) {
            if(name === 'pressureVisibility') return chart.pressureVisi
            if(name === 'temperatureVisibility') return chart.temperatureVisibility
            if(name.startsWith('druck')) return chart.pressure
            return 'hallo'
        },*/
        set: function (target: Druckable, name: string, value: boolean) {
            if(!(name.endsWith("_visibility") && 
                (name.startsWith("temp_") || name.startsWith("press_"))
            )) return true
            
            const [_, param] = /(.*)_visibility/.exec(name) || []
            if(typeof param !== "string") return true
            const path = chart.drawPath(param, value)
            return true
        }
    })
}
