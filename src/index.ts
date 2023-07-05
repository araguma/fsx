#!/usr/bin/env node
import { Command }  from 'commander';
import { version } from '../package.json';
import cp from './commands/cp';
import server from './commands/server';

const program = new Command()
    .name('fsx')
    .description('A collection of cross-platform compatible functions and shell commands that aid in npm package development.')
    .version(version);

program.command('cp')
    .description('Copy files and directories.')
    .argument('<string>', 'Source file or directory')
    .argument('<string>', 'Destination directory')
    .option('-r, --recursive', 'Copy directories recursively', false)
    .option('-f, --force', 'Overwrite existing files', false)
    .option('-i, --ignore <string>', 'Ignore file(s) or directory')
    .action(cp);

program.command('server')
    .description('Host a static local server using the specified directory as root.')
    .argument('<string>', 'Root directory')
    .option('-p, --port <number>', 'Port to listen on', '3000')
    .option('-w, --watch <string>', 'Watch directory')
    .option('-c, --command <string>', 'Command to run on change')
    .action(server);

program.parse();

export {
    cp,
    server
}