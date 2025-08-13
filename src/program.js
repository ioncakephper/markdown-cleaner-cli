const { program } = require('commander');
const fs = require('fs');

function createProgram() {
  program
    .version('0.1.0')
    .description('A CLI tool to clean and format Markdown files.')
    .argument('<file>', 'file to clean')
    .action((file) => {
      if (!fs.existsSync(file)) {
        console.error(`Error: File not found at ${file}`);
        process.exit(1);
      }
    });

  return program;
}

module.exports = createProgram;
