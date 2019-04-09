'use strict';

const prompt = require('./prompt')

let main = async () => {
  let filesToBeMerged = await prompt.getFilesToBeMerged();
  let destinationFileName = await prompt.askDestinationName();
}

module.exports = main;