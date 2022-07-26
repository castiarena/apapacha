import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ref, set, push, onValue } from 'firebase/database'
import { PressureContext } from './PressureContext'
import type { TPressureContext } from './types'
import type { FCC } from '../../react.types'
import { database } from '../setupFirebase'
import { useUser } from '../user'
import { TPressureResult } from './types'

export const PressureProvider: FCC = ({ children }) => {
    const { user } = useUser()
    const [results, setResults] = useState<TPressureContext['results']>([])

    const setPressure = useCallback(
        (pressure: TPressureResult) => {
            const userPressureRef = ref(database, `pressure/${user?.id}`)
            const newPressureRef = push(userPressureRef)
            return set(newPressureRef, pressure)
        },
        [user?.id],
    )

    const averageAndPeriod = useMemo(() => {
        const getSum = (param: keyof TPressureResult) =>
            results.reduce((acc, val) => acc + val[param], 0)

        const highAverage = getSum('high') / results.length
        const lowAverage = getSum('low') / results.length
        const from =
            results.length > 1
                ? new Date(results[0].date).toLocaleDateString()
                : 'not set'
        const to =
            results.length > 1
                ? new Date(
                      results[results.length - 1].date,
                  ).toLocaleDateString()
                : 'not set'

        return { highAverage, lowAverage, from, to }
    }, [results])

    const pressureContextValue: TPressureContext = useMemo(
        () => ({
            results,
            setPressure,
            averageAndPeriod,
        }),
        [averageAndPeriod, results, setPressure],
    )

    useEffect(() => {
        const pressureRef = ref(database, `pressure/${user?.id}`)

        const unsubscribe = onValue(pressureRef, (snapshot) => {
            const pressuresForUser: TPressureResult[] = []
            snapshot.forEach((snap) => {
                pressuresForUser.push(snap.val() as TPressureResult)
            })
            setResults(pressuresForUser)
        })

        return () => {
            unsubscribe()
        }
    }, [user?.id])

    return (
        <PressureContext.Provider value={pressureContextValue}>
            {children}
        </PressureContext.Provider>
    )
}
