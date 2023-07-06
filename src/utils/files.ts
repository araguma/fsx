import fs from 'node:fs';
import { join } from 'node:path';
import { stringToRegex } from '../utils/regex';

function getFiles(path: string, options: {
    recursive?: boolean;
    ignore?: string;
}) {
    const ignoreRegex = stringToRegex(options.ignore ?? '/$^/');

    if(fs.lstatSync(path).isFile())
        return [path];
    return fs.readdirSync(path, {
        recursive: options.recursive ?? false,
        withFileTypes: true,
    }).filter((entry) => {
        return entry.isFile() && !ignoreRegex.test(entry.name);
    }).map((entry) => {
        return join(entry.path, entry.name);
    });
}

export {
    getFiles,
}