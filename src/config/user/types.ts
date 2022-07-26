export type TUser = {
    name: string
    lastname: string
    email: string
    id: string
    age: number
}

export type TAuthRegistryErrorTypes =
    | 'auth/weak-password'
    | 'auth/email-already-in-use'
