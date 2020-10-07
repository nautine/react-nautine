import { Component, ErrorInfo } from 'react'
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

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        const { logger }: NautineContextProps = this.context

        logger.fatal(`${error.message} ${errorInfo.componentStack}`)
    }

    render(): React.ReactNode {
        const { children, fallback } = this.props
        const { hasError } = this.state

        return hasError && fallback ? fallback : children
    }
}

NautineErrorBoundary.contextType = NautineContext

export default NautineErrorBoundary
