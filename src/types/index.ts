// Source: https://www.tutorialspoint.com/log4j/log4j_logging_levels.htm
export type LogSeverity = 'FATAL' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE'

export interface LogMessage {
    message: any
    name?: string
    statusCode?: number
}

export interface Log {
    severity: LogSeverity
    message: LogMessage
}

export type LoggerFunction = (log: LogMessage | any) => Promise<void>

export interface NautineContextProps {
    logger: {
        fatal: LoggerFunction
        error: LoggerFunction
        warn: LoggerFunction
        info: LoggerFunction
        debug: LoggerFunction
        trace: LoggerFunction
    }
    readonly overrideConsole?: boolean
}
