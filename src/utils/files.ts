import fs from 'node:fs';
import { join, basename } from 'node:path';
import { stringToRegex } from '../utils/regex';

function getFiles(path: string, options: {
    recursive?: boolean;
    ignore?: string;
}) {
    const ignoreRegex = stringToRegex(options.ignore ?? '/$^/');

    if(fs.lstatSync(path).isFile())
        return [path];
    return (fs.readdirSync(path, {
        recursive: options.recursive ?? false,
    }) as string[]).filter((subpath) => {
        return fs.lstatSync(join(path, subpath)).isFile() && !ignoreRegex.test(basename(subpath));
    }).map((subpath) => {
        return join(path, subpath);
    });
}

export {
    getFiles,
}