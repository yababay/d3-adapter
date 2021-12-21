import * as d3 from 'd3-scale';

const scales = {
    "LINEAR": d3.scaleLinear,
    "POW": d3.scalePow,
    "SQRT": d3.scaleSqrt,
    "LOG": d3.scaleLog,
    "SYMLOG": d3.scaleSymlog,
    "IDENTITY": d3.scaleIdentity,
    "RADIAL": d3.scaleRadial,
    "TIME": d3.scaleTime,
    "UTC": d3.scaleUtc,
    "SEQUENTIAL": d3.scaleSequential,
    "SEQUENTIAL_LOG": d3.scaleSequentialLog,
    "SEQUENTIAL_POW": d3.scaleSequentialPow,
    "SEQUENTIAL_SQRT": d3.scaleSequentialSqrt,
    "SEQUENTIAL_SYMLOG": d3.scaleSequentialSymlog,
    "SEQUENTIAL_QUANTILE": d3.scaleSequentialQuantile,
    "DIVERGING": d3.scaleDiverging,
    "DIVERGING_LOG": d3.scaleDivergingLog,
    "DIVERGING_POW": d3.scaleDivergingPow,
    "DIVERGING_SQRT": d3.scaleDivergingSqrt,
    "DIVERGING_SYMLOG": d3.scaleDivergingSymlog,
    "QUANTIZE": d3.scaleQuantize,
    "QUANTILE": d3.scaleQuantile,
    "THRESHOLD": d3.scaleThreshold,
    "ORDINAL": d3.scaleOrdinal,
    "BAND": d3.scaleBand,
    "POINT": d3.scalePoint
}

function makeEnumeration(obj)
{
    const newObj = {};

    for( const prop in obj ) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = Symbol(obj[prop]);
        }
    }

    return Object.freeze(newObj);
}

export default makeEnumeration(scales)

