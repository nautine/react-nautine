import { useNautineContext } from '@nautine/react-nautine'
import React from 'react'

const App: React.FC = () => {
    const { sendLog, overrideConsole } = useNautineContext()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 500 }}>
            <h3>Send logs directly to Nautine</h3>

            <button
                onClick={() =>
                    sendLog({
                        severity: 'DEBUGGING',
                        message: { message: 'Direct log message', name: 'DirectLogMessage', statusCode: 200 },
                    })
                }
                style={{ maxWidth: 150 }}
            >
                Send log directly
            </button>

            {overrideConsole && (
                <>
                    <h3>Send logs indirectly via console commands</h3>

                    <button
                        onClick={() =>
                            console.log({
                                severity: 'DEBUGGING',
                                message: {
                                    message: 'Indirect log message',
                                    name: 'IndirectLogMessage',
                                    statusCode: 200,
                                },
                            })
                        }
                        style={{ maxWidth: 150 }}
                    >
                        Send log via console.log
                    </button>
                </>
            )}
        </div>
    )
}

export default App
