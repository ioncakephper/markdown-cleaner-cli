const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const myPackage = require('../package.json');
const loadCommands = require('./utils/commandLoader');

function createProgram() {
  program
    .name(Object.keys(myPackage.bin)[0])
    .version(myPackage.version)
    .description(myPackage.description)
    .configureHelp({ sortOptions: true, sortCommands: true })
    .option('-v, --verbose', 'enable verbose output')
    .option('--debug', 'enable debug output')
    .option('--silent', 'suppress all output');

  const commandsDir = path.join(__dirname, 'commands');
  loadCommands(program, commandsDir);

  return program;
}

module.exports = createProgram;
