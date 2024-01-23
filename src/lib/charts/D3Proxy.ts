import D3AxisX from "./D3AxisX.js";
import type { ChartOptions, Druckable, TimestampedMeasurements } from "./types.js";

class D3WithProxy extends D3AxisX {
    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions){
        super(figure, data, options)
    }
}

export default (figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions) => {
    let chart = new D3WithProxy(figure, data, options)
    return new Proxy({}, {
        get: function (target: Druckable, name: string) {
            if(name === 'pressureVisibility') return chart.pressureVisibility
            if(name === 'temperatureVisibility') return chart.temperatureVisibility
            if(name.startsWith('druck')) return chart.pressure
            return 'hallo'
        },
        set: function (target: Druckable, name: string, value: boolean) {
            if(name === 'pressureVisibility') chart.pressureVisibility = value
            if(name === 'temperatureVisibility') chart.temperatureVisibility = value
            return true
        }
    })
}
