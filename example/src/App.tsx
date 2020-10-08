import { useNautineContext } from '@nautine/react-nautine'
import React from 'react'

const style = {
    button: {
        display: 'block',
        maxWidth: 200,
    },
    input: {
        display: 'block',
        width: 250,
        marginBottom: 8,
    },
}

/**
 * This is a component that cannot be rendered.
 */
const FaultyComponent = () => {
    const items = [{ name: 'Item #1' }, { name: 'Item #2' }]

    // Note: This is going to be a faulty reference because the original array consists of two elements only.
    return <span>{items[2].name}</span>
}

const App: React.FC = () => {
    const [logMessage, setLogMessage] = React.useState('')
    const [showFaultyComponent, setShowFaultyComponent] = React.useState(false)
    const { logger, overrideConsole } = useNautineContext()

    const handleLogMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogMessage(event.target.value)

    const handleSendDirectMessage = (event: React.FormEvent) => {
        event.preventDefault()

        if (logMessage) {
            logger.debug(logMessage, 'user', 'form.submit')

            setLogMessage('')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 500 }}>
            <h3>Custom log messages</h3>

            <form onSubmit={handleSendDirectMessage}>
                <input
                    type="text"
                    value={logMessage}
                    onChange={handleLogMessageChange}
                    placeholder="Type log message here..."
                    style={style.input}
                />

                <button onClick={handleSendDirectMessage} style={style.button} type="submit">
                    Send Log
                </button>
            </form>

            <hr />

            <h3>Error boundary</h3>

            <button onClick={() => setShowFaultyComponent(true)} style={style.button}>
                Render faulty component
            </button>

            {showFaultyComponent && <FaultyComponent />}

            {overrideConsole && (
                <>
                    <hr />

                    <h3>Send logs indirectly via preexisting console commands</h3>

                    <h4>console.log falls back to logger.trace()</h4>
                    <button onClick={() => console.log('Preexisting log message')} style={style.button}>
                        Send log via console.log
                    </button>

                    <h4>console.info falls back to logger.info()</h4>
                    <button onClick={() => console.info('Preexisting info log message')} style={style.button}>
                        Send log via console.info
                    </button>

                    <h4>console.warn falls back to logger.warn()</h4>
                    <button onClick={() => console.warn('Preexisting warning log message')} style={style.button}>
                        Send log via console.warn
                    </button>

                    <h4>console.error falls back to logger.error()</h4>
                    <button onClick={() => console.error('Preexisting error log message')} style={style.button}>
                        Send log via console.error
                    </button>
                </>
            )}
        </div>
    )
}

export default App
