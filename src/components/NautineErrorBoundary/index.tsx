import { Component } from 'react'
import StackTrace from 'stacktrace-js'
import { NautineContext } from '../../context'
import { NautineContextProps } from '../../types'

export interface NautineErrorBoundaryProps {
    fallback?: React.ReactNode
}

export interface NautineErrorBoundaryState {
    hasError?: boolean
}

export class NautineErrorBoundary extends Component<NautineErrorBoundaryProps, NautineErrorBoundaryState> {
    constructor(props: NautineErrorBoundaryProps) {
        super(props)

        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(): NautineErrorBoundaryState {
        return { hasError: true }
    }

    async componentDidCatch(error: Error): Promise<void> {
        const { logger }: NautineContextProps = this.context
        const errorFrames = await StackTrace.fromError(error)

        logger.fatal(errorFrames, 'exception', 'internal')
    }

    render(): React.ReactNode {
        const { children, fallback } = this.props
        const { hasError } = this.state

        return hasError && fallback ? fallback : children
    }
}

NautineErrorBoundary.contextType = NautineContext

export default NautineErrorBoundary
