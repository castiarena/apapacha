import React, { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { TUserContextType, UserContext } from './UserContext'
import type { FCC } from '../../react.types'
import type { TUser } from './types'
import { auth, database } from '../setupFirebase'
import { onValue, ref, get } from 'firebase/database'

export const UserProvider: FCC = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<TUser | null>(null)

    useEffect(() => {
        const unsubscribeToAuthOnValue = onValue(
            ref(database, `usersMetadata/${user?.id}`),
            (snapshot) => {
                const metaData: TUser = snapshot.val()
                setUser((oldUser) => ({
                    ...oldUser,
                    ...metaData,
                }))
            },
        )

        const unsubscribeToAuthStateChanged = onAuthStateChanged(
            auth,
            async (user) => {
                setLoading(false)
                const userMetadata: TUser =
                    (
                        await get(ref(database, `usersMetadata/${user?.uid}`))
                    ).val() || ({} as TUser)
                console.log(userMetadata)
                setUser(
                    user && {
                        ...userMetadata,
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
