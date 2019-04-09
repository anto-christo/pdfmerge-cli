'use strict';

const readline = require('readline');
const cfonts = require('cfonts');

let clearScreen = () => {
  const blank = '\n'.repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

let showHeader = () => {
  cfonts.say('PDF-Merge', {
    font: 'simple',
    align: 'center',
    colors: ['cyanBright']
  });
}

module.exports = {
  clearScreen,
  showHeader
}