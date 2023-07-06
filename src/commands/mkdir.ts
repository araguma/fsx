import fs from 'node:fs';

/**
 * Create a directory
 * @param path Path to create
 * @param options Make directory options
 */
function mkdir(path: string, options: {
    /**
     * Create parent directories if they do not exist
     */
    parents?: boolean;
}) {
    fs.mkdirSync(path, {
        recursive: options.parents ?? false,
    });
}

export default mkdir;