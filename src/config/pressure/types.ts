export type TPressureResult = {
    high: number
    low: number
    date: number
}

export type TPressureContext = {
    results: TPressureResult[]
    setPressure: (pressure: TPressureResult) => Promise<void>
}
