import { ChildProcess, exec } from 'node:child_process';
import chokidar from 'chokidar';
import { getFiles } from '../utils/files';

/**
 * Watch a path for changes
 * @param path Path to watch
 * @param command Command to run when a file changes
 * @param options Watch options
 */
function watch(path: string, command: string, options: {
    /**
     * Watch directories recursively
     */
    recursive?: boolean;
    /**
     * Ignore paths that match regex
     */
    ignore?: string;
    /**
     * Terminate the previous process before starting a new one
     */
    terminate?: boolean
}) {
    let childProcess: ChildProcess;
    getFiles(path, {
        recursive: options.recursive,
        ignore: options.ignore,
    }).forEach((file) => {
        chokidar.watch(file)
            .on('change', () => {
                !options.terminate || childProcess?.kill();
                childProcess = exec(command.replace(/\[path\]/gi, file), (error, stdout) => {
                    error?.killed || console.log(error ?? stdout);
                });
            });
    });
}

export default watch;