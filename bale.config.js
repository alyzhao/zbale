const path = require('path');

module.exports = {
  exclude: ['.git', 'node_modules', '.DS_STORE', 'package-lock.json', 'bale.config.js'],
  output: {
    path: path.resolve(__dirname, '..'),
    filename: '[name]-[version]',
  },
}
