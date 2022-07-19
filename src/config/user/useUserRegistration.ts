import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth'
import { useCallback, useMemo, useState } from 'react'
import { auth } from '../'
import type { TAuthRegistryErrorTypes } from './types'

export const useUserRegistration = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoadingRegistration, setIsLoadingRegistration] =
        useState<boolean>(false)

    const errorMessages: Record<TAuthRegistryErrorTypes, string> = useMemo(
        () => ({
            'auth/weak-password': 'Too weak',
            'auth/email-already-in-use': 'Try with another email please',
        }),
        [],
    )

    const registrate = useCallback(
        (email: string, password: string) => {
            setIsLoadingRegistration(true)
            setError(null)
            return createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) =>
                    sendEmailVerification(userCredential.user),
                )
                .catch(({ code }: Record<'code', TAuthRegistryErrorTypes>) => {
                    setError(errorMessages[code])
                })
                .finally(() => setIsLoadingRegistration(false))
        },
        [errorMessages],
    )

    return { registrate, error, isLoadingRegistration }
}
