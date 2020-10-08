import { NautineLogger } from '@nautine/react-nautine'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const AppWithLogger: React.FC = () => {
    const {
        REACT_APP_NAUTINE_API_KEY: apiKey,
        REACT_APP_NAUTINE_ENVIRONMENT_ID: environmentId,
        REACT_APP_NAUTINE_PROJECT_ID: projectId,
    } = process.env

    return apiKey && environmentId && projectId ? (
        <NautineLogger
            apiKey={apiKey}
            environmentId={environmentId}
            projectId={projectId}
            name="my-dummy-logger"
            level="ERROR"
            // overrideConsole={true}
            verbose={true}
            errorFallback={<span>Error...</span>}
        >
            <App />
        </NautineLogger>
    ) : (
        <span>Create required .env configuration before you start running the application.</span>
    )
}

ReactDOM.render(<AppWithLogger />, document.getElementById('root'))
