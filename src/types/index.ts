// Source: https://www.tutorialspoint.com/log4j/log4j_logging_levels.htm
export type LogSeverity = 'FATAL' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE'

export const SeverityPriority: Record<number, LogSeverity> = {
    0: 'FATAL',
    1: 'ERROR',
    2: 'WARN',
    3: 'INFO',
    4: 'DEBUG',
    5: 'TRACE',
}

export enum SeverityPrio {
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

export type LoggerFunction = (log: LogMessage | unknown) => Promise<void>

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
    readonly overrideConsole?: boolean
}
