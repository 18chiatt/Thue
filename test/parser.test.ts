import { parse } from "../interpreter/interpreter";


describe('parser', () => {
    it('parses replacements', () => {
        const lines = ['a::=b'];
        const program = parse(lines);
        expect(program.rules).toHaveLength(1);
        const rule = program.rules[0];
        expect(rule.lhs).toBe('a')
        expect(rule.rhs).toBe('b')
        expect(rule.toStdOut).toBeFalsy();
    })
    
    it('marks stdout prints', () => {
        const lines = ['a::=~b'];
        const program = parse(lines);
        expect(program.rules).toHaveLength(1);
        const rule = program.rules[0];
        expect(rule.lhs).toBe('a')
        expect(rule.rhs).toBe('b')
        expect(rule.toStdOut).toBeTruthy();
    })

    it('strips whitespace from rules', () => {
        const lines = ['   a::=b  ', '  b::=c', '', ' c::=d     '];
        const linesNoWhitespace = ['a::=b', 'b::=c', '', 'c::=d'];
        const expectedProgram = parse(linesNoWhitespace)
        const program = parse(lines);
        expect(program.rules).toEqual(expectedProgram.rules);
        expect(program.rules).toHaveLength(3);
    })

    it('strips whitespace from expressions', () => {
        const lines = ['a::=b', '::=', '           a'];
        const linesNoWhitespace = ['a::=b', '::=', 'a'];
        const expectedProgram = parse(linesNoWhitespace)
        const program = parse(lines);
        expect(program.expressions).toEqual(expectedProgram.expressions);
    })

    it('drops blank expressions', () => {
        const lines = ['a::=b', '::=', '', 'a'];
        const program = parse(lines);
        expect(program.expressions).toEqual(['a'])
    })
    
    it('ignores empty lines', () => {
        const lines = ['a::=b', 'b::=c', '', 'c::=d'];
        const program = parse(lines);
        expect(program.rules).toHaveLength(3);
    })
    
    it('stops looking for rules when a lonely ::= is given', () => {
        const lines = ['a::=b', '::=', 'a'];
        const program = parse(lines);
        expect(program.rules).toHaveLength(1);
        expect(program.expressions).toEqual(['a'])
    })
    
    it('parses multiple expressions when given', () => {
        const lines = ['::=', 'a', 'b', 'c']
        const program = parse(lines);
        expect(program.expressions).toEqual(['a','b','c'])
    })
    
    it('throws an error if a rule is provided after rule termination', () => {
        const lines = ['a::=b', '::=', 'b::=c'];
        expect(() => {
            parse(lines)
        }).toThrow(Error)
    })

})
