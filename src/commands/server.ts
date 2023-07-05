import { execSync } from 'node:child_process';
import express from 'express';
import chokidar from 'chokidar';

/**
 * Host a static local server using the specified directory as root
 * @param root Root directory
 * @param options Server options
 */
function server(root: string, options: {
    /**
     * Port to listen on
     */
    port: number;
    /**
     * Watch directory
     */
    watch?: string;
    /**
     * Command to run on change
     */
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