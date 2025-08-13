const { program } = require('commander');
const fs = require('fs');
const myPackage = require('../package.json');
const loadCommands = require('./utils/commandLoader');

function createProgram() {
  program
    .name(Object.keys(myPackage.bin)[0])
    .version(myPackage.version)
    .description('A CLI tool to clean and format Markdown files.')
    .configureHelp({ sortOptions: true, sortCommands: true })
    .option('-v, --verbose', 'enable verbose output')
    .option('--debug', 'enable debug output')
    .option('--silent', 'suppress all output');

  loadCommands(program);

  return program;
}

module.exports = createProgram;
