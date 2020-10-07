import React, { useCallback, useEffect, useState } from 'react'
import useFetch, { CachePolicies, Provider } from 'use-http'
import { NautineProvider } from '../../context'
import { LogSeverity } from '../../types'
import { getFormattedMessage } from '../../utils'
import { NautineErrorBoundary } from '../NautineErrorBoundary'

export interface NautineLoggerProps {
    apiKey: string
    environmentId: string
    projectId: string
    name?: string
    overrideConsole?: boolean
    verbose?: boolean
    errorFallback?: React.ReactNode
}

export const Nautine: React.FC<NautineLoggerProps> = ({
    environmentId,
    projectId,
    overrideConsole,
    name,
    apiKey,
    verbose,
    children,
    errorFallback,
}) => {
    const [standardLogger] = useState({ ...console })

    const { request } = useFetch(`/logs?apiKey=${apiKey}`)

    /**
     * Sends the log to Nautine services and logs it to the console if the setup is verbose.
     *
     * @param message - Log message to send to Nautine services
     * @param silent - Determines whether console logging should be used or not
     * @returns Promise with the result of log upload
     */
    const sendLog = React.useCallback(
        (severity: LogSeverity) => async (message: unknown, silent?: boolean) => {
            if (verbose && !silent) {
                const loggable = [name, message].filter((value) => !!value)

                standardLogger.log(...loggable)
            }

            return request.post({
                environmentId,
                projectId,
                severity,
                message: { message: getFormattedMessage(severity, JSON.stringify(message)) },
            })
        },
        [standardLogger, environmentId, projectId, request, name, verbose],
    )

    /**
     * Custom log function which uses one of the standard logging functions based on the input parameter and also sends
     * the log to Nautine services.
     *
     * @param severity - Default severity for different console log types
     * @param standardLogFunction - Standard log function to use for console logging
     */
    const customLog = useCallback(
        (severity: LogSeverity, standardLogFunction: (params?: unknown) => void) => async (...data: Array<unknown>) => {
            if (verbose) {
                const loggable = [name, ...data].filter((value) => !!value)

                standardLogFunction(...loggable)
            }

            try {
                await sendLog(severity)(data, true)
            } catch (error) {
                console.error(error)
            }
        },
        [verbose, name, sendLog],
    )

    useEffect(() => {
        if (overrideConsole) {
            console.info = customLog('INFO', standardLogger.info)
            console.log = customLog('TRACE', standardLogger.log)
            console.warn = customLog('WARN', standardLogger.warn)
            console.error = customLog('ERROR', standardLogger.error)
        }

        return () => {
            if (overrideConsole) {
                // Reset console object to its defaults on unmount
                console = { ...standardLogger } // eslint-disable-line
            }
        }
    }, [overrideConsole, customLog, standardLogger])

    return (
        <NautineProvider
            value={{
                logger: {
                    fatal: sendLog('FATAL'),
                    error: sendLog('ERROR'),
                    warn: sendLog('WARN'),
                    info: sendLog('INFO'),
                    debug: sendLog('DEBUG'),
                    trace: sendLog('TRACE'),
                },
                overrideConsole,
            }}
        >
            <NautineErrorBoundary fallback={errorFallback}>{children}</NautineErrorBoundary>
        </NautineProvider>
    )
}

export const NautineLogger: React.FC<NautineLoggerProps> = (props) => {
    return (
        <Provider url="http://localhost:8080/api" options={{ cachePolicy: CachePolicies.NO_CACHE }}>
            <Nautine {...props} />
        </Provider>
    )
}

export default NautineLogger
