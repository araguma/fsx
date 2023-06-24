#!/usr/bin/env node
import { Command }  from 'commander';
import fs from 'fs-extra';
import { globSync } from 'glob';
import chokidar from 'chokidar';
import { version } from '../package.json';

const program = new Command()
    .name('dux')
    .description('Provides cross-platform compatible commands that are commonly used in npm package development.')
    .version(version);

program.command('rm')
    .description('Remove files or directories.')
    .argument('<string>', 'Files or directories')
    .option('-r, --recursive', 'Remove subdirectories recursively')
    .option('-f, --force', 'Remove without confirmation')
    .option('-i, --ignore', 'Files or directories to ignore')
    .action(rm);

function rm(pattern: string, options: {
    recursive?: boolean,
    force?: boolean,
    ignore?: boolean,
}) {
    console.log(pattern, options);
}

program.command('cp')
    .description('Copy files or directories to another destination.')
    .argument('<string>', 'Source files or directories')
    .argument('<string>', 'Destination directory')
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .option('-w, --watch', 'Starts watch mode')
    .action(cp);

function cp(srcPattern: string, destPath: string, options: {
    ignore?: string,
    watch?: boolean,
}) {
    console.log(srcPattern, destPath, options);
}

program.parse();