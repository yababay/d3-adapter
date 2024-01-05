import D3Canvas from './D3Canvas.js'

const d3 = D3Canvas.d3

/**
 * Линейный график.
 * @class
 */
class D3SimpleLinearChart extends D3Canvas {

    constructor(figure, height, width){
        super(figure, height, width)
        this._scaleX = d3.scaleLinear
        this._scaleY = d3.scaleLinear
        this._axisX = d3.axisBottom
        this._axisY = d3.axisLeft
        this._offsetTop = .1
        this._offsetBottom = .1
        this.marginLeft = 40
        this.marginBottom = 20
    }

    setDefaultXAxis(height){
        const axisX = this._axisX 
        const x = this._x
        const g = this._graphics || this.graphics
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(axisX(x));
    }

    setDefaultYAxis(){
        const axisY = this._axisY 
        const y = this._y
        const g = this._graphics || this.graphics
        g.append("g").call(axisY(y))
    }

    setupAxes(data, width, height){
        if(!data || !width) return
        this.setDefaultXAxis(height)
        this.setDefaultYAxis()
    }

    setDefaultXDomain(data, width){
        const rangeX = this._scaleX().range([0, width])
        this._x = rangeX.domain([0, data.length - 1])
    }

    setDefaultYDomain(data, height){
        const rangeY = this._scaleY().range([height, 0])
        const min = data.reduce((acc, el) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        const max = data.reduce((acc, el) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
        this._y = rangeY.domain([min * (1 - this._offsetBottom), max * (1 + this._offsetTop)])
    }

    setupDomains(data, width, height){
        this.setDefaultXDomain(data, width)
        this.setDefaultYDomain(data, height)
    }

    adjust(d3, g, width, height, data){
        if(!width || !height) return
        const x = this._x
        const y = this._y

        const valueLine = d3.line()
            .x((_, i) => x(i))
            .y(v => y(v))
            .curve(d3.curveCardinal)

        g.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");
    }
}

export default D3SimpleLinearChart

