export class Replacement {
    private _lhs: string;
    private _rhs: string;
    private _toStdOut: boolean;

    constructor(lhs: string, rhs: string, toStdOut: boolean){
        this._lhs = lhs;
        this._rhs = rhs;
        this._toStdOut = toStdOut;
    }

    public get lhs(){
        return this._lhs;
    }

    public get rhs(){
        return this._rhs;
    }

    public get toStdOut(){
        return this._toStdOut;
    }
}