#!/usr/bin/env node
import commander from 'commander';
import { description, version } from '../../package.json';
import genDiff from '..';

const program = commander;

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format [format]')
  .action((pathToFile1, pathToFile2, option) =>
    console.log(genDiff(pathToFile1, pathToFile2, option.format)))
  .parse(process.argv);
