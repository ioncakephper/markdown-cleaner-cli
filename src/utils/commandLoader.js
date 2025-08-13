const glob = require('glob');
const path = require('path');

module.exports = (program) => {
  const commandsPath = path.join(__dirname, '..', 'commands', '**', '*.js');
  const files = glob.sync(commandsPath);

  files.forEach((file) => {
    const commandModule = require(file);
    if (typeof commandModule === 'function') {
      commandModule(program);
    }
  });
};
