export type TPressureResult = {
    high: number
    low: number
    date: number
}

export type TAverageAndPeriodResult = {
    highAverage: TPressureResult['high']
    lowAverage: TPressureResult['low']
    from: string
    to: string
}

export type TPressureContext = {
    results: TPressureResult[]
    averageAndPeriod: TAverageAndPeriodResult
    setPressure: (pressure: TPressureResult) => Promise<void>
}
