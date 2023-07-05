import fs from 'node:fs';

function rm(path: string, options: {
    recursive: boolean;
    force: boolean;
}) {
    fs.rmSync(path, {
        recursive: options.recursive,
        force: options.force,
    });
}

export default rm;