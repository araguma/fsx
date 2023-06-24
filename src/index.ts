#!/usr/bin/env node
import { version } from '../package.json';
import fs from 'node:fs/promises';
import readline from 'node:readline/promises';
import { Command }  from 'commander';
import { glob } from 'glob';
import chokidar from 'chokidar';

const program = new Command()
    .name('dux')
    .description('Provides cross-platform compatible commands that are commonly used in npm package development.')
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
    if(!options.force) {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let response = (await rl.question(`Delete ${pattern}? (y) `)).toLowerCase();
        rl.close();
        if(response !== 'y' && response !== '')
            return console.log('Operation canceled');
    }
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
    .option('-w, --watch [string]', 'Starts watch mode', './')
    .action(cp);

async function cp(pattern: string, destPath: string, options: {
    ignore?: string,
    watch?: boolean,
}) {

}

program.parse();