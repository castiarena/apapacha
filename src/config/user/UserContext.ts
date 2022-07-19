import { createContext } from 'react'
import type { TUser } from './types'

export type TUserContextType = {
    user: TUser | null
    setUser: (user: TUser) => void
    loading: boolean
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = createContext<TUserContextType>(null!)
