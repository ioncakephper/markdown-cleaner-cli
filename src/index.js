#!/usr/bin/env node

const createProgram = require('./program');

function run() {
  const program = createProgram();
  program.parse(process.argv);
}

run();
