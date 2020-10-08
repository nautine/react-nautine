import { getFormattedMessage } from '.'

describe('getFormattedMessage()', () => {
    const realDate = Date.now

    beforeAll(() => {
        global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30.500Z').getTime())
    })

    afterAll(() => {
        global.Date.now = realDate
    })

    test('return value should contain the current date', () => {
        expect(getFormattedMessage('DEBUG', 'custom-category', 'custom-type', 'message')).toContain(
            '[2019-04-07 10:20:30.500]',
        )
    })

    test('return value should contain provided log severity', () => {
        expect(getFormattedMessage('DEBUG', undefined, undefined, 'message')).toContain('DEBUG')
        expect(getFormattedMessage('WARN', undefined, undefined, 'message')).toContain('WARN')
        expect(getFormattedMessage('INFO', undefined, undefined, 'message')).toContain('INFO')
    })

    test('return value should contain "default" category if nothing was provided', () => {
        expect(getFormattedMessage('DEBUG', undefined, undefined, 'message')).toContain('[default]')
    })

    test('return value should contain provided category', () => {
        const category = 'custom-category'
        expect(getFormattedMessage('DEBUG', category, undefined, 'message')).toContain(`[${category}]`)
    })

    test('return value should contain "system" type if nothing was provided', () => {
        expect(getFormattedMessage('DEBUG', undefined, undefined, 'message')).toContain('[system]')
    })

    test('return value should contain provided type', () => {
        const type = 'user'
        expect(getFormattedMessage('DEBUG', undefined, type, 'message')).toContain(`[${type}]`)
    })

    test('return value should "No message" if no actual log message was provided', () => {
        expect(getFormattedMessage('DEBUG')).toContain(`- No message`)
    })

    test('return value should contain provided log message', () => {
        const actualLogMessage = 'Log message'

        expect(getFormattedMessage('DEBUG', undefined, undefined, actualLogMessage)).toContain(`- ${actualLogMessage}`)
    })
})
