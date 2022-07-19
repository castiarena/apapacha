import * as React from 'react'
import type { FC } from 'react'

import { Routes, Route } from 'react-router-dom'
import { RoutesScreens } from './screens'
import { GuardRoute } from './components'

const Layout = React.lazy(() => import('./layout'))
const Home = React.lazy(() => import('./screens/Home'))
const Pressure = React.lazy(() => import('./screens/Pressure'))
const Login = React.lazy(() => import('./screens/Login'))
const Register = React.lazy(() => import('./screens/Register'))

export const App: FC = () => {
    return (
        <Layout>
            <Routes>
                <Route index element={<GuardRoute element={<Home />} />} />
                <Route
                    path={RoutesScreens.PRESSURE}
                    element={<GuardRoute element={<Pressure />} />}
                />
                <Route path={RoutesScreens.LOGIN} element={<Login />} />
                <Route path={RoutesScreens.REGISTER} element={<Register />} />
            </Routes>
        </Layout>
    )
}
