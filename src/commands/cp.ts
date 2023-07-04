import fs from 'node:fs';
import { join } from 'node:path';
import { globSync } from 'glob';
import chokidar from 'chokidar';

/**
 * Copy files or directories to another destination
 * @param pattern Source files or directories
 * @param destPath Destination directory
 * @param options Copy options
 */
function cp(pattern: string, destPath: string, options: {
    /**
     * Copy subdirectories recursively
     */
    recursive?: boolean,
    /**
     * Force copy
     */
    force?: boolean,
    /**
     * Files or directories to ignore
     */
    ignore?: string,
    /**
     * Starts watch mode on source files or directories
     */
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

export default cp;