#!/usr/bin/env node
import { Command }  from 'commander';
import { version } from '../package.json';
import cp from './commands/cp';
import rm from './commands/rm';
import watch from './commands/watch';
import server from './commands/server';
import concurrent from './commands/concurrent';

const program = new Command()
    .name('du')
    .description('A collection of cross-platform compatible functions and shell commands that aid in npm package development.')
    .version(version);

program.command('cp')
    .description('Copy path contents to another destination')
    .argument('<string>', 'Source path')
    .argument('<string>', 'Destination path')
    .option('-r, --recursive', 'Copy paths recursively', false)
    .option('-f, --force', 'Overwrite existing paths', false)
    .option('-i, --ignore <string>', 'Ignore paths that match regex')
    .option('-w, --watch', 'Start watch mode', false)
    .action(cp);

program.command('rm')
    .description('Remove path')
    .argument('<string>', 'Path to remove')
    .option('-r, --recursive', 'Remove path recursively', false)
    .option('-f, --force', 'Ignore nonexistent paths', false)
    .action(rm);

program.command('watch')
    .description('Watch a path for changes')
    .argument('<string>', 'Path to watch')
    .argument('-c, --command <string>', 'Command to run when a file changes')
    .option('-r, --recursive', 'Watch directories recursively', false)
    .option('-i, --ignore <string>', 'Ignore paths that match regex')
    .action(watch);

program.command('server')
    .description('Start a static local server')
    .argument('<string>', 'Root directory')
    .option('-p, --port <number>', 'Port to listen on', '3000')
    .action(server);

program.command('concurrent')
    .description('Run multiple commands concurrently')
    .argument('<string...>', 'Command(s) to run')
    .action(concurrent);

program.parse();

export {
    cp,
    rm,
    watch,
    server,
    concurrent,
}