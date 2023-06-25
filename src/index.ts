#!/usr/bin/env node
import { version } from '../package.json';
import fs from 'node:fs/promises';
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
    const paths = await glob(pattern, {
        ignore: options.ignore,
    });
    if(!options.force && !(await ask(`Delete ${pattern}? (y) `)).match(/y|^$/ig))
        return console.log('Operation canceled');
    let removeCount = paths.length;
    await Promise.all(paths.map(async (path) => {
        await fs.rm(path, {
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
    .option('-i, --ignore <string>', 'Files or directories to ignore')
    .option('-w, --watch [string]', 'Starts watch mode on source or provided glob')
    .action(cp);

async function cp(pattern: string, destPath: string, options: {
    ignore?: string,
    watch?: true | string,
}) {
    const srcPaths = await glob(pattern, {
        ignore: options.ignore,
    });
    const copyToDest = (path: string) => {
        fs.cp(path, join(destPath, path), {
            recursive: true,
        }).catch(() => {
            
        });
    };
    srcPaths.forEach(copyToDest);
    if(options.watch === undefined) return;
    chokidar.watch(options.watch === true ? srcPaths : options.watch)
        .on('change', copyToDest);
}

program.parse();

async function ask(prompt: string): Promise<string> {
    const rl = readline.createInterface(process.stdin, process.stdout);
    let response = await rl.question(prompt);
    rl.close();
    return response;
}