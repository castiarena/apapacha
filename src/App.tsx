import * as React from 'react'
import type { FC } from 'react'

import { Routes, Route } from 'react-router-dom'
import { RoutesScreens } from './screens'
import { GuardRoute } from './components'

const Layout = React.lazy(() => import('./layout'))
const NotFound = React.lazy(() => import('./screens/NotFound'))
const Home = React.lazy(() => import('./screens/Home'))
const Pressure = React.lazy(() => import('./screens/Pressure'))
const Login = React.lazy(() => import('./screens/Login'))
const Register = React.lazy(() => import('./screens/Register'))
const Account = React.lazy(() => import('./screens/Account'))

export const App: FC = () => {
    return (
        <Layout>
            <Routes>
                {/**
                 Authenticated routes
                 **/}
                <Route
                    path={RoutesScreens.HOME}
                    element={<GuardRoute element={<Home />} />}
                />
                <Route
                    path={RoutesScreens.ACCOUNT}
                    element={<GuardRoute element={<Account />} />}
                />
                <Route
                    path={RoutesScreens.PRESSURE}
                    element={<GuardRoute element={<Pressure />} />}
                />
                {/**
                 Unauthenticated routes
                 **/}
                <Route path={RoutesScreens.LOGIN} element={<Login />} />
                <Route path={RoutesScreens.REGISTER} element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    )
}
