#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'Output format')
  .action((pathToFile1, pathToFile2) => console.log(genDiff(pathToFile1, pathToFile2)))
  .parse(process.argv);
