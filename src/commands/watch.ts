import { execSync } from 'node:child_process';
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
}) {
    getFiles(path, {
        recursive: options.recursive,
        ignore: options.ignore,
    }).forEach((file) => {
        chokidar.watch(file)
            .on('change', () => {
                execSync(command.replace(/\[path\]/gi, file), {
                    stdio: 'inherit',
                })
            });
    });
}

export default watch;