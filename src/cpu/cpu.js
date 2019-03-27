class CPU {

    constructor() {
        // Time clock: The Z80 holds two types of clock (m and t)
        this._clock = {m: 0, t:0};
        this._r = {
            a: 0, b: 0, c: 0, d: 0, e: 0, h: 0, l: 0, f: 0, // 8-bit registers
            pc: 0, sp: 0,                                   // 16-bit registers
            m: 0, t: 0                                      // clock for last instr
        };
    }

    // Add E to A, leaving result in A (ADD A, E)
    ADDr_e = () =>
    {
        this._r.a += this._r.e;                             // perform operation
        this._r.f = 0;                                      // clear flags

        if (!(this._r.a & 255)) this._r.f |= 0x80;          // check for zero
        if (this._r.a > 255) this._r.f |= 0x10;             // check for carry
        this._r.a &= 255;                                   // Mask to 8-bits
        this._r.m = 1; this._r.t = 4;                       // 1 M-time taken
    }

    // Compare B to A, setting flags (CP A, B)
    ADDr_b = () =>
    {
        let i = this._r.a;                                  // temp copy of a
        i -= this._r.b;                                     // substract b
        this._r.f |= 0x40;                                  // set substraction flag
        if (!(i & 255)) this._r.f |= 0x80;                  // check for zero
        if (i < 0) this._r.f |= 0x10;                       // check for underflow
        this._r.m = 1; this._r.t = 4;                       // 1 M-time taken
    }

    // No-operation (NOP)
    NOP = () =>
    {
        this._r.m = 1; this._r.t = 4;                       // 1 M-time taken
    }
}

export default CPU;
