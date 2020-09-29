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
    apiKey="9a2866ed30f647b4aa7ad638132d7d3a"
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

This is the API key which is generated for a specific environment in the Nautine application.

`overrideConsole: boolean`

Overrides console.log and sends all log messages printed with console.log to your Nautine environment.

`verbose: boolean`

Prints log messages to the console as well if it's true. Useful when the application is deployed to test environments.

## License
---
MIT © [Nautine](https://github.com/nautine)
