import { exec } from 'node:child_process';
import { globSync } from 'glob';
import chokidar from 'chokidar';

/**
 * Watch a list of files and run a command if any changes occur
 * @param pattern Files or directories to watch
 * @param command Command to run if any changes occur
 * @param options Watch options
 */
export function watch(pattern: string, command: string, options: {
    /**
     * Files or directories to ignore
     */
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