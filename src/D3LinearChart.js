import D3SvgCanvas from './D3SvgCanvas.js'

class D3LinearChart extends D3SvgCanvas {

    constructor(figure, height, width){
        super(figure, height, width)
    }

    draw(){
        this.setDefaultAxes()
        const data = this._data
        const d3 = this.d3
        const domainX = (d, i) => this.getDefaultXDomain()(i)
        const domainY = d => this.getDefaultYDomain()(d)
        const valueLine = d3.line()
            .x(domainX)
            .y(domainY)
        this.graphics.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");

    }
}

export default D3LinearChart

