import { format } from 'date-fns'
import { LogSeverity } from '../../types'

/**
 * Returns the log message with timestamps and correct log message structure.
 *
 * @param severity - Log severity
 * @param message - Log message
 */
export const getFormattedMessage: (severity: LogSeverity, message?: string) => string = (severity, message) => {
    const stack = 'internal'

    return `${format(Date.now(), 'yyyy-MM-dd HH:mm:ss.SSS')}  ${severity} --- ${stack
        .padEnd(20, ' ')
        .substr(0, 20)} : ${message || 'No message'}`
}

export default getFormattedMessage
