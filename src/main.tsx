import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider, PressureProvider } from './config'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!)

root.render(
    <ChakraProvider>
        <BrowserRouter>
            <UserProvider>
                <PressureProvider>
                    <App />
                </PressureProvider>
            </UserProvider>
        </BrowserRouter>
    </ChakraProvider>,
)
