import { exec } from "child_process";

/**
 * Run multiple commands concurrently
 * @param commands Command(s) to run
 */
function concurrent(commands: string[]) {
    commands.forEach(command => {
        exec(command, (error, stdout, stderr) => {
            if(error)
                console.error(error);
            if(stdout)
                console.log(stdout);
            if(stderr)
                console.error(stderr);
        });
    });
}

export default concurrent;