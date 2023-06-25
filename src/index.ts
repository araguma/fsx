#!/usr/bin/env node
import { version } from '../package.json';
import fs from 'node:fs/promises';
import { CopyOptions } from 'node:fs';
import { join } from 'node:path';
import readline from 'node:readline/promises';
import { Command }  from 'commander';
import { glob } from 'glob';
import chokidar from 'chokidar';

const program = new Command()
    .name('fsx')
    .description('A collection of cross-platform compatible, file system manipulation subcommands.')
    .version(version);

program.command('rm')
    .description('Remove files or directories.')
    .argument('<string>', 'Files or directories')
    .option('-r, --recursive', 'Remove subdirectories recursively', false)
    .option('-f, --force', 'Remove without confirmation', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .action(rm);

async function rm(pattern: string, options: {
    recursive?: boolean,
    force?: boolean,
    ignore?: string,
}) {
    if(!options.force && !(await prompt(`Delete ${pattern}? (y) `)).match(/y|^$/ig))
        return console.log('Operation canceled');
    const srcPaths = await glob(pattern, {
        ignore: options.ignore,
    });
    let removeCount = srcPaths.length;
    await Promise.all(srcPaths.map(async (srcPath) => {
        await fs.rm(srcPath, {
            recursive: options.recursive,
        }).catch(() => {
            removeCount --;
        });
    }));
    console.log(`Successfully deleted ${removeCount} file(s)`);
}

program.command('cp')
    .description('Copy files or directories to another destination.')
    .argument('<string>', 'Source files or directories')
    .argument('<string>', 'Destination directory')
    .option('-r, --recursive', 'Copy subdirectories recursively', false)
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .option('-w, --watch [string]', 'Starts watch mode on source or provided glob')
    .action(cp);

async function cp(pattern: string, destPath: string, options: {
    recursive?: boolean,
    ignore?: string,
    watch?: true | string,
}) {
    const srcPaths = await glob(pattern, {
        ignore: options.ignore,
    });
    const copyOptions: CopyOptions = {
        recursive: options.recursive,
    }
    await Promise.all(srcPaths.map(async (srcPath) => {
        await copyTo(srcPath, destPath, copyOptions).catch();
    }));
    if(options.watch === undefined) return;
    chokidar.watch(options.watch === true ? srcPaths : options.watch)
        .on('change', (srcPath) => {
            copyTo(srcPath, destPath, copyOptions).catch();
        });
}

program.parse();

async function prompt(question: string): Promise<string> {
    const rl = readline.createInterface(process.stdin, process.stdout);
    let response = await rl.question(question);
    rl.close();
    return response;
}

async function copyTo(srcPath: string, destPath: string, options: CopyOptions | undefined): Promise<void> {
    await fs.cp(srcPath, join(destPath, srcPath), options);
}