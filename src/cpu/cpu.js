class CPU {

    constructor() {
        // Time clock: The Z80 holds two types of clock (m and t)
        this._clock = {m: 0, t:0};
        this._r = {
            a: 0, b: 0, c: 0, d: 0, e: 0, h: 0, l: 0, f: 0, // 8-bit registers
            pc: 0, sp: 0,                                   // 16-bit registers
            m: 0, t: 0                                      // clock for last instr
        };
        this._map = [
            this._ops.NOP,
            this._ops.LDBCnn,
            this._ops.LDBCma,
            this._ops.INCBC,
            this._ops.INCr_b,
            ...
        ]
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

    // Push registers B and C to the stack (PUSH BC)
    PUSHBC = () =>
    {
        this._r.sp--;                                       // Drop through the stack
        MemoryInterfacing.wb(this._r.sp, this._r.b);        // Write B
        this._r.sp--;                                       // Drop thtough the stack
        MemoryInterfacing.wb(this._r.sp, this._r.c);        // Write C
        this._r.m = 3; this._r.t = 12;                      // 3 M-times taken
    }

    // Pop registers H and L off the stack (POP HL)
    POPHL = () =>
    {
        this._r.l = MemoryInterfacing.rb(this._r.sp);       // Read L
        this._r.sp++;                                       // Move back up the stack
        this._r.h = MemoryInterfacing.rb(this._r.sp);       // Read H
        this._r.sp++;                                       // Move back up the stack
        this._r.m = 3; this._r.t = 12;                      // 3 M-times taken
    }

    // Read a byte from absolute location into A (LD A, addr)
    LDAmm = () =>
    {
        let addr = MemoryInterfacing.rw(this._r.pc);        // Get address from instr
        this._r.pc += 2;                                    // Advance PC
        this._r.a = MemoryInterfacing.rb(addr);             // Read from address
        this._r.m = 4; this._r.t = 16;                      // 4 M-times taken
    }

    reset = () =>
    {
        this._r = {
            a: 0, b: 0, c: 0, d: 0, e: 0, h: 0, l: 0, f: 0,
            pc: 0, sp: 0,
            m: 0, t: 0
        };

        this._clock = { m: 0, t: 0};
    }

    dispatcher = () =>
    {
        let op = MemoryInterfacing.rb(this._r.pc++);        // Fetch instruction
        this._map[op]();                                    // Dispatch
        this._r.pc &= 65535;                                // Mask PC to 16 bits
        this._clock.m += this._r.m;                         // Add time to CPU clock
        this._clock.t += this._r.t;
    }
}

export default CPU;
