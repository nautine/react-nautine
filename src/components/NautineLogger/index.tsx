import axios from 'axios'
import React from 'react'
import { NautineProvider } from '../../context'
import { LogSeverity, SeverityPriority } from '../../types'
import { getFormattedMessage } from '../../utils'
import { NautineErrorBoundary } from '../NautineErrorBoundary'

export interface NautineLoggerProps {
    apiKey: string
    environmentId: string
    projectId: string
    level?: LogSeverity
    verbose?: boolean
    errorFallback?: React.ReactNode | ((resetBoundary: () => void) => React.ReactNode)
}

export const NautineLogger: React.FC<NautineLoggerProps> = ({
    apiKey,
    environmentId,
    projectId,
    level,
    verbose,
    children,
    errorFallback,
}) => {
    /**
     * Sends the log to Nautine services and logs it to the console if the setup is verbose.
     *
     * @param message - Log message to send to Nautine services
     * @param silent - Determines whether console logging should be used or not
     * @returns Promise with the result of log upload
     */
    const sendLogToNetwork = React.useCallback(
        (severity: LogSeverity) => async (message: unknown, category?: string, type?: string, silent?: boolean) => {
            const loggableMessage = getFormattedMessage(
                severity,
                category,
                type,
                typeof message === 'object' ? JSON.stringify(message) : String(message),
            )

            if (verbose && !silent) {
                let log

                switch (severity) {
                    case 'FATAL':
                    case 'ERROR':
                        log = console.error
                        break
                    case 'WARN':
                        log = console.warn
                        break
                    case 'TRACE':
                        log = console.log
                        break
                    default:
                        log = console.info
                }

                if (level && SeverityPriority[level] <= SeverityPriority[severity] && log) {
                    log(loggableMessage)
                }
            }

            try {
                return axios.post(`http://localhost:8080/api/logs?apiKey=${apiKey}`, {
                    environmentId,
                    projectId,
                    severity,
                    message: {
                        message: loggableMessage,
                    },
                })
            } catch (error) {
                return Promise.reject(error)
            }
        },
        [environmentId, projectId, apiKey, verbose, level],
    )

    return (
        <NautineProvider
            value={{
                logger: {
                    fatal: sendLogToNetwork('FATAL'),
                    error: sendLogToNetwork('ERROR'),
                    warn: sendLogToNetwork('WARN'),
                    info: sendLogToNetwork('INFO'),
                    debug: sendLogToNetwork('DEBUG'),
                    trace: sendLogToNetwork('TRACE'),
                },
            }}
        >
            <NautineErrorBoundary fallback={errorFallback}>{children}</NautineErrorBoundary>
        </NautineProvider>
    )
}

export default NautineLogger
