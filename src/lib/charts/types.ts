export type Measurements = {[key: string]: number}
export type Timestamp = string | Date
export type TimestampedMeasurements = Map<Timestamp, Measurements>
export type Caption = {title: string, height: string}
export type Margin = {top: number, right: number, bottom: number, left: number}

export type ChartOptions = {
        caption?: Caption
        margin?: Margin        
}

export type Druckable = {[key: string]: string | number | boolean | [number, number][]}