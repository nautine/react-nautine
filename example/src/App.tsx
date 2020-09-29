import { useNautineContext } from '@nautine/react-nautine'
import React from 'react'

const buttonStyle = {
    maxWidth: 200,
}

const App: React.FC = () => {
    const { logger, overrideConsole } = useNautineContext()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 500 }}>
            <h3>Send logs directly to Nautine</h3>

            <button onClick={() => logger.debug('Direct log message')} style={buttonStyle}>
                Send log directly
            </button>

            {overrideConsole && (
                <>
                    <hr />

                    <h3>Send logs indirectly via preexisting console commands</h3>

                    <h4>console.log falls back to logger.trace()</h4>
                    <button onClick={() => console.log('Preexisting log message')} style={buttonStyle}>
                        Send log via console.log
                    </button>

                    <h4>console.info falls back to logger.info()</h4>
                    <button onClick={() => console.info('Preexisting info log message')} style={buttonStyle}>
                        Send log via console.info
                    </button>

                    <h4>console.warn falls back to logger.warn()</h4>
                    <button onClick={() => console.warn('Preexisting warning log message')} style={buttonStyle}>
                        Send log via console.warn
                    </button>

                    <h4>console.error falls back to logger.error()</h4>
                    <button onClick={() => console.error('Preexisting error log message')} style={buttonStyle}>
                        Send log via console.error
                    </button>
                </>
            )}
        </div>
    )
}

export default App
