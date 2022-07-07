import { execute } from "../main";
import { MockOutputter } from "../models/outputter";

describe('executor', () => {
    let outputter: MockOutputter

    beforeEach(() => {
        outputter = new MockOutputter();
    })

    it('runs a binary increment program', () => {
        const lines = `
        1_::=1++
        0_::=1
        
        01++::=10
        11++::=1++0
        
        _0::=_
        _1++::=10
        
        __::=1
        
        ::=
        
        _1111111111_`.split('\n');
        
        expect(execute(lines, outputter )).toBeUndefined();
        expect(outputter.calls).toEqual(['10000000000'])
    })

    it('runs a ZZZ program', () => {
        const lines = `
        ZZZ::=...
        ::= 
        ZZZZZZZZZZZZ`.split('\n')
        expect(execute(lines, outputter)).toBeUndefined();
        expect(outputter.calls).toEqual(['............'])
    })

    it('does basic replacements', () => {
        const lines = `
        a::=b
        b::=c
        c::=e
        f::=g
        ::=
        a
        b
        c
        f
        `.split('\n')
        expect(execute(lines, outputter)).toBeUndefined();
        expect(outputter.calls).toEqual([['e','e','e','g'].join('\n')])
    })

})


