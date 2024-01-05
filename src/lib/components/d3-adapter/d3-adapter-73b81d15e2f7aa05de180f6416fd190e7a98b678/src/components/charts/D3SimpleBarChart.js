import D3SimpleLinearChart from './D3SimpleLinearChart.js'

const d3 = D3SimpleLinearChart.d3

/**
 * Столбчатый график.
 * @class
 */
class D3SimpleBarChart extends D3SimpleLinearChart {

    constructor(figure, height, width){
        super(figure, height, width)
        this._barPadding = .1
    }

    setDefaultYDomain(data, height){
        this._y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function(d) { return d.value; }) * (1 + this._offsetTop)])
    }

    setDefaultXDomain(data, width){
        this._x = d3.scaleBand()
            .range([0, width])
            .padding(this._barPadding)
            .domain(data.map(function(d) { return d.label; }))

    }

    setupData(data){
        if(typeof data[0] == 'number') data = data.map((el, i) => ({value: el, label: `#${i + 1}`}))
        return data
    }

    adjust(d3, g, width, height, data){
        if(!d3 || !width || !height) return
        const x = this._x
        const y = this._y

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.label); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .style("fill", "steelblue")
            .style("stroke", "#386890")
    }
}

export default D3SimpleBarChart

