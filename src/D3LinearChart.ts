import D3BareChart from './D3BareChart'

class D3LinearChart extends D3BareChart {

    rangeX: any 
    rangeY: any 

    constructor(figure: HTMLElement, height= '400px', width = '100%'){
        super(figure, height, width)
    }

    prepareGraphics(d3: any, figure: HTMLElement, data: any, svg: any, graphics: any, defs: any){
        if(d3 || figure || data || svg || graphics || defs) return // just stub
    }

    prepareRanges (d3: any, data: any, scaleX: any, scaleY: any, width: number, height: number): [any, any] {
        return [
            scaleX.range([0, width]),
            scaleY.range([height, 0])
        ]
    }

    prepareDomains (d3: any, data: any, rangeX: any, rangeY: any, width: number, height: number): [any, any] {
        const min = data.reduce((acc: number, el: number) => Math.min(acc, el), Number.MAX_SAFE_INTEGER)
        const max = data.reduce((acc: number, el: number) => Math.max(acc, el), Number.MIN_SAFE_INTEGER)
        return [
            rangeX.domain([0, data.length - 1]),
            rangeY.domain([min, max])
        ]
    }

    prepareAxes(d3: any, data: any, g: any, domainX: any, domainY: any, axisX: any, axisY: any, width: number, height: number): void {
        g.append("g").call(axisY(domainY));
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisX(domainX));
    }

    draw(d3: any, data: any, graphics: any, domainX: any, domainY: any): void {
        const valueLine = d3.line()
            .x(function(d: any, i: number) { return domainX(i)})
            .y(function(d: any) { return domainY(d)})
        graphics.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueLine)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px")
    }

}

export default D3LinearChart
