#!/usr/bin/env node
import { version } from '../package.json';
import { Command }  from 'commander';
import mkdir from './commands/mkdir';
import cp from './commands/cp';
import rm from './commands/rm';
import watch from './commands/watch';

const program = new Command()
    .name('fsx')
    .description('A collection of cross-platform compatible functions and shell commands that aid in npm package development.')
    .version(version);

program.command('mkdir')
    .description('Create directory at the specified path.')
    .argument('<string>', 'Directory path')
    .action(mkdir);

program.command('cp')
    .description('Copy files or directories to another destination.')
    .argument('<string>', 'Source files or directories')
    .argument('<string>', 'Destination directory')
    .option('-r, --recursive', 'Copy subdirectories recursively', false)
    .option('-f, --force', 'Force copy', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .option('-w, --watch', 'Starts watch mode on source files or directories', false)
    .action(cp);

program.command('rm')
    .description('Remove files or directories.')
    .argument('<string>', 'Files or directories')
    .option('-r, --recursive', 'Remove subdirectories recursively', false)
    .option('-f, --force', 'Force remove', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .action(rm);

program.command('watch')
    .description('Watch a list of files and run a command if any changes occur.')
    .argument('<string>', 'Files or directories to watch')
    .argument('<string>', 'Command to run if any changes occur')
    .option('-i --ignore <string>', 'Files or directories to ignore')
    .action(watch);

program.parse();

export {
    mkdir,
    cp,
    rm,
    watch,
};