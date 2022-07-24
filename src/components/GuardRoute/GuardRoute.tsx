import * as React from 'react'
import type { FC, ReactNode } from 'react'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../config'
import { RoutesScreens } from '../../screens'
import { Spinner } from '@chakra-ui/react'

type TGuardRouteProps = {
    element: ReactNode | null
}

export const GuardRoute: FC<TGuardRouteProps> = ({ element }) => {
    const { user } = useUser()

    return (
        <Suspense fallback={<Spinner />}>
            {user ? element : <Navigate to={RoutesScreens.LOGIN} />}
        </Suspense>
    )
}
