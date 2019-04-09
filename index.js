#!/usr/bin/env node

const program = require('commander');
const process = require('process');
const package = require('./package.json');
const main = require('./scripts/main');

program
  .version(package.version);

program
  .parse(process.argv);

if (!program.args.length) {
  main();
}