import { createContext } from 'react'
import { NautineContextProps } from '../../types'

export const NautineContext = createContext<NautineContextProps>({
    sendLog: () => Promise.resolve(),
})

export const NautineProvider = NautineContext.Provider
