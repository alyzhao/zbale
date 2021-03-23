#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

const { bale } = require('../lib');

program
  .version(pkg.version, '-v --version')

program
  .option('--config [configFileName]')
  .action(({ config }) => {
    bale(config);
  })

program.parse(process.argv);
