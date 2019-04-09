'use strict';

const ora = require('ora');
const prompt = require('./prompt')
const mergeFiles = require('./merge');
const ui = require('./interface');

let displaySelectedFiles = filesToBeMerged => {
  ui.showMessage('yellow', 'Source Files:');
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
    ui.showMessage('green', 'Successfully merged the files !!!');
  } catch (err) {
    spinner.fail();
    ui.showMessage('red', `An error occured while merging\n${err}`);
  }
}

let main = async () => {
  let filesToBeMerged = await prompt.getFilesToBeMerged();
  let destinationFileName = await prompt.askDestinationName();
  ui.showNewScreen();
  displaySelectedFiles(filesToBeMerged);
  displayDestinationName(destinationFileName);
  await startMerge(filesToBeMerged, destinationFileName);
}

module.exports = main;