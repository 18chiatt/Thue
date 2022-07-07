export interface Outputter {

    log(... args: any[]): void;

}

class ConsoleOutputter implements Outputter {
    log(...args: any[]){
        console.log(...args);
    }
}

export class MockOutputter implements Outputter {
    calls = []
    log(...args){
        this.calls.push(...args);
    }
}

export const CONSOLE_OUTPUTTER = new ConsoleOutputter();
