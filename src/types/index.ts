// Source: https://shorturl.at/klCTV
export type LogSeverity =
    | 'EMERGENCY'
    | 'ALERT'
    | 'CRITICAL'
    | 'ERROR'
    | 'WARNING'
    | 'NOTIFICATION'
    | 'INFORMATIONAL'
    | 'DEBUGGING'

export interface LogMessage {
    message: any
    name?: string
    statusCode?: number
}

export interface Log {
    severity: LogSeverity
    message: LogMessage
}

export interface NautineContextProps {
    sendLog: (log: Log) => Promise<void>
    readonly overrideConsole?: boolean
}
