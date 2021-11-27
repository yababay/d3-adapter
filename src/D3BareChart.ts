import * as d3 from 'd3'

import { D3Scales, getScale } from './D3Scales'
import { D3Axes, getAxis } from './D3Axes'

abstract class D3BareChart {

    public static d3 = d3

    private _figure: HTMLElement
    private _margin = {top: 10, right: 10, bottom: 20, left: 20}
    private _scaleX = D3Scales.LINEAR
    private _scaleY = D3Scales.LINEAR
    private _axisX = D3Axes.BOTTOM
    private _axisY = D3Axes.LEFT

    constructor(figure: HTMLElement, height= '400px', width = '100%'){
        figure.style.width = width
        figure.style.height = height
        this._figure = figure
    }

    set caption(html: string){
        d3.select(this._figure)
            .selectAll("figcapture")
            .data([0])
            .enter()
            .append("figcaption")
            .html(html)
    }

    set top(value: number) {this._margin.top = value}
    set right(value: number) {this._margin.right = value}
    set bottom(value: number) {this._margin.bottom = value}
    set left(value: number) {this._margin.left = value}

    set scaleX(value: D3Scales) {
        if(!value) throw "Please setup scale on x-axis correctly!"
        this._scaleX = value
    }

    set scaleY(value: D3Scales) {
        if(!value) throw "Please setup scale on y-axis correctly!"
        this._scaleY = value
    }

    set axisX(value: D3Axes) {
        if(!(value in [D3Axes.TOP, D3Axes.BOTTOM])) throw "Please setup x-axis correctly!"
        this._axisX = value
    }

    set axisY(value: D3Axes) {
        if(!(value in [D3Axes.LEFT, D3Axes.RIGHT])) throw "Please setup y-axis correctly!"
        this._axisY = value
    }

    inject(data: any): void {
        const {top, right, bottom, left} = this._margin
        const svg = d3.select(this._figure).append("svg")
            .attr("width", this._figure.offsetWidth)
            .attr("height", this._figure.offsetHeight),
            width  = +svg.attr("width") - left - right,
            height = +svg.attr("height") - top - bottom,
            scaleX = getScale(this._scaleX)(),
            scaleY = getScale(this._scaleY)(),
            axisX = getAxis(this._axisX),
            axisY = getAxis(this._axisY),
            graphics = svg.append("g")
                .attr("transform", `translate(${left},${top})`),
            defs = graphics.append("defs").append("clipPath")
            //    .attr("id", "clip")
            //    .append("rect")
            //    .attr("width", width)
            //    .attr("height", height);
        this.prepareGraphics(d3, this._figure, data, svg, graphics, defs)
        const [rangeX, rangeY]   = this.prepareRanges(d3, data, scaleX, scaleY, width, height)
        const [domainX, domainY] = this.prepareDomains(d3, data, rangeX, rangeY, width, height)
        this.prepareAxes(d3, data, graphics, domainX, domainY, axisX, axisY, width, height)
        this.draw(d3, data, graphics, domainX, domainY)
    }

    abstract prepareGraphics(d3: any, figure: HTMLElement, data: any, svg: any, graphics: any, defs: any): void
    abstract prepareRanges  (d3: any, data: any, scaleX: any, scaleY: any, width: number, height: number): [any, any]
    abstract prepareDomains (d3: any, data: any, rangeX: any, rangeY: any, width: number, height: number): [any, any]
    abstract prepareAxes    (d3: any, data: any, svg: any, domainX: any, domainY: any, axisX: any, axisY: any, width: number, height: number): void
    abstract draw(d3: any, data: any, graphics: any, domainX: any, domainY: any): void

}

export default D3BareChart

