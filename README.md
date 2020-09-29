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

ReactDOM.render(
  <NautineLogger
    apiKey="fee8af9eac884187960b868dea77f9e9"
    environmentId="d883d84e4efb4a58bcacc7e6200031bd"
    projectId="b0e8b4f74b824f18b6f8914b195d1dcd"
    overrideConsole={true}
    verbose={true}
  >
    <App />
  </NautineLogger>,
  document.getElementById('root')
)
```

## Reference
---
### Props

`apiKey: string`

Required. This is the API key which is generated for a specific environment in the Nautine application.

`environmentId: string`

Required. This is the identifier of the environment for which the API key was generated for.

`projectId: string`

Required. This is the identifier of the project to which the environment belongs to.

`overrideConsole: boolean`

Optional. Overrides console.log and sends all log messages printed with console.log to your Nautine environment.

`verbose: boolean`

Optional. Prints log messages to the console as well if it's true. Useful when the application is deployed to test environments.

## License
---
MIT © [Nautine](https://github.com/nautine)
