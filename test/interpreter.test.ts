import { interpret } from "../interpreter/interpreter";
import { MockOutputter, Outputter } from "../models/outputter";
import { Program } from "../models/Program"
import { Replacement } from "../models/replacement"



describe('interpreter', () => {
    let rules: Replacement[] 
    let expressions: string[];
    let outputter: MockOutputter;

    beforeEach(() => {
        rules = [new Replacement('a','b', false), new Replacement('b','c', false)];
        expressions  = ['a', 'd'];
        outputter = new MockOutputter();
    })    

    it('does basic replacements', () => {
        const program = new Program(rules, expressions);
        expect(interpret(program, outputter)).toEqual(['c','d'])
    })

    it('prints to outputter', () => {
        rules[1] = new Replacement('b', 'c', true);
        const program = new Program(rules, expressions);
        expect(interpret(program, outputter)).toEqual(['', 'd']);
        expect(outputter.calls).toEqual(['c'])
    })

    it('runs hello world', () => {
        rules = [new Replacement('a', 'Hello World', true)]
        expressions = ['a']
        const program = new Program(rules, expressions);
        expect(interpret(program, outputter)).toEqual([''])
        expect(outputter.calls).toEqual(['Hello World'])
    })


})