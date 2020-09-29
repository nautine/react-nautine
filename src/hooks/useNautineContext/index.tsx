import { useContext } from 'react'
import invariant from 'tiny-warning'
import { NautineContext } from '../../context'
import { NautineContextProps } from '../../types'

/**
 * Hooks into the active Nautine Context.
 */
export const useNautineContext = () => {
    const nautineContext = useContext<NautineContextProps>(NautineContext)

    invariant(
        !!nautineContext,
        'Nautine Context is undefined, please verify that you are calling useNautineContext() as a child of a <NautineLogger> component.',
    )

    return nautineContext
}

export default useNautineContext
