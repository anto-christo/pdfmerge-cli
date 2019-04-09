'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

let getAllPdfFiles = () => {
  let pdfFiles = [];
  fs.readdirSync(process.cwd()).forEach(file => {
    path.extname(file) === '.pdf' ? pdfFiles.push(file) : null;
  });
  return pdfFiles;
}

let getPdfSuggestions = (answers, input) => {
  input = input || '';
  return new Promise(function (resolve) {
    var fuzzyResult = fuzzy.filter(input, getAllPdfFiles());
    resolve(
      fuzzyResult.map(function (el) {
        return el.original;
      })
    );
  });
}

let askFileName = () => {
  return inquirer.prompt([{
    type: 'autocomplete',
    name: 'fileName',
    message: 'Select a PDF file:',
    source: getPdfSuggestions,
    pageSize: 20
  }]).then((choice) => {
    return choice.fileName;
  });
}

let askNumOfPdf = () => {
  return inquirer.prompt({
    name: 'num',
    type: 'number',
    message: 'Enter the number of PDF(s) to be merged:',
    default: 2
  }).then((input) => {
    return input.num;
  })
}

let displayPrompts = async () => {
  let num = await askNumOfPdf();
  let filesToBeMerged = [];
  for (let i = 0; i < num; i++) {
    filesToBeMerged.push(await askFileName());
  }
  console.log(filesToBeMerged);
}

module.exports = displayPrompts;