import { createContext } from 'react'
import type { TPressureContext } from './types'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const PressureContext = createContext<TPressureContext>(null!)
