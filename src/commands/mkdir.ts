import fs from 'node:fs';

/**
 * Create directory at the specified path
 * @param path Directory path
 */
export function mkdir(path: string) {
    fs.mkdirSync(path);
}