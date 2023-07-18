import { ChildProcess, spawn } from 'node:child_process';
import chokidar from 'chokidar';
import terminate from 'terminate';
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
    const runCommand = (file: string) => {
        childProcess = spawn(command.replace(/\[path\]/gi, file), [], {
            shell: true,
            stdio: 'inherit',
        });
    }
    getFiles(path, {
        recursive: options.recursive,
        ignore: options.ignore,
    }).forEach((file) => {
        chokidar.watch(file)
            .on('change', () => {
                if(options.terminate && childProcess?.pid)
                    terminate(childProcess.pid);
                runCommand(file);
            });
    });
}

export default watch;