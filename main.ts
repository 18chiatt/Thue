import * as fs from 'fs';
import { interpret, parse } from './interpreter/interpreter';
import { CONSOLE_OUTPUTTER, Outputter } from './models/outputter';



function main() {
    const argv = process.argv
    if(argv.length < 3){
        throw new Error('Please provide a file argument')
    }
    const filePath = process.argv[2]
    const lines = fs.readFileSync(filePath).toString().split('\n');
    execute(lines, CONSOLE_OUTPUTTER);
}


export function execute(lines: string[], outputter: Outputter): void {
    const program = parse(lines);
    const endState = interpret(program, outputter);
    outputter.log(endState.join('\n'))
}


if (require.main === module) {
    main();
}




