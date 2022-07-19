import React, { useMemo } from 'react'
import { PressureContext } from './PressureContext'
import type { TPressureContext } from './types'
import type { FCC } from '../../react.types'

export const PressureProvider: FCC = ({ children }) => {
    const pressureContextValue: TPressureContext = useMemo(
        () => ({
            results: [],
        }),
        [],
    )

    return (
        <PressureContext.Provider value={pressureContextValue}>
            {children}
        </PressureContext.Provider>
    )
}
