import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { auth } from '../'

export const useUserLogin = () => {
    const [loadingUser, setLoadingUser] = useState<boolean>(false)
    const login = useCallback((email: string, password: string) => {
        setLoadingUser(true)
        return signInWithEmailAndPassword(auth, email, password).then(() =>
            setLoadingUser(false),
        )
    }, [])

    const logout = useCallback(() => {
        setLoadingUser(true)
        return signOut(auth).then(() => setLoadingUser(false))
    }, [])

    return { login, logout, loadingUser }
}
