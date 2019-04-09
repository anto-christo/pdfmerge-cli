'use strict';

const prompt = require('./prompt')
const mergeFiles = require('./merge');
const ui = require('./interface');

let main = async () => {
  let filesToBeMerged = await prompt.getFilesToBeMerged();
  let destinationFileName = await prompt.askDestinationName();
  ui.showNewScreen();
  try {
    await mergeFiles(filesToBeMerged, destinationFileName);
    ui.showMessage('green', 'Merging Successfull !!!');
  } catch (err) {
    ui.showMessage('red', `An error occured while merging\n${err}`);
  }
}

module.exports = main;