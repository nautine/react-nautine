import { format } from 'date-fns'
import { LogSeverity } from '../../types'

/**
 * Returns the log message with timestamps and correct log message structure.
 *
 * @param severity - Log severity
 * @param category - Custom log category, falls back to "default" if not provided
 * @param type - Log type, like "xhr", "user", "exception", etc., falls back to "system" if not provided
 * @param message - Log message, falls back to "No message" if not provided
 * @returns Standardized log message
 */
export const getFormattedMessage: (
    severity: LogSeverity,
    category?: string,
    type?: string,
    message?: string,
) => string = (severity, category, type, message) =>
    `[${format(Date.now(), 'yyyy-MM-dd HH:mm:ss.SSS')}] [${severity}] [${category || 'default'}] [${
        type || 'system'
    }] - ${message || 'No message'}`

export default getFormattedMessage
