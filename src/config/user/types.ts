export type TUser = {
    name: string
    email: string
}

export type TAuthRegistryErrorTypes =
    | 'auth/weak-password'
    | 'auth/email-already-in-use'
