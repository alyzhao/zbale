# zbale

A lightweight compression tool

## Install

```bash
npm install zbale -g
```

## Quick Start

Create a bale.config.js in your project directory

```js
const path = require('path');

module.exports = {
  // files to ignore
  exclude: ['.git', 'node_modules', '.DS_STORE', 'package-lock.json', 'bale.config.js'],
  output: {
    path: path.resolve(__dirname, '..'),
    // 'name' will be replaced with the 'name' in package.json, 'version' is the same
    filename: '[name]-[version]',
  },
}
```

Then, Execute command, the packaged file will be saved in output.path which you configured

```bash
zbale
```
