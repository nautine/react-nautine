# @nautine/react-nautine

> React component for Nautine Logger services.

[![NPM](https://img.shields.io/npm/v/@nautine/react-nautine.svg)](https://www.npmjs.com/package/@nautine/react-nautine) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @nautine/react-nautine
```

OR

```bash
npm install --save @nautine/react-nautine
```

## Usage

```tsx
import NautineLogger from '@nautine/react-nautine'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MyFallbackComponent from './MyFallbackComponent'

ReactDOM.render(
  <NautineLogger
    apiKey="fee8af9eac884187960b868dea77f9e9"
    environmentId="d883d84e4efb4a58bcacc7e6200031bd"
    projectId="b0e8b4f74b824f18b6f8914b195d1dcd"
    level="ERROR"
    verbose={true}
    errorFallback={<MyFallbackComponent />}
  >
    <App />
  </NautineLogger>,
  document.getElementById('root')
)
```

## Error boundary
Nautine Logger uses its own internal Error Boundary component, which makes it really easy to catch any errors that was happening somewhere in the component tree. This component sends log messages to Nautine background services automatically without additional configuration. If you have any custom Error Boundary components defined in your project deep in the tree, the error will not be reported to Nautine unless you create the relevant context function calls on your own.

## Reference
### Props

`apiKey: string`

Required. This is the API key which is generated for a specific environment in the Nautine application.

`environmentId: string`

Required. This is the identifier of the environment for which the API key was generated for.

`projectId: string`

Required. This is the identifier of the project to which the environment belongs to.

`level: string`

Optional. By default Nautine doesn't log anything to the console. To enable logging to the console, set this level (please refer to the example).

`verbose: boolean`

Optional. Prints log messages to the console as well if it's true. Useful when the application is deployed to test environments.

`errorFallback: React.ReactNode | ((resetBoundary: () => void) => React.ReactNode)`

Optional. Fallback component or function with a return value of a React component to render when an error is being caught by the internal Error Boundary.

## License
MIT © [Nautine](https://github.com/nautine)
