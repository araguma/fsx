import fs from 'node:fs';
import path from 'node:path';
import { stringToRegex } from '../utils/regex';

function cp(src: string, dest: string, options: {
    recursive?: boolean;
    force?: boolean;
    ignore?: string;
}) {
    src = path.normalize(src);
    dest = path.normalize(dest);
    const ignoreRegex = stringToRegex(options.ignore ?? '/$^/');

    fs.readdirSync(src, {
        recursive: options.recursive ?? false,
        withFileTypes: true,
    }).filter((entry) => {
        return entry.isFile() && !ignoreRegex.test(entry.name);
    }).forEach((entry) => {
        const filePath = path.join(entry.path, entry.name);
        fs.cpSync(filePath, path.join(dest, filePath), {
            force: options.force ?? false,
        });
    });
}

export default cp;