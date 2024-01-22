import D3AxisY from "./D3AxisY.js";
import type { ChartOptions, TimestampedMeasurements } from "./types.js";
import * as d3 from 'd3'

export default class D3Dynamic extends D3AxisY{

    addData(){
        const last = this.timestamps.slice(-1)[0]
        const first = this.timestamps[0]
        const ts = new Date(last.getTime() + 3600000)
        this.data.set(ts, {"temp": 60 + 25 * Math.random(), "press": 15 + 25 * Math.random()})
        this.data.delete(first)
        const {tempPath, yTemp, temperature, pressPath, yPress, pressure} = this
        if(!yTemp) throw 'ok-noyt'
        tempPath.attr("d", this.valueLine(yTemp,temperature))
        if(!yPress) throw 'ok-noyp'
        pressPath.attr("d", this.valueLine(yPress,pressure))
        this.drawAxisX()
        this.setupDomainY()
        this.setupAxisY()
    }
    
    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
    }
}