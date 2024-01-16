import * as d3 from 'd3'
import type { ChartOptions, Margin, Measurements, TimestampedMeasurements } from './types.js'

/**
 * Базовый класс-канва для остальных графиков. Позволяет настроить поля, создать основные объекты.
 * @class
 */

export default abstract class D3Canvas {

    #figure: HTMLElement
    #width: number
    #height: number
    #data: Map <Date, Measurements>
    #margin: Margin = { top: 10, right: 10, bottom: 20, left: 10 }
    #svg: d3.Selection<HTMLElement, unknown, null, undefined> | d3.Selection<SVGSVGElement, unknown, null, undefined>
    #graphics: d3.Selection<SVGGElement, unknown, null, undefined>
    
    /**
     * Конструктор для создания svg-пространства с полями. Обратите внимание, что высота указывается перед шириной, т.к. чаще может возникнуть потребность в ее изменении. Ширина по умолчанию 100% от родительского элемента, что приемлемо в большинстве случаев.
     * @param {HTMLElement} - html-контейнер, в который будет вписан график
     * @param {data} - данные в формате Map (js), см. тип TimestampedMeasurements.
     * @param {option} - необязательный, отступы, подпись и т.п.
     */

    constructor(figure: HTMLElement, data: TimestampedMeasurements, options?: ChartOptions) {
        this.#figure = figure
        const figureWidth = figure.offsetWidth
        const figureHeight = figure.offsetHeight
        this.#data = new Map<Date, Measurements>(
            Array.from(data.entries()).map(([key, value]) => [new Date(key), value])
        )
        this.#svg = d3.select(this.#figure).append("svg").attr("width", figureWidth).attr("height", figureHeight)
        if(options) {
            const {caption, margin} = options
            if(margin) this.#margin = margin
            // TODO: use other options
        }
        const { top, right, bottom, left } = this.#margin;
        this.#width = figureHeight - left - right
        this.#height = figureHeight - top - bottom 
        this.#graphics = this.#svg.append("g")
            .attr('width', this.#width)
            .attr('height', this.#height)
            .attr('transform', `translate(${left},${top})`) 
    }

    get width() {return this.#width}
    get height() {return this.#height}
    get margin() {return this.#margin}
    get graphics() {return this.#graphics}
    get timestamps() {return Array.from(this.#data.keys()).sort((a: Date, b: Date) => a.getTime() - b.getTime() )}

    subset(key: string):[number, number][] {
        return this.timestamps.map(ts => {
            const value = this.#data.get(ts)
            if(!value) throw 'no value in subset'
            return [ts.getTime(), value[key]]
        })
    }
}
