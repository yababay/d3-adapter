import * as d3 from 'd3-scale'

type D3Function = (...args: any[]) => any

enum D3Scales {
    LINEAR = 1,
    POW,
    SQRT,
    LOG,
    SYMLOG,
    IDENTITY,
    RADIAL,
    TIME,
    UTC,
    SEQUENTIAL,
    SEQUENTIAL_LOG,
    SEQUENTIAL_POW,
    SEQUENTIAL_SQRT,
    SEQUENTIAL_SYMLOG,
    SEQUENTIAL_QUANTILE,
    DIVERGING,
    DIVERGING_LOG,
    DIVERGING_POW,
    DIVERGING_SQRT,
    DIVERGING_SYMLOG,
    QUANTIZE,
    QUANTILE,
    THRESHOLD,
    ORDINAL,
    IMPLICIT,
    BAND,
    POINT,
    NULL = null
}

function getScale(scaleType: D3Scales): D3Function | null {
    switch(scaleType){
        case D3Scales.LINEAR: return d3.scaleLinear
        case D3Scales.POW: return d3.scalePow
        case D3Scales.SQRT: return d3.scaleSqrt
        case D3Scales.LOG: return d3.scaleLog
        case D3Scales.SYMLOG: return d3.scaleSymlog
        case D3Scales.IDENTITY: return d3.scaleIdentity
        case D3Scales.RADIAL: return d3.scaleRadial
        case D3Scales.TIME: return d3.scaleTime
        case D3Scales.UTC: return d3.scaleUtc
        case D3Scales.SEQUENTIAL: return d3.scaleSequential
        case D3Scales.SEQUENTIAL_LOG: return d3.scaleSequentialLog
        case D3Scales.SEQUENTIAL_POW: return d3.scaleSequentialPow
        case D3Scales.SEQUENTIAL_SQRT: return d3.scaleSequentialSqrt
        case D3Scales.SEQUENTIAL_SYMLOG: return d3.scaleSequentialSymlog
        case D3Scales.SEQUENTIAL_QUANTILE: return d3.scaleSequentialQuantile
        case D3Scales.DIVERGING: return d3.scaleDiverging
        case D3Scales.DIVERGING_LOG: return d3.scaleDivergingLog
        case D3Scales.DIVERGING_POW: return d3.scaleDivergingPow
        case D3Scales.DIVERGING_SQRT: return d3.scaleDivergingSqrt
        case D3Scales.DIVERGING_SYMLOG: return d3.scaleDivergingSymlog
        case D3Scales.QUANTIZE: return d3.scaleQuantize
        case D3Scales.QUANTILE: return d3.scaleQuantile
        case D3Scales.THRESHOLD: return d3.scaleThreshold
        case D3Scales.ORDINAL: return d3.scaleOrdinal
        case D3Scales.BAND: return d3.scaleBand
        case D3Scales.POINT: return d3.scalePoint
        default: return null
    }
}

export { D3Scales, getScale }

