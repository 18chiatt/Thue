import { Replacement } from "./replacement";

export class Program {
    private _rules: Replacement[];
    private _expressions: string[];

    constructor(rules: Replacement[], expressions: string[]){
        this._rules = rules;
        this._expressions = expressions
    }

    public get rules(){
        return this._rules;
    }

    public get expressions(){
        return this._expressions
    }
}