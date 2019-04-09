'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const ui = require('./interface');
const autocomplete = require('inquirer-autocomplete-prompt');

inquirer.registerPrompt('autocomplete', autocomplete);

let getAllPdfFiles = () => {
  let pdfFiles = [];
  fs.readdirSync(process.cwd()).forEach(file => {
    path.extname(file) === '.pdf' ? pdfFiles.push(file) : null;
  });
  return pdfFiles;
}

let getPdfSuggestions = (answers, input) => {
  input = input || '';
  return new Promise((resolve) => {
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

let getFilesToBeMerged = async () => {
  ui.showNewScreen();
  let num = await askNumOfPdf();
  ui.showNewScreen();
  ui.showMessage('green', 'Select all the PDF files to be merged in order');
  let filesToBeMerged = [];
  for (let i = 0; i < num; i++) {
    ui.showMessage('yellow', `\nSelect PDF file no. ${i+1}`)
    filesToBeMerged.push(await askFileName());
  }
  return filesToBeMerged;
}

let askDestinationName = () => {
  ui.showNewScreen();
  return inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter destination file name:',
    default: 'merged.pdf'
  }).then((input) => {
    return input.name;
  })
}

module.exports = {
  getFilesToBeMerged,
  askDestinationName
};