import { useContext } from 'react'
import { PressureContext } from './PressureContext'

export const usePressure = () => useContext(PressureContext)
