import fs from 'node:fs';

/**
 * Remove files and directories
 * @param path File or directory to remove
 * @param options Remove options
 */
function rm(path: string, options: {
    /**
     * Remove directories recursively
     */
    recursive: boolean;
    /**
     * Ignore nonexistent files and arguments
     */
    force: boolean;
}) {
    fs.rmSync(path, {
        recursive: options.recursive,
        force: options.force,
    });
}

export default rm;