'use strict';

const ora = require('ora');
const prompt = require('./prompt')
const mergeFiles = require('./merge');
const ui = require('./ui');

let checkAnyPdfPresent = (files) => {
  files.length === 0 ? ui.showError('No PDF files found in the current directory.') : null;
}

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
    ui.showError(`\nAn error occured while merging\n${err}`);
  }
}

let mergeSelected = async () => {
  ui.showNewScreen();
  checkAnyPdfPresent(prompt.getAllPdfFiles());
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

let mergeAll = async () => {
  ui.showNewScreen();
  let filesToBeMerged = prompt.getAllPdfFiles();
  checkAnyPdfPresent(filesToBeMerged);
  displaySelectedFiles(filesToBeMerged);
  console.log('\n');
  let destinationFileName = await prompt.askDestinationName();
  displayDestinationName(destinationFileName);
  await startMerge(filesToBeMerged, destinationFileName);
}

module.exports = {
  mergeSelected,
  mergeAll
};