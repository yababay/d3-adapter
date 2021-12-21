import D3SvgCanvas from './D3SvgCanvas.js'
import D3Scales from './D3Scales.js'

class D3BarChart extends D3SvgCanvas {

    constructor(figure, data, height, width){
        super(figure, data, height, width)
        this.scaleX = D3Scales.BAND
    }

    draw(){
        const d3 = this.d3
        const g = this._graphics || this.graphics
        const data = this._data
        console.log(data)
        const width = this._width
        const height = this._height
        //const x = this.getDefaultXRange().padding(.1)
        //    .domain(data.map(function(d) { return d.label; }))
        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(data.map(function(d) { return d.label; }))
        //const y = this.getDefaultYRange()
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) { return d.value; })])
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.label); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });
        this.setDefaultAxes()
    }
}

export default D3BarChart

