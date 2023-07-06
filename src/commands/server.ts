import fs from 'node:fs';
import express from 'express';

/**
 * Starts a static local server
 * @param root Root directory
 * @param options Server options
 */
function server(root: string, options: {
    /**
     * Port to listen on
     */
    port: number;
}) {
    if(!fs.lstatSync(root).isDirectory())
        throw new Error('Root must be a directory');

    const app = express();
    app.use(express.static(root));
    app.listen(options.port, () => {
        console.log(`Server is listening on http://localhost:${options.port}/`);
    });
}

export default server;