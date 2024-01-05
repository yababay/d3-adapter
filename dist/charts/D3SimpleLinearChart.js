import * as d3 from 'd3';
import D3Canvas from './D3Canvas';
/**
 * Линейный график.
 * @class
 */
class D3SimpleLinearChart extends D3Canvas {
    #scaleX = d3.scaleLinear;
    #scaleY = d3.scaleLinear;
    #axisX = d3.axisBottom;
    #axisY = d3.axisLeft;
    #offsetTop = .1;
    #offsetBottom = .1;
    constructor(figure, height, width) {
        super(figure, height, width);
        //this.marginLeft = 40
        //this.marginBottom = 20
    }
}
export default D3SimpleLinearChart;
