import { useContext } from 'react'
import { UserContext } from './UserContext'

export const useUser = () => {
    const { user, loading } = useContext(UserContext)

    return { user, loading, isLoggedIn: !!user }
}
