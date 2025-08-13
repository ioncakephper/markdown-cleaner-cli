const { program } = require('commander');

function createProgram() {
  program
    .version('0.1.0')
    .argument('<file>', 'file to clean')
    .action((file) => {
      console.log(`Cleaning file: ${file}`);
    });

  return program;
}

module.exports = createProgram;
