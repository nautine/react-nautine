import React, { useEffect, useState } from 'react'
import useFetch, { Provider } from 'use-http'
import { NautineProvider } from '../../context'
import { LogSeverity } from '../../types'

export interface NautineLoggerProps {
    apiKey: string
    environmentId: string
    projectId: string
    name?: string
    overrideConsole?: boolean
    verbose?: boolean
}

export const Nautine: React.FC<NautineLoggerProps> = ({ overrideConsole, name, ...props }) => {
    const [standardLogger] = useState({ ...console })

    const { request } = useFetch(`/logs?apiKey=${props.apiKey}`)

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
                console = { ...standardLogger }
            }
        }
    }, [overrideConsole])

    /**
     * Custom log function which uses one of the standard logging functions based on the input parameter and also sends
     * the log to Nautine services.
     *
     * @param severity - Default severity for different console log types
     * @param standardLogFunction - Standard log function to use for console logging
     */
    const customLog = (severity: LogSeverity, standardLogFunction: Function) => async (...data: Array<any>) => {
        if (props.verbose) {
            const loggable = [name, ...data].filter((value) => !!value)

            standardLogFunction(...loggable)
        }

        try {
            await sendLog(severity)(data, true)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Sends the log to Nautine services and logs it to the console if the setup is verbose.
     *
     * @param message - Log message to send to Nautine services
     * @param silent - Determines whether console logging should be used or not
     * @returns Promise with the result of log upload
     */
    const sendLog = (severity: LogSeverity) => async (message: any, silent?: boolean) => {
        if (props.verbose && !silent) {
            const loggable = [name, message].filter((value) => !!value)

            standardLogger.log(...loggable)
        }

        return await request.post({
            environmentId: props.environmentId,
            projectId: props.projectId,
            severity,
            message: { message: JSON.stringify(message) },
        })
    }

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
            {props.children}
        </NautineProvider>
    )
}

export const NautineLogger: React.FC<NautineLoggerProps> = (props) => {
    return (
        <Provider url="http://localhost:8080/api">
            <Nautine {...props} />
        </Provider>
    )
}

export default NautineLogger
