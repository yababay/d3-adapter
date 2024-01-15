type Chart = {color?: string, hidden?: boolean, 
        path?: d3.Selection<SVGPathElement, unknown, null, undefined>}

export type Measurements = {[key: string]: number}

export type ChartWithMeasurements = {chart: Chart, measurements: Measurements}

export type DateOrString = string | Date

export type MappedData = Map<DateOrString, ChartWithMeasurements>