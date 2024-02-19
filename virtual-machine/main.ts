import * as readliner from 'readline';
import { resetCPURegisters, runCPUCycle } from './utils/utils';

const readline = readliner.createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.prompt();
readline.on('line', input => {
    try {
        runCPUCycle(input);
    } catch (error) {
        console.error(error);
    }
    resetCPURegisters();
    readline.prompt();
});
