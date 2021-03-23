#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { bale } = require('../lib');

program
  .version('1.0.0')
  .command('')
  .option('-c --config [configFileName]')
  .action((configFileName) => {
    console.log(configFileName);
    bale(configFileName);
  })
