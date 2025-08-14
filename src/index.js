
const createProgram = require("./program");

/**
 * @description TODO: Add description
 * @returns {*} TODO: Add description
 */
function run() {
  try {
    const program = createProgram();
    program.parse(process.argv);
  } catch (e) {
    console.error(e);
  }
}

run();
