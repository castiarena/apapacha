import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getDatabase, ref, get, set, push, onValue } from 'firebase/database'
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

    const pressureContextValue: TPressureContext = useMemo(
        () => ({
            results,
            setPressure,
        }),
        [results, setPressure],
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
