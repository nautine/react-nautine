import { createContext } from 'react'
import { NautineContextProps } from '../../types'

export const NautineContext = createContext<NautineContextProps>({
    logger: {
        fatal: () => Promise.resolve(),
        error: () => Promise.resolve(),
        warn: () => Promise.resolve(),
        info: () => Promise.resolve(),
        debug: () => Promise.resolve(),
        trace: () => Promise.resolve(),
    },
})

export const NautineProvider = NautineContext.Provider
