import D3AbstractDecartian from './D3AbstractDecartian.js'

class D3SimpleLinearChart extends D3AbstractDecartian {

    constructor(figure, height, width){
        super(figure, height, width)
    }

    adjust(d3, g, width, height, data, x, y){
        /*
        this.setDefaultAxes()
        const valueLine = d3.line()
            .x((v, i) => x(i))
            .y(v => y(v))
        this.graphics.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");
            */
    }
}

export default D3SimpleLinearChart

