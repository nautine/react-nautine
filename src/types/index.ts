// Source: https://www.tutorialspoint.com/log4j/log4j_logging_levels.htm
export type LogSeverity = 'FATAL' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE'

export enum SeverityPriority {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL,
}

export interface LogMessage {
    message: unknown
    name?: string
    statusCode?: number
}

export interface Log {
    severity: LogSeverity
    message: LogMessage
}

export type LoggerFunction = (log: LogMessage | unknown, category?: string, type?: string) => any

export interface NautineLogger {
    fatal: LoggerFunction
    error: LoggerFunction
    warn: LoggerFunction
    info: LoggerFunction
    debug: LoggerFunction
    trace: LoggerFunction
}

export interface NautineContextProps {
    logger: NautineLogger
}
