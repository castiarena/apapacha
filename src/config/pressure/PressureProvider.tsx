import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ref, set, push, onValue } from 'firebase/database'
import { format } from 'date-fns'
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

        const highAverage = Number(
            (getSum('high') / results.length).toPrecision(3),
        )
        const lowAverage = Number(
            (getSum('low') / results.length).toPrecision(3),
        )
        const from =
            results.length > 1
                ? format(new Date(results[0].date), 'dd/MM/yyyy - hh:mm')
                : 'not set'
        const to =
            results.length > 1
                ? format(
                      new Date(results[results.length - 1].date),
                      'dd/MM/yyyy - hh:mm',
                  )
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

            setResults(
                pressuresForUser.sort((a, b) => (a.date > b.date ? 1 : -1)),
            )
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
