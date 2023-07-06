import { exec } from 'child_process';

/**
 * Run multiple commands concurrently
 * @param commands Command(s) to run
 */
function concurrent(commands: string[]) {
    commands.forEach(command => {
        exec(command, (error, stdout) => {
            if(error)
                console.error(error);
            if(stdout)
                process.stdout.write(stdout);
        });
    });
}

export default concurrent;