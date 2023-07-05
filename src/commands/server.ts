import { execSync } from 'node:child_process';
import express from 'express';
import chokidar from 'chokidar';

function server(root: string, options: {
    port: number;
    watch?: string;
    command?: string;
}) {
    const app = express();
    app.use(express.static(root));
    app.listen(options.port, () => {
        console.log(`Server is listening on localhost:${options.port}`);
    });

    chokidar.watch(options.watch ?? root).on('change', (path) => {
        if(options.command)
            execSync(options.command.replace(/\$path/g, path));
    });
}

export default server;