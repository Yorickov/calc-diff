#!/usr/bin/env babel-node
import commander from 'commander';

const program = commander;

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
