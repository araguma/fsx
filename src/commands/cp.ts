import fs from 'node:fs';
import path from 'node:path';
import chokidar from 'chokidar';
import { getFiles } from '../utils/files';

/**
 * Copy path contents to another destination
 * @param src Source path
 * @param dest Destination path
 * @param options Copy options
 */
function cp(src: string, dest: string, options: {
    /**
     * Copy paths recursively
     */
    recursive: boolean;
    /**
     * Overwrite existing paths
     */
    force: boolean;
    /**
     * Ignore paths that match regex
     */
    ignore?: string;
    /**
     * Start watch mode
     */
    watch: boolean;
}) {
    const cpFn = (src: string) => {
        // Replace the source directory with the destination directory
        fs.cpSync(src, path.join(dest, src.replace(/^.+?\//, '')), {
            mode: fs.constants.COPYFILE_FICLONE,
            force: options.force ?? false,
        });
    };

    getFiles(src, {
        recursive: options.recursive,
        ignore: options.ignore,
    }).forEach((file) => {
        cpFn(file);
        options.watch && chokidar.watch(file)
            .on('change', cpFn);
    });
}

export default cp;