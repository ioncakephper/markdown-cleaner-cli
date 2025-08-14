#!/usr/bin/env node

const createProgram = require("./program");

function run() {
  try {
    const program = createProgram();
    program.parse(process.argv);
  } catch (e) {
    console.error(e);
  }
}

run();
