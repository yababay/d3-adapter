import D3Canvas from './D3Canvas';
/**
 * Линейный график.
 * @class
 */
declare abstract class D3SimpleLinearChart extends D3Canvas {
    #private;
    constructor(figure: HTMLElement, height?: number, width?: number);
}
export default D3SimpleLinearChart;
