import { useContext, useMemo } from 'react'
import { UserContext } from './UserContext'

export const useUser = () => {
    const { user, loading } = useContext(UserContext)

    const isLoggedIn = useMemo(() => !!user, [user])

    return { user, loading, isLoggedIn }
}
