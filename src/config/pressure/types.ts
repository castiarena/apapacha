export type TPressureResult = {
    high: number
    low: number
    date: Date
}

export type TPressureContext = {
    results: TPressureResult[]
}
