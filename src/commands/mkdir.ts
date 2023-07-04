import fs from 'node:fs';

/**
 * Create directory at the specified path
 * @param path Directory path
 */
function mkdir(path: string) {
    fs.mkdirSync(path);
}

export default mkdir;