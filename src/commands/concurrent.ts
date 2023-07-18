import { spawn } from 'child_process';

/**
 * Run multiple commands concurrently
 * @param commands Command(s) to run
 */
function concurrent(commands: string[]) {
    commands.forEach(command => {
        spawn(command, [], {
            shell: true,
            stdio: 'inherit',
        });
    });
}

export default concurrent;