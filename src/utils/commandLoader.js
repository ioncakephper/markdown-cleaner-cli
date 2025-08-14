const fs = require("fs");
const path = require("path");

/**
 * @description TODO: Add description
 * @param {*} program TODO: Add description
 * @param {*} commandsDir TODO: Add description
 * @returns {*} TODO: Add description
 */
function loadCommands(program, commandsDir) {
  const files = fs.readdirSync(commandsDir);

  /**
   * @description TODO: Add description
   * @param {*} file TODO: Add description
   * @returns {*} TODO: Add description
   */
  files.forEach((file) => {
    const fullPath = path.join(commandsDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(program, fullPath); // Recursively load commands from subdirectories
    } else if (stat.isFile() && file.endsWith(".js")) {
      const commandModule = require(fullPath);
      if (typeof commandModule === "function") {
        commandModule(program);
      }
    }
  });
}

module.exports = loadCommands;
