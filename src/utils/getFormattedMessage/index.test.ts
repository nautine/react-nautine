import { getFormattedMessage } from '.'

describe('getFormattedMessage()', () => {
    const realDate = Date.now

    beforeAll(() => {
        global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30.500Z').getTime())
    })

    afterAll(() => {
        global.Date.now = realDate
    })

    test('formatted message contains log severity', () => {
        expect(getFormattedMessage('DEBUG', 'message')).toContain('DEBUG')
    })

    test('formatted message contains the actual log message', () => {
        const actualLogMessage = 'Log message'

        expect(getFormattedMessage('DEBUG', actualLogMessage)).toContain(actualLogMessage)
    })

    test('shows "No message" if no actual log message was provided', () => {
        expect(getFormattedMessage('DEBUG')).toContain('No message')
    })
})
