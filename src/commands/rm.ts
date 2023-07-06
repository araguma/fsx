import fs from 'node:fs';

/**
 * Remove path
 * @param path Path to remove
 * @param options Remove options
 */
function rm(path: string, options: {
    /**
     * Remove path recursively
     */
    recursive: boolean;
    /**
     * Ignore nonexistent paths
     */
    force: boolean;
}) {
    fs.rmSync(path, {
        recursive: options.recursive,
        force: options.force,
    });
}

export default rm;