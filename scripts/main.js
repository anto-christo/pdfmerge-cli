'use strict';

const ui = require('./interface');
const displayPrompts = require('./prompt')

let showNewScreen = () => {
  ui.clearScreen();
  ui.showHeader();
}

let main = () => {
  showNewScreen();
  displayPrompts();
}

module.exports = main;