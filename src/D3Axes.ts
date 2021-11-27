import * as d3 from 'd3-axis'

type D3Function = (...args: any[]) => any

enum D3Axes {
    TOP = 1,
    RIGHT,
    BOTTOM,
    LEFT,
    NONE = null
}

function getAxis(axis: D3Axes): D3Function | null {
    switch(axis){
        case D3Axes.TOP: return d3.axisTop
        case D3Axes.RIGHT: return d3.axisRight
        case D3Axes.BOTTOM: return d3.axisBottom
        case D3Axes.LEFT: return d3.axisLeft 
        default: return null
    }
}

export { D3Axes, getAxis }

