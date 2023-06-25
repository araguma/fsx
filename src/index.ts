#!/usr/bin/env node
import { version } from '../package.json';
import fs from 'node:fs';
import { join } from 'node:path';
import { Command }  from 'commander';
import { globSync } from 'glob';
import chokidar from 'chokidar';

const program = new Command()
    .name('fsx')
    .description('A collection of cross-platform compatible, file system manipulation commands.')
    .version(version);

program.command('rm')
    .description('Remove files or directories.')
    .argument('<string>', 'Files or directories')
    .option('-r, --recursive', 'Remove subdirectories recursively', false)
    .option('-f, --force', 'Force remove', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .action(rm);

function rm(pattern: string, options: {
    recursive?: boolean,
    force?: boolean,
    ignore?: string,
}) {
    const srcPaths = globSync(pattern, {
        ignore: options.ignore,
    });
    srcPaths.forEach((srcPath) => {
        fs.rmSync(srcPath, {
            recursive: options.recursive,
            force: options.force,
        })
    });
}

program.command('cp')
    .description('Copy files or directories to another destination.')
    .argument('<string>', 'Source files or directories')
    .argument('<string>', 'Destination directory')
    .option('-r, --recursive', 'Copy subdirectories recursively', false)
    .option('-f, --force', 'Force copy', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .option('-w, --watch', 'Starts watch mode on source or provided glob', false)
    .action(cp);

function cp(pattern: string, destPath: string, options: {
    recursive?: boolean,
    force?: boolean,
    ignore?: string,
    watch?: boolean,
}) {
    const srcPaths = globSync(pattern, {
        ignore: options.ignore,
    });
    const copytoDestFn = (path: string) => {
        fs.cpSync(path, join(destPath, path), {
            mode: fs.constants.COPYFILE_FICLONE,
            errorOnExist: false,
            recursive: options.recursive,
            force: options.force,
        });
    }
    srcPaths.forEach(copytoDestFn);
    if(options.watch)
        chokidar.watch(srcPaths)
            .on('change', copytoDestFn);
}

program.parse();