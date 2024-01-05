import D3Canvas from './D3Canvas'

const d3 = D3Canvas.d3


/**
 * Круговой график.
 * @class
 */
class D3RadialGraph extends D3Canvas  {
    constructor(figure, height, width){
        super(figure, height, width)
        this._dataOffset = .8
        this._axesOffset = .9
    }


    /**
     * Сеттер для отступа графика от внешней границы.
     */ 
    set dataOffset(value) {this._dataOffset = value}


    /**
     * Сеттер для отступа надписей от внешней границы.
     */ 
    set axesOffset(value) {this._axesOffset = value}

    setupAxes(data, width, height){
        const radius = (width < height ? width : height) * this._axesOffset / 2
        const g = this.graphics
        g.append("g").attr("class", "axisCircle")
            .append('circle')
            .attr('r', radius * .95)
            .attr('cx', 0)
            .attr('cy', 0)
            .style('fill', 'none')
            .style('stroke', 'silver')
            .attr('transform', `translate(${width / 2},${height / 2})`)

        const axes = g.append("g").attr("class", "axisWrapper").selectAll(".axis")
            .data(new Array(12).fill(0).map((_, i) => [2 * Math.PI * i / 12, i * 30]))
            .enter()
            .append("g")
            .attr("class", "axis")
            .attr('transform', `translate(${width / 2},${height / 2})`)
        
        axes.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", function(d){ return radius * Math.cos(d[0] - Math.PI/2); })
            .attr("y2", function(d){ return radius * Math.sin(d[0] - Math.PI/2); })
            .style('fill', 'none')
            .style('stroke', 'silver')

        axes.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", function(d, _){ return 1.05 * radius * Math.cos(d[0] - Math.PI/2); })
            .attr("y", function(d, _){ return 1.05 * radius * Math.sin(d[0] - Math.PI/2); })
            .text(function(d){return d[1]})
    }

    setupDomains(data, width, height){
        const maxValue = data.reduce((acc, el) => Math.max(acc, el), 0)
        const { length } = data
        const radius = (width < height ? width : height) * this._dataOffset / 2
        const angleStep = Math.PI * 2 / length
        const ratio = radius / maxValue
        const points = data.map((el, i) => [angleStep * i, el * ratio])
        points.push(points[0])
        this._points = points
    }
    
    adjust(d3, g, width, height){

        const radarLine = d3.lineRadial()
            .curve(d3.curveCardinal)(this._points)

        g.append('path')
            .attr("class", "radarArea")
            .attr("d", radarLine)
            .style('fill', 'none')
            .style('stroke', 'steelblue')
            .style("stroke-width", "2px")
            .attr('transform', `translate(${width / 2},${height / 2})`)
    }
}

export default D3RadialGraph
