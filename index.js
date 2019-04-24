#!/usr/bin/env node

const program = require('commander');
const process = require('process');
const package = require('./package.json');
const { mergeSelected, mergeAll } = require('./scripts/main');

program
  .version(package.version)
  .option('-a, --all', 'Merge all PDF files in current directory')
  .parse(process.argv);

if (program.all) {
  mergeAll();
} else {
  mergeSelected();
}