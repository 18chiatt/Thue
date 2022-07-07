import { Outputter } from "../models/outputter";
import { Program } from "../models/Program";
import { Replacement } from "../models/replacement";

const SEPARATOR = '::=';
const TO_STD_OUT = '~';

export function interpret(program: Program, output: Outputter): string[] {
    // super basic/slow interpretation, speed me up plz
    let changes = true;
    while(changes){
        changes = false;
        for(const rule of program.rules){
            const currRuleUpdatedExprs = applyRule(rule, program.expressions, output);
            changes = changes || currRuleUpdatedExprs;
        }
    }
    return program.expressions;
}

function applyRule(rule: Replacement, expressions: string[], output: Outputter): boolean {
    let madeChanges = false;
    for(let i =0; i< expressions.length; i++){
        let expression = expressions[i];
        while(expression.includes(rule.lhs)){
            madeChanges = true;
            expression = expression.replace(rule.lhs, rule.toStdOut ? '': rule.rhs);
            if(rule.toStdOut){
                output.log(rule.rhs);
            }
            expressions[i] = expression;
        }
    }
    return madeChanges;
}



export function parse(lines: string[]): Program {
    const replacements = [];
    
    // collect replacements
    let index = 0;
    while(index < lines.length){
        const currLine = lines[index];

        const [lhs, rhs] = lines[index].split(SEPARATOR).map(cur => cur.trim());
        index++;
        if(!currLine.includes(SEPARATOR)){
            continue;
        }

        if(!lhs && !rhs){
            break;
        }
        const rhsGetsPrinted = rhs.startsWith(TO_STD_OUT);
        const replacement = new Replacement(lhs, rhsGetsPrinted ? rhs.slice(1): rhs, rhsGetsPrinted);
        replacements.push(replacement);
    }

    // collect expressions to interpret
    const expressions = lines.slice(index).map(curr => curr.trim()).filter( curr => curr);
    if(expressions.some(line => line.includes(SEPARATOR))){
        throw new Error("Please no ::= inside the expressions")
    }

    return new Program(replacements, expressions);
}
