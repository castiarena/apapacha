import * as React from 'react'
import type { FC } from 'react'

import { Layout } from './layout'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Pressure, Register, RoutesScreens } from './screens'
import { GuardRoute } from './components'

const Home = import()

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
