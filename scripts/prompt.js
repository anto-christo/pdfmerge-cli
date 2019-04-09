'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

let getAllPdfFiles = () => {
  let pdfFiles = [];
  fs.readdirSync(process.cwd()).forEach(file => {
    path.extname(file) === '.pdf' ? pdfFiles.push(file) : null;
  });
  return pdfFiles;
}

let askNumOfPdf = () => {
  return inquirer.prompt({
    name: 'num',
    type: 'number',
    message: 'Enter the number of PDF(s) to be merged:',
  }).then((input) => {
    return input.num;
  })
}

let displayPrompts = async () => {
  let num = await askNumOfPdf();
  console.log('files', getAllPdfFiles());
}

module.exports = displayPrompts;