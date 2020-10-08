import { useNautineContext } from '@nautine/react-nautine'
import axios from 'axios'
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
    const { logger } = useNautineContext()

    const handleLogMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => setLogMessage(event.target.value)

    const handleSendDirectMessage = (event: React.FormEvent) => {
        event.preventDefault()

        if (logMessage) {
            logger.debug(logMessage, 'user', 'form.submit')

            setLogMessage('')
        }
    }

    const handleShowFaultyComponent = () => setShowFaultyComponent(true)

    const handleSendFaultyNetworkRequest = async () => {
        try {
            await axios.get('https://faulty-url')
        } catch (error) {
            logger.error(error, 'network', 'axios')
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
                    placeholder="Type your log message here..."
                    style={style.input}
                />

                <button onClick={handleSendDirectMessage} style={style.button} type="submit">
                    Send Log
                </button>
            </form>

            <hr />

            <h3>Component failure</h3>

            <button onClick={handleShowFaultyComponent} style={style.button}>
                Render faulty component
            </button>

            {showFaultyComponent && <FaultyComponent />}

            <hr />

            <h3>Network request failure</h3>

            <button onClick={handleSendFaultyNetworkRequest} style={style.button}>
                Send faulty network request
            </button>
        </div>
    )
}

export default App
