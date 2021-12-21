import * as d3 from 'd3';
import D3Scales from './D3Scales.js'

class D3SvgCanvas {
    constructor(figure, data = null, height = '400px', width = '100%') {
        figure.style.width = width
        figure.style.height = height
        this._data = data
        this._figure = figure
        this._axisX = d3.axisBottom
        this._axisY = d3.axisLeft
        this._scaleX = d3.scaleLinear
        this._scaleY = d3.scaleLinear
        this._margin = { top: 10, right: 10, bottom: 20, left: 20 };
    }

    set MARGIN_TOP(value)      { this.margin.top = value }
    set MARGIN_RIGHT(value)    { this.margin.right = value }
    set MARGIN_BOTTOM(value)   { this.margin.bottom = value }
    set MARGIN_LEFT(value)     { this.margin.left = value }
    set AXIS_X_ON_TOP(value)   { this._axisX = value ? d3.axisBottom : d3.axisTop } 
    set AXIS_Y_ON_RIGHT(value) { this._axisY = value ? d3.axisRight  : d3.axisLeft } 
    set SCALE_X(value) { this._scaleX = D3Scales[value] || value  }
    set SCALE_Y(value) { this._scaleY = D3Scales[value] || value  }
    set caption(value) { 
        this._svg = this._svg || this.svg
        d3.select(this._figure).append("figcaption").html(value)
    }

    get d3() {return d3}
    get svg() {
        const { top, right, bottom, left } = this._margin;
        this._svg = this._svg || d3.select(this._figure).append("svg")
            .attr("width", this._figure.offsetWidth)
            .attr("height", this._figure.offsetHeight)
        this._width = this._width || +this._svg.attr("width") - left - right
        this._height = this._height || +this._svg.attr("height") - top - bottom 
        return this._svg
    }
    get graphics() {
        const { top, left } = this._margin;
        const svg = this._svg || this.svg
        this._graphics = this._graphics || svg.append("g").attr("transform", `translate(${left},${top})`) 
        return this._graphics
    }

    getDefaultXRange() {
        const svg = this._svg || this.svg
        return this._scaleX().range([0, this._width])
    }

    getDefaultYRange() {
        const svg = this._svg || this.svg
        return this._scaleY().range([this._height, 0])
    }

    getXRange(range) {
        return this._scaleX().range(range)
    }

    getYRange(range) {
        return this._scaleY().range(range)
    }

    getDefaultXDomain () {
        const data = this._data
        return this.getDefaultXRange().domain([0, data.length - 1])
    }

    getDefaultYDomain () {
        const data = this._data
        const min = data.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        const max = data.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
        return this.getDefaultYRange().domain([min, max])
    }

    setDefaultYAxis(){
        const axisY = this._axisY 
        const domainY = this.getDefaultYDomain()
        const g = this._graphics || this.graphics
        g.append("g").call(axisY(domainY))
    }

    setDefaultXAxis(){
        const axisX = this._axisX 
        const domainX = this.getDefaultXDomain()
        const height = this._height
        const g = this._graphics || this.graphics
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisX(domainX));
    }

    setDefaultAxes(){
        this.setDefaultXAxis()
        this.setDefaultYAxis()
    }

}

export default D3SvgCanvas
