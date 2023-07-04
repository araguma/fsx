import fs from 'node:fs';
import { globSync } from 'glob';

/**
 * Remove files or directories
 * @param pattern Files or directories
 * @param options Remove options
 */
function rm(pattern: string, options: {
    /**
     * Remove subdirectories recursively
     */
    recursive?: boolean,
    /**
     * Force remove
     */
    force?: boolean,
    /**
     * Files or directories to ignore
     */
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

export default rm;