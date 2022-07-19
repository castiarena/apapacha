import * as React from 'react'
import type { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../config'
import { RoutesScreens } from '../../screens'

type TGuardRouteProps = {
    element: ReactNode | null
}

export const GuardRoute: FC<TGuardRouteProps> = ({ element }) => {
    const { user } = useUser()

    if (!user) {
        return <Navigate to={RoutesScreens.LOGIN} />
    }

    return <>{element}</>
}
