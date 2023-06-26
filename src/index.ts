#!/usr/bin/env node
import { version } from '../package.json';
import fs from 'node:fs';
import { join } from 'node:path';
import { exec } from 'node:child_process';
import { Command }  from 'commander';
import { globSync } from 'glob';
import chokidar from 'chokidar';

const program = new Command()
    .name('fsx')
    .description('A collection of cross-platform compatible functions and shell commands that aid in npm package development.')
    .version(version);

program.command('rm')
    .description('Remove files or directories.')
    .argument('<string>', 'Files or directories')
    .option('-r, --recursive', 'Remove subdirectories recursively', false)
    .option('-f, --force', 'Force remove', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .action(rm);

/**
 * Remove files or directories
 * @param pattern Files or directories
 * @param options Configuration options
 * @param options.recursive Remove subdirectories recursively
 * @param options.force Force remove
 * @param options.ignore Files or directories to ignore
 */
export function rm(pattern: string, options: {
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
    .option('-w, --watch', 'Starts watch mode on source files or directories', false)
    .action(cp);

/**
 * Copy files or directories to another destination
 * @param pattern Source files or directories
 * @param destPath Destination directory
 * @param options Configuration options
 * @param options.recursive Copy subdirectories recursively
 * @param options.force Force copy
 * @param options.ignore Files or directories to ignore
 * @param options.watch Starts watch mode on source files or directories
 */
export function cp(pattern: string, destPath: string, options: {
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

program.command('mkdir')
    .description('Create directory at the specified path.')
    .argument('<string>', 'Directory path')
    .action(mkdir);

/**
 * Create directory at the specified path
 * @param path Directory path
 */
export function mkdir(path: string) {
    fs.mkdirSync(path);
}

program.command('watch')
    .description('Watch a list of files and run a command if any changes occur.')
    .argument('<string>', 'Files or directories to watch')
    .argument('<string>', 'Command to run if any changes occur')
    .option('-i --ignore <string>', 'Files or directories to ignore')
    .action(watch);

/**
 * Watch a list of files and run a command if any changes occur
 * @param pattern Files or directories to watch
 * @param command Command to run if any changes occur
 * @param options Configuration options
 * @param options.ignore Files or directories to ignore
 */
export function watch(pattern: string, command: string, options: {
    ignore?: string,
}) {
    const watchPaths = globSync(pattern, {
        ignore: options.ignore,
    });
    chokidar.watch(watchPaths)
        .on('change', (changePath) => {
            exec(command.replace(/\[path\]/gi, changePath.replace(/\\/g, '/')), (error, stdout) => {
                console.log(error ?? stdout);
            });
        });
}

program.parse();