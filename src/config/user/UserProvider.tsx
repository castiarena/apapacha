import React, { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { TUserContextType, UserContext } from './UserContext'
import type { FCC } from '../../react.types'
import type { TUser } from './types'
import { auth } from '../setupFirebase'

export const UserProvider: FCC = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<TUser | null>(null)

    useEffect(() => {
        const unsubscribeToAuthStateChanged = onAuthStateChanged(
            auth,
            (user) => {
                setLoading(false)
                setUser(
                    user && {
                        email: user.email || '',
                        name: user.displayName || '',
                        id: user.uid,
                    },
                )
            },
        )

        return () => unsubscribeToAuthStateChanged()
    }, [])

    const userContextValue: TUserContextType = useMemo(
        () => ({
            user,
            setUser,
            loading,
        }),
        [loading, user],
    )

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}
