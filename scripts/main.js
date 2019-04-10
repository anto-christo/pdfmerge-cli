'use strict';

const ora = require('ora');
const prompt = require('./prompt')
const mergeFiles = require('./merge');
const ui = require('./interface');

let displaySelectedFiles = filesToBeMerged => {
  ui.showMessage('yellow', 'Selected Files:');
  filesToBeMerged.forEach(file => {
    ui.showMessage('cyan', file);
  });
}

let displayDestinationName = destinationFileName => {
  ui.showMessage('yellow', '\nDestination File:');
  ui.showMessage('cyan', destinationFileName);
}

let startMerge = async (filesToBeMerged, destinationFileName) => {
  console.log('\n');
  let spinner = ora('Merging your files').start();
  try {
    await mergeFiles(filesToBeMerged, destinationFileName);
    spinner.succeed();
    ui.showMessage('green', '\nSuccessfully merged the files !!!');
  } catch (err) {
    spinner.fail();
    ui.showMessage('red', `\nAn error occured while merging\n${err}`);
  }
}

let main = async () => {
  ui.showNewScreen();
  let filesToBeMerged = await prompt.getFilesToBeMerged();
  ui.showNewScreen();
  displaySelectedFiles(filesToBeMerged);
  console.log('\n');
  let destinationFileName = await prompt.askDestinationName();
  ui.showNewScreen();
  displaySelectedFiles(filesToBeMerged);
  displayDestinationName(destinationFileName);
  await startMerge(filesToBeMerged, destinationFileName);
}

module.exports = main;